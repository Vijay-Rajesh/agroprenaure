import { neon } from '@neondatabase/serverless';
import { cookies } from 'next/headers';
import { adminCookieName, isValidAdminSession } from '@/lib/admin-auth';
import { finalQuestion, surveyQuestions } from '@/lib/survey-form';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const provinceOptions = [
  'Punjab', 'Sindh', 'Khyber Pakhtunkhwa', 'Balochistan', 'Gilgit-Baltistan',
  'Azad Jammu & Kashmir', 'Islamabad Capital Territory',
];

function response(body: object, status: number) {
  return Response.json(body, { status, headers: { 'Cache-Control': 'no-store' } });
}

export async function GET(request: Request) {
  const cookieStore = await cookies();
  if (!isValidAdminSession(cookieStore.get(adminCookieName)?.value)) {
    return response({ error: 'Admin sign-in required.' }, 401);
  }

  if (!process.env.DATABASE_URL) {
    return response({ error: 'The Neon database is not configured.' }, 503);
  }

  const url = new URL(request.url);
  const search = (url.searchParams.get('search') ?? '').trim();
  const province = url.searchParams.get('province') ?? '';
  const requestedPage = Number(url.searchParams.get('page') ?? '1');
  const requestedPageSize = Number(url.searchParams.get('pageSize') ?? '25');

  if (search.length > 100 || !Number.isInteger(requestedPage) || requestedPage < 1) {
    return response({ error: 'Invalid search or pagination parameters.' }, 400);
  }
  if (province && !provinceOptions.includes(province)) {
    return response({ error: 'Invalid province filter.' }, 400);
  }

  const pageSize = [10, 25, 50].includes(requestedPageSize) ? requestedPageSize : 25;
  const pattern = `%${search}%`;

  try {
    const sql = neon(process.env.DATABASE_URL);
    const filters = sql`
      WHERE (${search === ''} OR full_name ILIKE ${pattern} OR district ILIKE ${pattern} OR province ILIKE ${pattern})
        AND (${province === ''} OR province = ${province})
    `;
    const [countRows] = await Promise.all([
      sql`SELECT count(*)::int AS total FROM survey_responses ${filters}`,
    ]);
    const total = Number(countRows[0]?.total ?? 0);
    const totalPages = Math.max(1, Math.ceil(total / pageSize));
    const page = Math.min(requestedPage, totalPages);
    const offset = (page - 1) * pageSize;
    const items = await sql`
      SELECT id, full_name, age, province, district, submitted_at, answers
      FROM survey_responses ${filters}
      ORDER BY submitted_at DESC
      LIMIT ${pageSize} OFFSET ${offset}
    `;
    const questionRows = await sql`SELECT id, prompt_en, sort_order FROM survey_questions`;
    const questionLabels = {
      ...Object.fromEntries(surveyQuestions.flatMap((question) => [
        [question.key, `${question.key.toUpperCase()}. ${question.prompt.en}`],
        [`${question.key}Other`, `Other response: ${question.prompt.en}`],
      ])),
      q12: `Q12. ${finalQuestion.en}`,
      ...Object.fromEntries(questionRows.map((question) => [String(question.id), String(question.prompt_en)])),
    };
    const questionOrder = Object.fromEntries(questionRows.map((question) => [String(question.id), Number(question.sort_order)]));

    return response({ items: items.map((item) => ({ ...item, question_labels: questionLabels, question_order: questionOrder })), page, pageSize, total, totalPages }, 200);
  } catch (error) {
    const databaseError = error && typeof error === 'object'
      ? error as { name?: unknown; code?: unknown }
      : {};
    console.error('Admin survey query failed', {
      name: typeof databaseError.name === 'string' ? databaseError.name : 'UnknownError',
      code: typeof databaseError.code === 'string' ? databaseError.code : undefined,
    });
    return response({ error: 'Survey responses could not be loaded right now.' }, 500);
  }
}
