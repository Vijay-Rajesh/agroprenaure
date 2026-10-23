import { neon } from '@neondatabase/serverless';
import { cookies } from 'next/headers';
import { adminCookieName, isValidAdminSession } from '@/lib/admin-auth';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const maxImageSize = 4 * 1024 * 1024;
const acceptedMimeTypes = ['image/jpeg', 'image/png', 'image/webp'] as const;
type AcceptedMimeType = typeof acceptedMimeTypes[number];

function response(body: object, status = 200) {
  return Response.json(body, { status, headers: { 'Cache-Control': 'no-store' } });
}

async function isAuthorized() {
  const cookieStore = await cookies();
  return isValidAdminSession(cookieStore.get(adminCookieName)?.value);
}

function detectImageType(bytes: Uint8Array): AcceptedMimeType | null {
  if (bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) return 'image/jpeg';
  if (bytes.length >= 8 && bytes.subarray(0, 8).every((byte, index) => byte === [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a][index])) return 'image/png';
  if (
    bytes.length >= 12
    && Buffer.from(bytes.subarray(0, 4)).toString('ascii') === 'RIFF'
    && Buffer.from(bytes.subarray(8, 12)).toString('ascii') === 'WEBP'
  ) return 'image/webp';
  return null;
}

export async function GET() {
  if (!(await isAuthorized())) return response({ error: 'Admin sign-in required.' }, 401);
  if (!process.env.DATABASE_URL) return response({ error: 'The Neon database is not configured.' }, 503);

  try {
    const sql = neon(process.env.DATABASE_URL);
    const images = await sql`
      SELECT id, title_en, title_ur, is_published, sort_order, created_at
      FROM newspaper_gallery
      ORDER BY created_at DESC, id DESC
    `;
    return response({ images });
  } catch (error) {
    const databaseError = error && typeof error === 'object' ? error as { name?: unknown; code?: unknown } : {};
    console.error('Admin newspaper gallery query failed', {
      name: typeof databaseError.name === 'string' ? databaseError.name : 'UnknownError',
      code: typeof databaseError.code === 'string' ? databaseError.code : undefined,
    });
    return response({ error: 'Newspaper images could not be loaded.' }, 500);
  }
}

export async function POST(request: Request) {
  if (!(await isAuthorized())) return response({ error: 'Admin sign-in required.' }, 401);
  if (!process.env.DATABASE_URL) return response({ error: 'The Neon database is not configured.' }, 503);

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return response({ error: 'Choose a valid image file and try again.' }, 400);
  }

  const file = formData.get('image');
  const titleEn = formData.get('title_en');
  const titleUr = formData.get('title_ur');
  if (!(file instanceof File)) return response({ error: 'Choose a newspaper image to upload.' }, 400);
  if (typeof titleEn !== 'string' || !titleEn.trim() || titleEn.trim().length > 180) {
    return response({ error: 'Enter an English title of up to 180 characters.' }, 400);
  }
  if (typeof titleUr !== 'string' || titleUr.trim().length > 180) {
    return response({ error: 'The Urdu title must be 180 characters or fewer.' }, 400);
  }
  if (file.size === 0 || file.size > maxImageSize) {
    return response({ error: 'Choose an image no larger than 4 MB.' }, 400);
  }

  const bytes = new Uint8Array(await file.arrayBuffer());
  const mimeType = detectImageType(bytes);
  if (!mimeType || !acceptedMimeTypes.includes(mimeType)) {
    return response({ error: 'Only valid JPEG, PNG, and WebP newspaper images are supported.' }, 400);
  }

  try {
    const sql = neon(process.env.DATABASE_URL);
    const [image] = await sql`
      INSERT INTO newspaper_gallery (title_en, title_ur, mime_type, image_data, sort_order)
      VALUES (
        ${titleEn.trim()}, ${titleUr.trim()}, ${mimeType}, decode(${Buffer.from(bytes).toString('base64')}, 'base64'),
        (SELECT COALESCE(MAX(sort_order) + 1, 0) FROM newspaper_gallery)
      )
      RETURNING id
    `;
    return response({ id: image.id }, 201);
  } catch (error) {
    const databaseError = error && typeof error === 'object' ? error as { name?: unknown; code?: unknown } : {};
    console.error('Admin newspaper upload failed', {
      name: typeof databaseError.name === 'string' ? databaseError.name : 'UnknownError',
      code: typeof databaseError.code === 'string' ? databaseError.code : undefined,
    });
    return response({ error: 'The newspaper image could not be saved.' }, 500);
  }
}
