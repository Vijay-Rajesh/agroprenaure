import { neon } from '@neondatabase/serverless';
import { z } from 'zod';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!z.string().uuid().safeParse(id).success) {
    return new Response('Newspaper image not found.', { status: 404 });
  }
  if (!process.env.DATABASE_URL) {
    return new Response('The Neon database is not configured.', { status: 503 });
  }

  try {
    const sql = neon(process.env.DATABASE_URL);
    const [image] = await sql`
      SELECT mime_type, encode(image_data, 'base64') AS image_data
      FROM newspaper_gallery
      WHERE id = ${id} AND is_published = TRUE
      LIMIT 1
    ` as { mime_type: string; image_data: string }[];
    if (!image) return new Response('Newspaper image not found.', { status: 404 });

    return new Response(Buffer.from(image.image_data, 'base64'), {
      headers: {
        'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
        'Content-Type': image.mime_type,
        'X-Content-Type-Options': 'nosniff',
      },
    });
  } catch (error) {
    const databaseError = error && typeof error === 'object' ? error as { name?: unknown; code?: unknown } : {};
    console.error('Newspaper image query failed', {
      name: typeof databaseError.name === 'string' ? databaseError.name : 'UnknownError',
      code: typeof databaseError.code === 'string' ? databaseError.code : undefined,
    });
    return new Response('Newspaper image could not be loaded.', { status: 500 });
  }
}
