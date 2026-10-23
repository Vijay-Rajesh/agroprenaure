import { neon } from '@neondatabase/serverless';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  if (!process.env.DATABASE_URL) {
    return Response.json({ error: 'The Neon database is not configured.' }, { status: 503 });
  }

  try {
    const sql = neon(process.env.DATABASE_URL);
    const images = await sql`
      SELECT id, title_en, title_ur, sort_order, created_at
      FROM newspaper_gallery
      WHERE is_published = TRUE
      ORDER BY created_at DESC, id DESC
    `;
    return Response.json({ images }, { headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    const databaseError = error && typeof error === 'object' ? error as { name?: unknown; code?: unknown } : {};
    console.error('Newspaper gallery query failed', {
      name: typeof databaseError.name === 'string' ? databaseError.name : 'UnknownError',
      code: typeof databaseError.code === 'string' ? databaseError.code : undefined,
    });
    return Response.json({ error: 'Newspaper images could not be loaded.' }, { status: 500 });
  }
}
