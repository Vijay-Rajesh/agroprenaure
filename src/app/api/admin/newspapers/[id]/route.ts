import { neon } from '@neondatabase/serverless';
import { cookies } from 'next/headers';
import { z } from 'zod';
import { adminCookieName, isValidAdminSession } from '@/lib/admin-auth';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

async function isAuthorized() {
  const cookieStore = await cookies();
  return isValidAdminSession(cookieStore.get(adminCookieName)?.value);
}

function response(body: object, status = 200) {
  return Response.json(body, { status, headers: { 'Cache-Control': 'no-store' } });
}

async function getImageId(params: Promise<{ id: string }>) {
  const { id } = await params;
  return z.string().uuid().safeParse(id).success ? id : null;
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAuthorized())) return response({ error: 'Admin sign-in required.' }, 401);
  if (!process.env.DATABASE_URL) return response({ error: 'The Neon database is not configured.' }, 503);
  const id = await getImageId(params);
  if (!id) return response({ error: 'A valid newspaper image ID is required.' }, 400);

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return response({ error: 'The request must contain valid JSON.' }, 400);
  }
  const parsed = z.object({
    title_en: z.string().trim().min(1).max(180).optional(),
    title_ur: z.string().trim().max(180).optional(),
    is_published: z.boolean().optional(),
  }).strict().refine((value) => Object.keys(value).length > 0).safeParse(body);
  if (!parsed.success) return response({ error: 'Check the newspaper title or publication status and try again.' }, 400);

  try {
    const sql = neon(process.env.DATABASE_URL);
    const result = await sql`
      UPDATE newspaper_gallery
      SET title_en = COALESCE(${parsed.data.title_en ?? null}, title_en),
          title_ur = COALESCE(${parsed.data.title_ur ?? null}, title_ur),
          is_published = COALESCE(${parsed.data.is_published ?? null}, is_published)
      WHERE id = ${id}
      RETURNING id
    `;
    return result.length ? response({ success: true }) : response({ error: 'Newspaper image not found.' }, 404);
  } catch (error) {
    const databaseError = error && typeof error === 'object' ? error as { name?: unknown; code?: unknown } : {};
    console.error('Admin newspaper update failed', {
      name: typeof databaseError.name === 'string' ? databaseError.name : 'UnknownError',
      code: typeof databaseError.code === 'string' ? databaseError.code : undefined,
    });
    return response({ error: 'Newspaper image could not be updated.' }, 500);
  }
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAuthorized())) return response({ error: 'Admin sign-in required.' }, 401);
  if (!process.env.DATABASE_URL) return response({ error: 'The Neon database is not configured.' }, 503);
  const id = await getImageId(params);
  if (!id) return response({ error: 'A valid newspaper image ID is required.' }, 400);

  try {
    const sql = neon(process.env.DATABASE_URL);
    const result = await sql`DELETE FROM newspaper_gallery WHERE id = ${id} RETURNING id`;
    return result.length ? response({ success: true }) : response({ error: 'Newspaper image not found.' }, 404);
  } catch (error) {
    const databaseError = error && typeof error === 'object' ? error as { name?: unknown; code?: unknown } : {};
    console.error('Admin newspaper image deletion failed', {
      name: typeof databaseError.name === 'string' ? databaseError.name : 'UnknownError',
      code: typeof databaseError.code === 'string' ? databaseError.code : undefined,
    });
    return response({ error: 'Newspaper image could not be removed.' }, 500);
  }
}
