import { getPublicSiteSnapshot } from '@/lib/site-cms';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const snapshot = await getPublicSiteSnapshot();
    if (!snapshot) return Response.json({ site: null }, { headers: { 'Cache-Control': 'no-store' } });

    return Response.json({
      site: snapshot,
    }, { headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    const databaseError = error && typeof error === 'object' ? error as { name?: unknown; code?: unknown } : {};
    console.error('Public site content query failed', {
      name: typeof databaseError.name === 'string' ? databaseError.name : 'UnknownError',
      code: typeof databaseError.code === 'string' ? databaseError.code : undefined,
    });
    return Response.json({ site: null }, { headers: { 'Cache-Control': 'no-store' } });
  }
}