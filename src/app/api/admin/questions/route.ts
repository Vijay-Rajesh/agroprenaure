import { neon } from '@neondatabase/serverless';
import { cookies } from 'next/headers';
import { z } from 'zod';
import { adminCookieName, isValidAdminSession } from '@/lib/admin-auth';
import { surveyQuestionTypes } from '@/lib/survey-question';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const choiceSchema = z.object({
  en: z.string().trim().min(1).max(200),
  ur: z.string().trim().min(1).max(200),
}).strict();

const questionSchema = z.object({
  prompt_en: z.string().trim().min(1).max(500),
  prompt_ur: z.string().trim().min(1).max(500),
  help_en: z.string().max(300),
  help_ur: z.string().max(300),
  question_type: z.enum(surveyQuestionTypes),
  options: z.array(choiceSchema).max(30),
  max_selections: z.number().int().min(1).max(30).nullable(),
  required: z.boolean(),
  step_number: z.number().int().min(1).max(6),
}).strict().superRefine((question, context) => {
  const usesChoices = ['single_choice', 'multiple_choice', 'dropdown'].includes(question.question_type);
  if (usesChoices && question.options.length < 2) {
    context.addIssue({ code: 'custom', path: ['options'], message: 'Add at least two choices.' });
  }
  if (!usesChoices && question.options.length > 0) {
    context.addIssue({ code: 'custom', path: ['options'], message: 'This question type does not use choices.' });
  }
  if (question.max_selections !== null && question.question_type !== 'multiple_choice') {
    context.addIssue({ code: 'custom', path: ['max_selections'], message: 'Selection limits are only available for multiple-choice questions.' });
  }
  if (question.max_selections !== null && question.max_selections > question.options.length) {
    context.addIssue({ code: 'custom', path: ['max_selections'], message: 'The selection limit cannot exceed the number of choices.' });
  }
  if (new Set(question.options.map((option) => option.en)).size !== question.options.length) {
    context.addIssue({ code: 'custom', path: ['options'], message: 'English choice values must be unique.' });
  }
});

function response(body: object, status: number) {
  return Response.json(body, { status, headers: { 'Cache-Control': 'no-store' } });
}

async function isAuthorized() {
  const cookieStore = await cookies();
  return isValidAdminSession(cookieStore.get(adminCookieName)?.value);
}

async function parseQuestionBody(request: Request) {
  const rawBody = await request.text();
  if (rawBody.length > 12_000) return { error: 'Question details are too large.' } as const;

  let body: unknown;
  try {
    body = JSON.parse(rawBody) as unknown;
  } catch {
    return { error: 'Question details must be valid JSON.' } as const;
  }

  const parsed = questionSchema.safeParse(body);
  if (!parsed.success) return { error: 'Check the question text and choices.' } as const;
  return { data: parsed.data } as const;
}

export async function GET() {
  if (!(await isAuthorized())) return response({ error: 'Admin sign-in required.' }, 401);
  if (!process.env.DATABASE_URL) return response({ error: 'The Neon database is not configured.' }, 503);

  try {
    const sql = neon(process.env.DATABASE_URL);
    const questions = await sql`
      SELECT id, prompt_en, prompt_ur, help_en, help_ur, question_type, options, max_selections, required, sort_order, step_number, is_active
      FROM survey_questions
      ORDER BY sort_order ASC, created_at ASC
    `;
    return response({ questions }, 200);
  } catch (error) {
    const databaseError = error && typeof error === 'object' ? error as { name?: unknown; code?: unknown } : {};
    console.error('Admin survey-question query failed', {
      name: typeof databaseError.name === 'string' ? databaseError.name : 'UnknownError',
      code: typeof databaseError.code === 'string' ? databaseError.code : undefined,
    });
    return response({ error: 'Survey questions could not be loaded.' }, 500);
  }
}

export async function POST(request: Request) {
  if (!(await isAuthorized())) return response({ error: 'Admin sign-in required.' }, 401);
  if (!process.env.DATABASE_URL) return response({ error: 'The Neon database is not configured.' }, 503);

  const parsed = await parseQuestionBody(request);
  if ('error' in parsed) return response({ error: parsed.error }, 400);

  try {
    const sql = neon(process.env.DATABASE_URL);
    const [position] = await sql`SELECT COALESCE(MAX(sort_order), -1) + 1 AS next_order FROM survey_questions`;
    const [question] = await sql`
      INSERT INTO survey_questions (prompt_en, prompt_ur, help_en, help_ur, question_type, options, max_selections, required, sort_order, step_number)
      VALUES (
        ${parsed.data.prompt_en},
        ${parsed.data.prompt_ur},
        ${parsed.data.help_en},
        ${parsed.data.help_ur},
        ${parsed.data.question_type},
        ${JSON.stringify(parsed.data.options)}::jsonb,
        ${parsed.data.max_selections},
        ${parsed.data.required},
        ${Number(position.next_order)},
        ${parsed.data.step_number}
      )
      RETURNING id
    `;
    return response({ id: question.id }, 201);
  } catch (error) {
    const databaseError = error && typeof error === 'object' ? error as { name?: unknown; code?: unknown } : {};
    console.error('Admin survey-question insert failed', {
      name: typeof databaseError.name === 'string' ? databaseError.name : 'UnknownError',
      code: typeof databaseError.code === 'string' ? databaseError.code : undefined,
    });
    return response({ error: 'The survey question could not be saved.' }, 500);
  }
}

export async function PATCH(request: Request) {
  if (!(await isAuthorized())) return response({ error: 'Admin sign-in required.' }, 401);
  if (!process.env.DATABASE_URL) return response({ error: 'The Neon database is not configured.' }, 503);

  let body: unknown;
  try {
    body = await request.json() as unknown;
  } catch {
    return response({ error: 'Question details must be valid JSON.' }, 400);
  }

  const parsed = z.object({ id: z.string().uuid(), is_active: z.boolean().optional() }).passthrough().safeParse(body);
  if (!parsed.success) return response({ error: 'A valid question ID is required.' }, 400);

  if (typeof parsed.data.is_active === 'boolean') {
    try {
      const sql = neon(process.env.DATABASE_URL);
      const result = await sql`
        UPDATE survey_questions SET is_active = ${parsed.data.is_active}, updated_at = now()
        WHERE id = ${parsed.data.id} RETURNING id
      `;
      return result.length ? response({ success: true }, 200) : response({ error: 'Question not found.' }, 404);
    } catch (error) {
      const databaseError = error && typeof error === 'object' ? error as { name?: unknown; code?: unknown } : {};
      console.error('Admin survey-question status update failed', {
        name: typeof databaseError.name === 'string' ? databaseError.name : 'UnknownError',
        code: typeof databaseError.code === 'string' ? databaseError.code : undefined,
      });
      return response({ error: 'The question status could not be updated.' }, 500);
    }
  }

  const fullBody = z.object({ id: z.string().uuid(), ...questionSchema.shape }).strict().safeParse(body);
  if (!fullBody.success) return response({ error: 'Check the question text and choices.' }, 400);

  try {
    const sql = neon(process.env.DATABASE_URL);
    const result = await sql`
      UPDATE survey_questions
      SET prompt_en = ${fullBody.data.prompt_en},
          prompt_ur = ${fullBody.data.prompt_ur},
          help_en = ${fullBody.data.help_en},
          help_ur = ${fullBody.data.help_ur},
          question_type = ${fullBody.data.question_type},
          options = ${JSON.stringify(fullBody.data.options)}::jsonb,
          max_selections = ${fullBody.data.max_selections},
          required = ${fullBody.data.required},
          step_number = ${fullBody.data.step_number},
          updated_at = now()
      WHERE id = ${fullBody.data.id}
      RETURNING id
    `;
    return result.length ? response({ success: true }, 200) : response({ error: 'Question not found.' }, 404);
  } catch (error) {
    const databaseError = error && typeof error === 'object' ? error as { name?: unknown; code?: unknown } : {};
    console.error('Admin survey-question update failed', {
      name: typeof databaseError.name === 'string' ? databaseError.name : 'UnknownError',
      code: typeof databaseError.code === 'string' ? databaseError.code : undefined,
    });
    return response({ error: 'The survey question could not be updated.' }, 500);
  }
}