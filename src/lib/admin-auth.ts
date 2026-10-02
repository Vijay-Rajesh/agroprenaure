import 'server-only';

import { createHash, createHmac, randomBytes, timingSafeEqual } from 'node:crypto';

export const adminCookieName = 'vision2040_admin_session';
export const adminSessionMaxAge = 8 * 60 * 60;

function getSessionSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET;
  return secret && Buffer.byteLength(secret, 'utf8') >= 32 ? secret : null;
}

export function isAdminAuthConfigured() {
  const password = process.env.ADMIN_PASSWORD;
  return Boolean(password && Buffer.byteLength(password, 'utf8') >= 16 && getSessionSecret());
}

export function verifyAdminPassword(candidate: string) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;

  const expectedDigest = createHash('sha256').update(expected).digest();
  const candidateDigest = createHash('sha256').update(candidate).digest();
  return timingSafeEqual(expectedDigest, candidateDigest);
}

export function createAdminSession() {
  const secret = getSessionSecret();
  if (!secret) throw new Error('Admin session signing secret is not configured.');

  const payload = Buffer.from(JSON.stringify({
    expiresAt: Date.now() + adminSessionMaxAge * 1000,
    nonce: randomBytes(16).toString('hex'),
  })).toString('base64url');
  const signature = createHmac('sha256', secret).update(payload).digest('base64url');
  return `${payload}.${signature}`;
}

export function isValidAdminSession(session: string | undefined) {
  const secret = getSessionSecret();
  if (!secret || !session) return false;

  const [payload, suppliedSignature, extra] = session.split('.');
  if (!payload || !suppliedSignature || extra !== undefined) return false;

  const expectedSignature = createHmac('sha256', secret).update(payload).digest();
  const actualSignature = Buffer.from(suppliedSignature, 'base64url');
  if (actualSignature.length !== expectedSignature.length || !timingSafeEqual(actualSignature, expectedSignature)) {
    return false;
  }

  try {
    const data = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8')) as { expiresAt?: unknown };
    return typeof data.expiresAt === 'number' && data.expiresAt > Date.now();
  } catch {
    return false;
  }
}
