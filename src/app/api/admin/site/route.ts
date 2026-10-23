import { neon } from '@neondatabase/serverless';
import { cookies } from 'next/headers';
import { z } from 'zod';
import { adminCookieName, isValidAdminSession } from '@/lib/admin-auth';
import { getSiteCmsSnapshot } from '@/lib/site-cms';
import { defaultHomeHero } from '@/lib/site-settings';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const shortText = z.string().trim().max(240);
const pathValue = z.string().trim().min(1).max(240).refine((value) => !value.startsWith('//') && !/^[a-z]+:/i.test(value));
const imageUrl = z.string().trim().max(1000).refine((value) => !value || value.startsWith('/') || /^https:\/\//i.test(value));
const stringList = z.array(z.string().trim().min(1).max(240)).max(30);

const pageSchema = z.object({
  path: pathValue,
  group_key: z.string().trim().min(1).max(80),
  group_label_en: z.string().trim().min(1).max(120),
  group_label_ur: z.string().trim().max(120),
  group_description_en: z.string().trim().max(500),
  group_description_ur: z.string().trim().max(500),
  title_en: z.string().trim().min(1).max(180),
  title_ur: z.string().trim().max(180),
  intro_en: z.string().trim().max(1500),
  intro_ur: z.string().trim().max(1500),
  section_title_en: z.string().trim().max(240),
  section_title_ur: z.string().trim().max(240),
  body_en: z.string().trim().max(8000),
  body_ur: z.string().trim().max(8000),
  focus_en: stringList,
  focus_ur: stringList,
  directory: z.array(z.unknown()).max(300),
  hero_image_url: imageUrl,
  is_published: z.boolean(),
  sort_order: z.number().int().min(0).max(10000),
}).strict();

const navigationSchema = z.object({
  section_key: z.string().trim().min(1).max(80),
  section_label_en: z.string().trim().min(1).max(120),
  section_label_ur: z.string().trim().max(120),
  label_en: z.string().trim().min(1).max(120),
  label_ur: z.string().trim().max(120),
  href: pathValue,
  sort_order: z.number().int().min(0).max(10000),
  is_visible: z.boolean(),
}).strict().refine((item) => item.href.startsWith('/'), { path: ['href'], message: 'Use an internal site path.' });

const statSchema = z.object({
  valueEn: shortText,
  valueUr: shortText,
  labelEn: z.string().trim().max(180),
  labelUr: z.string().trim().max(180),
}).strict();

const impactItemSchema = z.object({
  titleEn: z.string().trim().min(1).max(180),
  titleUr: z.string().trim().min(1).max(180),
  descriptionEn: z.string().trim().max(500),
  descriptionUr: z.string().trim().max(500),
}).strict();

const pillarSchema = z.object({
  titleEn: z.string().trim().min(1).max(180),
  titleUr: z.string().trim().min(1).max(180),
  bodyEn: z.string().trim().max(1000),
  bodyUr: z.string().trim().max(1000),
}).strict();

const homeSchema = z.object({
  eyebrowEn: shortText,
  eyebrowUr: shortText,
  titleEn: z.string().trim().min(1).max(240),
  titleUr: z.string().trim().min(1).max(240),
  descriptionEn: z.string().trim().max(1000),
  descriptionUr: z.string().trim().max(1000),
  imageUrl,
  visionEyebrowEn: shortText,
  visionEyebrowUr: shortText,
  visionTitleEn: z.string().trim().min(1).max(240),
  visionTitleUr: z.string().trim().min(1).max(240),
  visionLeadEn: z.string().trim().max(500),
  visionLeadUr: z.string().trim().max(500),
  visionBodyEn: z.string().trim().max(2000),
  visionBodyUr: z.string().trim().max(2000),
  stats: z.array(statSchema).max(6),
  impactEyebrowEn: shortText,
  impactEyebrowUr: shortText,
  impactTitleEn: z.string().trim().max(240),
  impactTitleUr: z.string().trim().max(240),
  impactItems: z.array(impactItemSchema).max(24),
  aboutEyebrowEn: shortText,
  aboutEyebrowUr: shortText,
  aboutTitleEn: z.string().trim().max(240),
  aboutTitleUr: z.string().trim().max(240),
  aboutDescriptionEn: z.string().trim().max(1000),
  aboutDescriptionUr: z.string().trim().max(1000),
  pillars: z.array(pillarSchema).max(8),
  quoteEn: z.string().trim().max(500),
  quoteUr: z.string().trim().max(500),
}).strict();

const requestSchema = z.discriminatedUnion('kind', [
  z.object({ kind: z.literal('page'), ...pageSchema.shape }).strict(),
  z.object({ kind: z.literal('navigation'), ...navigationSchema.shape }).strict(),
  z.object({ kind: z.literal('home'), ...homeSchema.shape }).strict(),
]);

function response(body: object, status: number) {
  return Response.json(body, { status, headers: { 'Cache-Control': 'no-store' } });
}

function normalisePath(path: string) {
  const clean = path.trim().replace(/\/+$/, '').replace(/^\/+/, '').toLowerCase();
  return `/${clean}`;
}

function safeString(value: unknown, fallback = '') {
  return typeof value === 'string' ? value : fallback;
}

function safeNumber(value: unknown, fallback = 0) {
  const parsed = typeof value === 'number' ? value : Number(value);
  return Number.isFinite(parsed) ? Math.max(0, parsed) : fallback;
}

function normalisePagePayload(value: unknown) {
  const record = value && typeof value === 'object' ? value as Record<string, unknown> : {};
  const cleaned = Object.fromEntries(Object.entries(record).filter(([key]) => !['created_at', 'updated_at'].includes(key)));
  return {
    path: safeString(cleaned.path, '/new-page'),
    group_key: safeString(cleaned.group_key, 'custom'),
    group_label_en: safeString(cleaned.group_label_en, 'MORE'),
    group_label_ur: safeString(cleaned.group_label_ur, 'مزید'),
    group_description_en: safeString(cleaned.group_description_en),
    group_description_ur: safeString(cleaned.group_description_ur),
    title_en: safeString(cleaned.title_en),
    title_ur: safeString(cleaned.title_ur),
    intro_en: safeString(cleaned.intro_en),
    intro_ur: safeString(cleaned.intro_ur),
    section_title_en: safeString(cleaned.section_title_en),
    section_title_ur: safeString(cleaned.section_title_ur),
    body_en: safeString(cleaned.body_en),
    body_ur: safeString(cleaned.body_ur),
    focus_en: Array.isArray(cleaned.focus_en) ? cleaned.focus_en.map(String).filter(Boolean) : [],
    focus_ur: Array.isArray(cleaned.focus_ur) ? cleaned.focus_ur.map(String).filter(Boolean) : [],
    directory: Array.isArray(cleaned.directory) ? cleaned.directory : [],
    hero_image_url: safeString(cleaned.hero_image_url),
    is_published: cleaned.is_published === true,
    sort_order: safeNumber(cleaned.sort_order, 100),
  };
}

function normaliseNavigationPayload(value: unknown) {
  const record = value && typeof value === 'object' ? value as Record<string, unknown> : {};
  const cleaned = Object.fromEntries(Object.entries(record).filter(([key]) => !['created_at', 'updated_at'].includes(key)));
  return {
    section_key: safeString(cleaned.section_key, 'custom'),
    section_label_en: safeString(cleaned.section_label_en, 'MORE'),
    section_label_ur: safeString(cleaned.section_label_ur, 'مزید'),
    label_en: safeString(cleaned.label_en),
    label_ur: safeString(cleaned.label_ur),
    href: safeString(cleaned.href, '/'),
    sort_order: safeNumber(cleaned.sort_order, 100),
    is_visible: cleaned.is_visible === true,
  };
}

function normaliseHomePayload(value: unknown) {
  const base = defaultHomeHero;
  const source = value && typeof value === 'object' ? value as Record<string, unknown> : {};
  return {
    ...base,
    ...source,
    stats: Array.isArray(source.stats) ? source.stats as typeof base.stats : base.stats,
    impactItems: Array.isArray(source.impactItems) ? source.impactItems as typeof base.impactItems : base.impactItems,
    pillars: Array.isArray(source.pillars) ? source.pillars as typeof base.pillars : base.pillars,
  };
}

async function isAuthorized() {
  const cookieStore = await cookies();
  return isValidAdminSession(cookieStore.get(adminCookieName)?.value);
}

async function parseBody(request: Request) {
  const raw = await request.text();
  if (raw.length > 40_000) return { error: 'CMS changes are too large.' } as const;
  try {
    return { body: JSON.parse(raw) as unknown } as const;
  } catch {
    return { error: 'CMS changes must be valid JSON.' } as const;
  }
}

export async function GET() {
  if (!(await isAuthorized())) return response({ error: 'Admin sign-in required.' }, 401);
  if (!process.env.DATABASE_URL) return response({ error: 'The Neon database is not configured.' }, 503);

  try {
    const snapshot = await getSiteCmsSnapshot();
    return response({ pages: snapshot?.pages ?? [], navigation: snapshot?.navigation ?? [], home: snapshot?.home }, 200);
  } catch (error) {
    const databaseError = error && typeof error === 'object' ? error as { name?: unknown; code?: unknown } : {};
    console.error('Admin site content query failed', {
      name: typeof databaseError.name === 'string' ? databaseError.name : 'UnknownError',
      code: typeof databaseError.code === 'string' ? databaseError.code : undefined,
    });
    return response({ error: 'Site content could not be loaded.' }, 500);
  }
}

export async function POST(request: Request) {
  if (!(await isAuthorized())) return response({ error: 'Admin sign-in required.' }, 401);
  if (!process.env.DATABASE_URL) return response({ error: 'The Neon database is not configured.' }, 503);

  const body = await parseBody(request);
  if ('error' in body) return response({ error: body.error }, 400);
  const parsed = requestSchema.safeParse(body.body);
  if (!parsed.success) return response({ error: 'Check the site content fields and try again.' }, 400);

  try {
    const sql = neon(process.env.DATABASE_URL);
    if (parsed.data.kind === 'home') {
      await sql`
        INSERT INTO site_settings (key, value)
        VALUES ('home-hero', ${JSON.stringify(parsed.data)}::jsonb)
        ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = now()
      `;
      return response({ success: true }, 200);
    }
    if (parsed.data.kind === 'page') {
      const data = parsed.data;
      const [page] = await sql`
        INSERT INTO site_pages (
          path, group_key, group_label_en, group_label_ur, group_description_en, group_description_ur,
          title_en, title_ur, intro_en, intro_ur, section_title_en, section_title_ur, body_en, body_ur,
          focus_en, focus_ur, directory, hero_image_url, is_published, sort_order
        ) VALUES (
          ${normalisePath(data.path)}, ${data.group_key}, ${data.group_label_en}, ${data.group_label_ur},
          ${data.group_description_en}, ${data.group_description_ur}, ${data.title_en}, ${data.title_ur},
          ${data.intro_en}, ${data.intro_ur}, ${data.section_title_en}, ${data.section_title_ur},
          ${data.body_en}, ${data.body_ur}, ${JSON.stringify(data.focus_en)}::jsonb,
          ${JSON.stringify(data.focus_ur)}::jsonb, ${JSON.stringify(data.directory)}::jsonb,
          ${data.hero_image_url}, ${data.is_published}, ${data.sort_order}
        ) RETURNING id
      `;
      return response({ id: page.id }, 201);
    }

    const data = parsed.data;
    const [item] = await sql`
      INSERT INTO site_navigation_items (
        section_key, section_label_en, section_label_ur, label_en, label_ur, href, sort_order, is_visible
      ) VALUES (
        ${data.section_key}, ${data.section_label_en}, ${data.section_label_ur},
        ${data.label_en}, ${data.label_ur}, ${normalisePath(data.href)}, ${data.sort_order}, ${data.is_visible}
      ) RETURNING id
    `;
    return response({ id: item.id }, 201);
  } catch (error) {
    const databaseError = error && typeof error === 'object' ? error as { name?: unknown; code?: unknown } : {};
    console.error('Admin site content insert failed', {
      name: typeof databaseError.name === 'string' ? databaseError.name : 'UnknownError',
      code: typeof databaseError.code === 'string' ? databaseError.code : undefined,
    });
    return response({ error: 'The site content could not be saved. Check that the page path or menu link is unique.' }, 500);
  }
}

export async function PATCH(request: Request) {
  if (!(await isAuthorized())) return response({ error: 'Admin sign-in required.' }, 401);
  if (!process.env.DATABASE_URL) return response({ error: 'The Neon database is not configured.' }, 503);

  const body = await parseBody(request);
  if ('error' in body) return response({ error: body.error }, 400);
  const envelope = z.object({ kind: z.enum(['page', 'navigation', 'navigation-section', 'navigation-order', 'home']), id: z.string().optional() }).passthrough().safeParse(body.body);
  if (!envelope.success || (['page', 'navigation'].includes(envelope.data.kind) && !envelope.data.id)) return response({ error: 'A CMS item ID is required.' }, 400);

  try {
    const sql = neon(process.env.DATABASE_URL);
    if (envelope.data.kind === 'navigation-order') {
      const parsed = z.object({
        kind: z.literal('navigation-order'),
        section_keys: z.array(z.string().trim().min(1).max(80)).min(1).max(100),
      }).strict().safeParse(body.body);
      if (!parsed.success || new Set(parsed.data?.section_keys ?? []).size !== parsed.data?.section_keys.length) {
        return response({ error: 'The navbar section order is invalid.' }, 400);
      }

      const currentSections = await sql`
        SELECT DISTINCT section_key
        FROM site_navigation_items
        WHERE section_key <> '__home'
      `;
      const currentKeys = currentSections.map((section) => String(section.section_key));
      if (
        currentKeys.length !== parsed.data.section_keys.length
        || currentKeys.some((key) => !parsed.data.section_keys.includes(key))
      ) {
        return response({ error: 'The navbar has changed. Reload the page and try again.' }, 409);
      }

      for (const [groupIndex, sectionKey] of parsed.data.section_keys.entries()) {
        const items = await sql`
          SELECT id FROM site_navigation_items
          WHERE section_key = ${sectionKey}
          ORDER BY sort_order, created_at, id
        `;
        for (const [itemIndex, item] of items.entries()) {
          await sql`
            UPDATE site_navigation_items
            SET sort_order = ${(groupIndex + 1) * 10000 + itemIndex}, updated_at = now()
            WHERE id = ${item.id}
          `;
        }
      }

      return response({ success: true }, 200);
    }
    if (envelope.data.kind === 'navigation-section') {
      const parsed = z.object({
        kind: z.literal('navigation-section'),
        section_key: z.string().trim().min(1).max(80),
        is_visible: z.boolean(),
      }).strict().safeParse(body.body);
      if (!parsed.success) return response({ error: 'Check the navbar section fields.' }, 400);
      const result = await sql`
        UPDATE site_navigation_items SET is_visible = ${parsed.data.is_visible}, updated_at = now()
        WHERE section_key = ${parsed.data.section_key} RETURNING id
      `;
      return result.length ? response({ success: true, updated: result.length }, 200) : response({ error: 'Navbar section not found.' }, 404);
    }
    if (envelope.data.kind === 'home') {
      const { kind, ...payload } = body.body as { kind: string };
      const parsed = homeSchema.safeParse(normaliseHomePayload(payload));
      if (!parsed.success) return response({ error: 'Check the homepage hero fields.' }, 400);
      await sql`
        UPDATE site_settings SET value = ${JSON.stringify(parsed.data)}::jsonb, updated_at = now()
        WHERE key = 'home-hero'
      `;
      return response({ success: true }, 200);
    }

    if (envelope.data.kind === 'page') {
      const { kind, id, ...payload } = body.body as { kind: string; id: string };
      const parsed = z.object({ id: z.string().uuid(), ...pageSchema.shape }).strict().safeParse({ id, ...normalisePagePayload(payload) });
      if (!parsed.success) return response({ error: 'Check the page content fields.' }, 400);
      const data = parsed.data;
      const result = await sql`
        UPDATE site_pages SET
          path = ${normalisePath(data.path)}, group_key = ${data.group_key},
          group_label_en = ${data.group_label_en}, group_label_ur = ${data.group_label_ur},
          group_description_en = ${data.group_description_en}, group_description_ur = ${data.group_description_ur},
          title_en = ${data.title_en}, title_ur = ${data.title_ur}, intro_en = ${data.intro_en}, intro_ur = ${data.intro_ur},
          section_title_en = ${data.section_title_en}, section_title_ur = ${data.section_title_ur},
          body_en = ${data.body_en}, body_ur = ${data.body_ur},
          focus_en = ${JSON.stringify(data.focus_en)}::jsonb, focus_ur = ${JSON.stringify(data.focus_ur)}::jsonb,
          directory = ${JSON.stringify(data.directory)}::jsonb, hero_image_url = ${data.hero_image_url},
          is_published = ${data.is_published}, sort_order = ${data.sort_order}, updated_at = now()
        WHERE id = ${parsed.data.id} RETURNING id
      `;
      return result.length ? response({ success: true }, 200) : response({ error: 'Page not found.' }, 404);
    }

    const { kind, id, ...payload } = body.body as { kind: string; id: string };
    const parsed = z.object({ id: z.string().uuid(), ...navigationSchema.shape }).strict().safeParse({ id, ...normaliseNavigationPayload(payload) });
    if (!parsed.success) return response({ error: 'Check the navbar item fields.' }, 400);
    const data = parsed.data;
    const result = await sql`
      UPDATE site_navigation_items SET
        section_key = ${data.section_key}, section_label_en = ${data.section_label_en}, section_label_ur = ${data.section_label_ur},
        label_en = ${data.label_en}, label_ur = ${data.label_ur}, href = ${normalisePath(data.href)},
        sort_order = ${data.sort_order}, is_visible = ${data.is_visible}, updated_at = now()
      WHERE id = ${parsed.data.id} RETURNING id
    `;
    return result.length ? response({ success: true }, 200) : response({ error: 'Navbar item not found.' }, 404);
  } catch (error) {
    const databaseError = error && typeof error === 'object' ? error as { name?: unknown; code?: unknown } : {};
    console.error('Admin site content update failed', {
      name: typeof databaseError.name === 'string' ? databaseError.name : 'UnknownError',
      code: typeof databaseError.code === 'string' ? databaseError.code : undefined,
    });
    return response({ error: 'The site content could not be updated.' }, 500);
  }
}

export async function DELETE(request: Request) {
  if (!(await isAuthorized())) return response({ error: 'Admin sign-in required.' }, 401);
  if (!process.env.DATABASE_URL) return response({ error: 'The Neon database is not configured.' }, 503);

  const body = await parseBody(request);
  if ('error' in body) return response({ error: body.error }, 400);
  const parsed = z.object({ kind: z.enum(['page', 'navigation']), id: z.string().uuid() }).strict().safeParse(body.body);
  if (!parsed.success) return response({ error: 'A valid CMS item ID is required.' }, 400);

  try {
    const sql = neon(process.env.DATABASE_URL);
    const result = parsed.data.kind === 'page'
      ? await sql`UPDATE site_pages SET is_published = FALSE, updated_at = now() WHERE id = ${parsed.data.id} RETURNING id`
      : await sql`DELETE FROM site_navigation_items WHERE id = ${parsed.data.id} RETURNING id`;
    return result.length ? response({ success: true }, 200) : response({ error: 'CMS item not found.' }, 404);
  } catch (error) {
    const databaseError = error && typeof error === 'object' ? error as { name?: unknown; code?: unknown } : {};
    console.error('Admin site content delete failed', {
      name: typeof databaseError.name === 'string' ? databaseError.name : 'UnknownError',
      code: typeof databaseError.code === 'string' ? databaseError.code : undefined,
    });
    return response({ error: 'The CMS item could not be deleted.' }, 500);
  }
}