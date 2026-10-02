import { cookies } from 'next/headers';
import { z } from 'zod';
import {
  adminCookieName,
  adminSessionMaxAge,
  createAdminSession,
  isAdminAuthConfigured,
  verifyAdminPassword,
} from '@/lib/admin-auth';

export const runtime = 'nodejs';

const credentialsSchema = z.object({ password: z.string().min(1).max(256) }).strict();

function response(body: object, status: number) {
  return Response.json(body, { status, headers: { 'Cache-Control': 'no-store' } });
}

export async function POST(request: Request) {
  if (!isAdminAuthConfigured()) {
    return response({ error: 'Admin access is not configured. Set a strong ADMIN_PASSWORD and ADMIN_SESSION_SECRET.' }, 503);
  }

  let body: unknown;
  try {
    const rawBody = await request.text();
    if (rawBody.length > 2048) return response({ error: 'Invalid sign-in request.' }, 400);
    body = JSON.parse(rawBody) as unknown;
  } catch {
    return response({ error: 'Invalid sign-in request.' }, 400);
  }

  const parsed = credentialsSchema.safeParse(body);
  if (!parsed.success || !verifyAdminPassword(parsed.data.password)) {
    return response({ error: 'The password is incorrect.' }, 401);
  }

  const cookieStore = await cookies();
  cookieStore.set({
    name: adminCookieName,
    value: createAdminSession(),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/api/admin',
    maxAge: adminSessionMaxAge,
  });

  return response({ authenticated: true }, 200);
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete({ name: adminCookieName, path: '/api/admin' });
  return response({ authenticated: false }, 200);
}
