import 'server-only';

import { neon, type NeonQueryFunction } from '@neondatabase/serverless';
import { pageGroups, navigationSections, type SiteContentGroup, type SiteContentPage } from '@/lib/site-content';
import { translatePage, translateSiteText } from '@/lib/site-translations';
import { defaultHomeHero, type HomeHeroSettings } from '@/lib/site-settings';

type SitePageRow = {
  id: string;
  path: string;
  group_key: string;
  group_label_en: string;
  group_label_ur: string;
  group_description_en: string;
  group_description_ur: string;
  title_en: string;
  title_ur: string;
  intro_en: string;
  intro_ur: string;
  section_title_en: string;
  section_title_ur: string;
  body_en: string;
  body_ur: string;
  focus_en: string[];
  focus_ur: string[];
  directory: unknown[];
  hero_image_url: string;
  is_published: boolean;
  sort_order: number;
};

type SiteNavigationRow = {
  id: string;
  section_key: string;
  section_label_en: string;
  section_label_ur: string;
  label_en: string;
  label_ur: string;
  href: string;
  sort_order: number;
  is_visible: boolean;
};

export type SiteCmsSnapshot = {
  pages: SitePageRow[];
  navigation: SiteNavigationRow[];
  home: HomeHeroSettings;
};

export type PublicSiteSnapshot = {
  home: HomeHeroSettings;
  homeLink: { labelEn: string; labelUr: string; href: string } | null;
  navigation: {
    key: string;
    labelEn: string;
    labelUr: string;
    items: { labelEn: string; labelUr: string; href: string }[];
  }[];
};

const imageSearchTerms = ['rice-field', 'wheat-farm', 'greenhouse', 'livestock', 'dairy-farm', 'poultry-farm', 'fish-farm', 'forest-farm', 'beekeeping', 'silkworm', 'soil-research', 'farm-laboratory', 'crop-research', 'irrigation-farm', 'farm-technology', 'harvest', 'cold-storage', 'food-market', 'farm-transport', 'climate-farm', 'agricultural-university', 'farm-training', 'agriculture-products', 'farm-business', 'farm-partnership', 'farmer-community', 'farm-event'];

function getDatabase() {
  return process.env.DATABASE_URL ? neon(process.env.DATABASE_URL) : null;
}

function getDefaultImage(index: number) {
  const term = imageSearchTerms[index % imageSearchTerms.length];
  return `https://loremflickr.com/1600/900/${term}?lock=${index + 2040}`;
}

function getUrduPage(page: SiteContentPage) {
  const translated = translatePage(page, true);
  return {
    title: translated.title,
    intro: translated.intro,
    sectionTitle: translated.sectionTitle,
    body: translated.body,
    focus: translated.focus,
  };
}

async function seedDefaultSiteContent(sql: NeonQueryFunction<false, false>) {
  const seeded = await sql`SELECT key FROM site_settings WHERE key = 'cms-default-content-v1'`;
  await sql`
    INSERT INTO site_navigation_items (
      section_key, section_label_en, section_label_ur, label_en, label_ur, href, sort_order
    ) VALUES ('__home', 'HOME LINK', 'مرکزی لنک', 'HOME', 'صفحہ اول', '/', -1)
    ON CONFLICT (section_key, href) DO NOTHING
  `;
  if (seeded.length) return;

  let imageIndex = 0;
  let pageOrder = 0;
  for (const group of pageGroups) {
    const groupLabelUr = translateSiteText(group.label, true);
    const groupDescriptionUr = translateSiteText(group.description, true);
    for (const page of group.pages) {
      const urdu = getUrduPage(page);
      const path = `/${group.slug}/${page.slug}`;
      const heroImageUrl = page.slug === 'universities' || page.slug === 'research-centres'
        ? getDefaultImage(imageIndex++)
        : getDefaultImage(imageIndex++);
      await sql`
        INSERT INTO site_pages (
          path, group_key, group_label_en, group_label_ur,
          group_description_en, group_description_ur,
          title_en, title_ur, intro_en, intro_ur,
          section_title_en, section_title_ur, body_en, body_ur,
          focus_en, focus_ur, directory, hero_image_url, sort_order
        ) VALUES (
          ${path}, ${group.slug}, ${group.label}, ${groupLabelUr},
          ${group.description}, ${groupDescriptionUr},
          ${page.title}, ${urdu.title}, ${page.intro}, ${urdu.intro},
          ${page.sectionTitle}, ${urdu.sectionTitle}, ${page.body}, ${urdu.body},
          ${JSON.stringify(page.focus)}::jsonb, ${JSON.stringify(urdu.focus)}::jsonb,
          ${JSON.stringify(page.directory ?? [])}::jsonb, ${heroImageUrl}, ${pageOrder++}
        ) ON CONFLICT (path) DO NOTHING
      `;
    }
  }

  let navigationOrder = 0;
  for (const section of navigationSections) {
    for (const item of section.items) {
      if (!item.href) continue;
      const matchingPage = pageGroups.flatMap((group) => group.pages.map((page) => ({ group, page })))
        .find(({ group, page }) => `/${group.slug}/${page.slug}` === item.href)?.page;
      const itemLabelUr = matchingPage ? getUrduPage(matchingPage).title : translateSiteText(item.label, true);
      await sql`
        INSERT INTO site_navigation_items (
          section_key, section_label_en, section_label_ur, label_en, label_ur, href, sort_order
        ) VALUES (
          ${section.label.toLowerCase().replace(/[^a-z0-9]+/g, '-')},
          ${section.label}, ${translateSiteText(section.label, true)},
          ${item.label}, ${itemLabelUr}, ${item.href}, ${navigationOrder++}
        ) ON CONFLICT (section_key, href) DO NOTHING
      `;
    }
  }

  await sql`
    INSERT INTO site_settings (key, value)
    VALUES ('home-hero', ${JSON.stringify(defaultHomeHero)}::jsonb)
    ON CONFLICT (key) DO NOTHING
  `;
  await sql`
    INSERT INTO site_settings (key, value)
    VALUES ('cms-default-content-v1', '{"seeded":true}'::jsonb)
    ON CONFLICT (key) DO NOTHING
  `;
}

export async function getSiteCmsSnapshot(): Promise<SiteCmsSnapshot | null> {
  const sql = getDatabase();
  if (!sql) return null;
  await seedDefaultSiteContent(sql);

  const [pages, navigation, settings] = await Promise.all([
    sql`SELECT * FROM site_pages ORDER BY group_key, sort_order, created_at`,
    sql`SELECT * FROM site_navigation_items ORDER BY sort_order, created_at`,
    sql`SELECT value FROM site_settings WHERE key = 'home-hero'`,
  ]);

  return {
    pages: pages as unknown as SitePageRow[],
    navigation: navigation as unknown as SiteNavigationRow[],
    home: (settings[0]?.value as HomeHeroSettings | undefined) ?? defaultHomeHero,
  };
}

export async function getPublicSiteSnapshot(): Promise<PublicSiteSnapshot | null> {
  const sql = getDatabase();
  if (!sql) return null;
  await seedDefaultSiteContent(sql);

  const [navigation, settings] = await Promise.all([
    sql`SELECT * FROM site_navigation_items ORDER BY sort_order, created_at`,
    sql`SELECT value FROM site_settings WHERE key = 'home-hero'`,
  ]);
  const navigationRows = navigation as unknown as SiteNavigationRow[];
  const sections = new Map<string, PublicSiteSnapshot['navigation'][number]>();
  const homeItem = navigationRows.find((item) => item.section_key === '__home' && item.is_visible);

  for (const item of navigationRows) {
    if (!item.is_visible || item.section_key === '__home') continue;
    const section = sections.get(item.section_key) ?? {
      key: item.section_key,
      labelEn: item.section_label_en,
      labelUr: item.section_label_ur,
      items: [],
    };
    section.items.push({ labelEn: item.label_en, labelUr: item.label_ur, href: item.href });
    sections.set(item.section_key, section);
  }

  return {
    home: (settings[0]?.value as HomeHeroSettings | undefined) ?? defaultHomeHero,
    homeLink: homeItem ? { labelEn: homeItem.label_en, labelUr: homeItem.label_ur, href: homeItem.href } : null,
    navigation: [...sections.values()],
  };
}

export function toSitePageGroup(page: SitePageRow): { group: SiteContentGroup; page: SiteContentPage & { heroImageUrl: string } } {
  const pathParts = page.path.split('/').filter(Boolean);
  const group: SiteContentGroup = {
    slug: page.group_key,
    label: page.group_label_en,
    description: page.group_description_en,
    labelUr: page.group_label_ur,
    descriptionUr: page.group_description_ur,
    pages: [],
  };
  const contentPage: SiteContentPage & { heroImageUrl: string } = {
    slug: pathParts.at(-1) ?? page.path,
    title: page.title_en,
    intro: page.intro_en,
    sectionTitle: page.section_title_en,
    body: page.body_en,
    focus: page.focus_en,
    directory: page.directory as SiteContentPage['directory'],
    heroImageUrl: page.hero_image_url,
    urdu: {
      title: page.title_ur,
      intro: page.intro_ur,
      sectionTitle: page.section_title_ur,
      body: page.body_ur,
      focus: page.focus_ur,
    },
  };
  group.pages = [contentPage];
  return { group, page: contentPage };
}

export async function getSiteCmsPage(path: string): Promise<Awaited<ReturnType<typeof toSitePageGroup>> | null | false> {
  const sql = getDatabase();
  if (!sql) return null;
  await seedDefaultSiteContent(sql);
  const rows = await sql`SELECT * FROM site_pages WHERE path = ${path} LIMIT 1`;
  if (!rows[0]) return null;
  const row = rows[0] as unknown as SitePageRow;
  if (!row.is_published) return false;
  const content = toSitePageGroup(row);
  const siblings = await sql`SELECT * FROM site_pages WHERE group_key = ${row.group_key} AND is_published = TRUE ORDER BY sort_order, created_at`;
  content.group.pages = siblings.map((sibling) => toSitePageGroup(sibling as unknown as SitePageRow).page);
  return content;
}