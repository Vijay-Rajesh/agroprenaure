import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import SiteContentPage from '@/components/site-content-page';
import { findSitePage, pageGroups } from '@/lib/site-content';
import { getSiteCmsPage } from '@/lib/site-cms';

export const dynamicParams = true;
export const dynamic = 'force-dynamic';

export function generateStaticParams() {
  return pageGroups.flatMap((group) =>
    group.pages.map((contentPage) => ({ slug: [group.slug, contentPage.slug] })),
  );
}

export async function generateMetadata({ params }: PageProps<'/[...slug]'>): Promise<Metadata> {
  const { slug } = await params;
  let content = null;
  try {
    content = await getSiteCmsPage(`/${slug.join('/')}`);
  } catch {
    content = null;
  }
  if (content === false) return {};
  content ??= findSitePage(slug);

  if (!content) return {};

  return {
    title: `${content.page.title} | The Agropreneurs`,
    description: content.page.intro,
  };
}

export default async function Page({ params }: PageProps<'/[...slug]'>) {
  const { slug } = await params;
  let content = null;
  try {
    content = await getSiteCmsPage(`/${slug.join('/')}`);
  } catch {
    content = null;
  }
  if (content === false) notFound();
  content ??= findSitePage(slug);

  if (!content) notFound();

  return <SiteContentPage group={content.group} page={content.page} />;
}
