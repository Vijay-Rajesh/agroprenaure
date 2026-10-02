import { neon } from '@neondatabase/serverless';
import { surveyQuestionTypes, type PublicSurveyQuestion } from '@/lib/survey-question';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  if (!process.env.DATABASE_URL) return Response.json({ questions: [] });

  try {
    const sql = neon(process.env.DATABASE_URL);
    const rows = await sql`
      SELECT id, prompt_en, prompt_ur, help_en, help_ur, question_type, options, max_selections, required, sort_order, step_number
      FROM survey_questions
      WHERE is_active = TRUE
      ORDER BY sort_order ASC, created_at ASC
    `;
    const questions: PublicSurveyQuestion[] = rows
      .filter((row) => surveyQuestionTypes.includes(row.question_type))
      .map((row) => ({
        id: String(row.id),
        promptEn: String(row.prompt_en),
        promptUr: String(row.prompt_ur),
        helpEn: String(row.help_en),
        helpUr: String(row.help_ur),
        type: row.question_type,
        options: row.options,
        maxSelections: row.max_selections === null ? null : Number(row.max_selections),
        required: Boolean(row.required),
        sortOrder: Number(row.sort_order),
        stepNumber: Number(row.step_number),
      }));
    return Response.json({ questions }, { headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    const databaseError = error && typeof error === 'object' ? error as { name?: unknown; code?: unknown } : {};
    console.error('Public survey-question query failed', {
      name: typeof databaseError.name === 'string' ? databaseError.name : 'UnknownError',
      code: typeof databaseError.code === 'string' ? databaseError.code : undefined,
    });
    return Response.json({ questions: [] }, { status: 200, headers: { 'Cache-Control': 'no-store' } });
  }
}