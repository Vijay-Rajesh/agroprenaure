import { neon } from '@neondatabase/serverless';
import { z } from 'zod';
import { surveyAnswersSchema, type SurveyAnswers } from '@/lib/survey-schema';
import type { SurveyQuestionChoice, SurveyQuestionType } from '@/lib/survey-question';

export const runtime = 'nodejs';

const submissionSchema = z.object({ answers: surveyAnswersSchema }).strict();
const maxRequestSize = 40_000;

type ActiveQuestion = {
  id: string;
  field_key: string | null;
  question_type: SurveyQuestionType;
  options: SurveyQuestionChoice[];
  max_selections: number | null;
  step_number: number;
  required: boolean;
};

function isBlankAnswer(value: unknown) {
  return value === undefined || value === null || (typeof value === 'string' && !value.trim()) || (Array.isArray(value) && value.length === 0);
}

function isProfileQuestionVisible(fieldKey: string, answers: SurveyAnswers) {
  if (fieldKey === 'categoryOther') return answers.category === 'Other';
  if (fieldKey === 'occupationOther') return answers.occupation === 'Other';
  if (fieldKey === 'irrigationOther') return answers.irrigation === 'Other';
  if (fieldKey === 'cropsOther') return Array.isArray(answers.crops) && answers.crops.includes('Other');
  if (fieldKey === 'livestock') return answers.keepsLivestock === 'Yes';
  if (fieldKey === 'livestockOther') {
    return answers.keepsLivestock === 'Yes' && Array.isArray(answers.livestock) && answers.livestock.includes('Other');
  }
  return true;
}

function isValidManagedAnswer(question: ActiveQuestion, answer: unknown) {
  if (isBlankAnswer(answer)) return !question.required;
  const optionValues = question.options.map((option) => option.en);

  switch (question.question_type) {
    case 'short_text':
    case 'long_text':
      return typeof answer === 'string' && answer.trim().length > 0 && answer.length <= 5000;
    case 'number':
      return typeof answer === 'string' && answer.trim() !== '' && Number.isFinite(Number(answer));
    case 'email':
      return typeof answer === 'string' && answer.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(answer.trim());
    case 'date':
      return typeof answer === 'string' && !Number.isNaN(Date.parse(answer));
    case 'yes_no':
      return answer === 'Yes' || answer === 'No';
    case 'rating':
      return ['1', '2', '3', '4', '5'].includes(String(answer));
    case 'single_choice':
    case 'dropdown':
      return typeof answer === 'string' && optionValues.includes(answer);
    case 'multiple_choice':
      return Array.isArray(answer) && answer.length > 0 && answer.length <= (question.max_selections ?? optionValues.length) && answer.every((value) => typeof value === 'string' && optionValues.includes(value));
  }
}

export async function POST(request: Request) {
  let rawBody: string;
  try {
    rawBody = await request.text();
  } catch {
    return Response.json({ error: 'Could not read the submission.' }, { status: 400 });
  }

  if (rawBody.length > maxRequestSize) {
    return Response.json({ error: 'The submission is too large.' }, { status: 413 });
  }

  let body: unknown;
  try {
    body = JSON.parse(rawBody) as unknown;
  } catch {
    return Response.json({ error: 'The submission must be valid JSON.' }, { status: 400 });
  }

  const parsed = submissionSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json({
      error: 'Please complete all required survey fields and try again.',
      fields: parsed.error.issues.map((issue) => issue.path.join('.')),
    }, { status: 400 });
  }

  if (!process.env.DATABASE_URL) {
    return Response.json(
      { error: 'Survey submissions are not configured yet. Add DATABASE_URL and try again.' },
      { status: 503 },
    );
  }

  try {
    const sql = neon(process.env.DATABASE_URL);
    const answers = parsed.data.answers;
    const questionRows = await sql`
      SELECT id, field_key, question_type, options, max_selections, required, step_number
      FROM survey_questions
      WHERE is_active = TRUE
    `;
    const activeQuestions: ActiveQuestion[] = questionRows.map((question) => ({
      id: String(question.id),
      field_key: typeof question.field_key === 'string' ? question.field_key : null,
      question_type: question.question_type,
      options: question.options as SurveyQuestionChoice[],
      max_selections: question.max_selections === null ? null : Number(question.max_selections),
      step_number: Number(question.step_number),
      required: Boolean(question.required) && (typeof question.field_key === 'string' || Number(question.step_number) !== 1),
    }));
    const activeQuestionIds = new Set(activeQuestions.map((question) => question.id));
    const managedAnswerIds = Object.keys(answers.customAnswers);
    if (managedAnswerIds.some((id) => !activeQuestionIds.has(id.endsWith('_other') ? id.slice(0, -6) : id))) {
      return Response.json({ error: 'The survey questions changed. Reload the page and try again.' }, { status: 400 });
    }
    const invalidQuestion = activeQuestions.find((question) => {
      if (question.field_key && !isProfileQuestionVisible(question.field_key, answers)) return false;
      const answer = question.field_key
        ? answers[question.field_key as keyof typeof answers]
        : answers.customAnswers[question.id];
      if (!isValidManagedAnswer(question, answer)) return true;
      const supportsOther = ['single_choice', 'multiple_choice', 'dropdown'].includes(question.question_type);
      const hasOther = supportsOther && (Array.isArray(answer) ? answer.includes('Other') : answer === 'Other');
      const otherKey = question.field_key ? `${question.field_key}Other` : `${question.id}_other`;
      const otherAnswer = question.field_key
        ? answers[otherKey as keyof typeof answers]
        : answers.customAnswers[otherKey];
      return question.required && hasOther && (typeof otherAnswer !== 'string' || !otherAnswer.trim() || otherAnswer.length > 1000);
    });
    if (invalidQuestion) {
      return Response.json({ error: 'Please answer all required additional questions.' }, { status: 400 });
    }
    const livestockQuestion = activeQuestions.find((question) => question.field_key === 'livestock');
    if (answers.keepsLivestock === 'Yes' && livestockQuestion && answers.livestock.length === 0) {
      return Response.json({ error: 'Please select your livestock.' }, { status: 400 });
    }

    const [savedResponse] = await sql`
      INSERT INTO survey_responses (full_name, age, province, district, consent, answers)
      VALUES (
        ${answers.fullName},
        ${answers.age},
        ${answers.province},
        ${answers.district},
        ${answers.consent},
        ${JSON.stringify(answers)}::jsonb
      )
      RETURNING id, submitted_at
    `;

    return Response.json(
      { success: true, responseId: savedResponse.id, submittedAt: savedResponse.submitted_at },
      { status: 201 },
    );
  } catch (error) {
    const databaseError = error && typeof error === 'object'
      ? error as { name?: unknown; code?: unknown }
      : {};
    console.error('Neon survey insert failed', {
      name: typeof databaseError.name === 'string' ? databaseError.name : 'UnknownError',
      code: typeof databaseError.code === 'string' ? databaseError.code : undefined,
    });
    return Response.json(
      { error: 'We could not save your response right now. Your draft is still saved on this device; please try again.' },
      { status: 500 },
    );
  }
}
