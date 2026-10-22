import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import SiteFooter from '@/components/site-footer';
import SiteHeader from '@/components/site-header';
import { agritechSections } from '@/lib/agritech-content';
import { agritechNavigationTopics } from '@/lib/agritech-navigation';

function getTopic(slug: string) {
  const topic = agritechNavigationTopics.find((item) => item.slug === slug);
  if (!topic) return null;

  const section = agritechSections.find((item) => item.number === topic.number);
  return section ? { topic, section } : null;
}

export function generateStaticParams() {
  return agritechNavigationTopics.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<'/agritech/[slug]'>): Promise<Metadata> {
  const { slug } = await params;
  const page = getTopic(slug);

  return page
    ? {
      title: `${page.section.title} | Agritech | The Agropreneurs`,
      description: `Learn about ${page.section.title.toLowerCase()} and its practical applications in agriculture.`,
    }
    : {};
}

export default async function AgritechTopicPage({
  params,
}: PageProps<'/agritech/[slug]'>) {
  const { slug } = await params;
  const page = getTopic(slug);
  if (!page) notFound();

  const topicIndex = agritechNavigationTopics.findIndex((topic) => topic.slug === slug);
  const previousTopic = agritechNavigationTopics[topicIndex - 1];
  const nextTopic = agritechNavigationTopics[topicIndex + 1];

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-[#f5f7f1] px-5 py-12 text-slate-800 sm:px-6 sm:py-16 lg:px-8">
        <article className="mx-auto max-w-5xl">
          <Link
            className="text-sm font-semibold text-emerald-800 underline decoration-emerald-300 underline-offset-4 hover:text-green-950"
            href="/agritech"
          >
            Agritech topics
          </Link>
          <header className="mb-8 mt-6 rounded-[28px] border border-emerald-200 bg-gradient-to-br from-white to-emerald-50 p-6 shadow-sm sm:p-9">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-emerald-700">
              Agritech topic {String(page.section.number).padStart(2, '0')} of 14
            </p>
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-green-950 sm:text-5xl">
              {page.section.title}
            </h1>
          </header>

          <div className="space-y-4 rounded-[28px] border border-emerald-100 bg-white p-6 text-sm leading-7 text-slate-700 shadow-sm sm:p-9 sm:text-base">
            {page.section.content.map((item, index) => {
              if (item.type === 'heading') {
                return (
                  <h2 className="pt-3 text-lg font-bold leading-7 text-green-900 sm:text-xl" key={`${index}-${item.text}`}>
                    {item.text}
                  </h2>
                );
              }

              if (item.type === 'list') {
                return (
                  <ul className="list-disc space-y-1 pl-6 marker:text-emerald-700" key={`${index}-${item.text}`}>
                    <li>{item.text}</li>
                  </ul>
                );
              }

              return <p key={`${index}-${item.text}`}>{item.text}</p>;
            })}
          </div>

          <nav aria-label="Agritech topics" className="mt-8 flex flex-col justify-between gap-4 sm:flex-row">
            {previousTopic ? (
              <Link
                className="rounded-xl border border-emerald-200 bg-white px-5 py-4 text-sm font-semibold text-green-900 transition hover:border-emerald-400"
                href={`/agritech/${previousTopic.slug}`}
              >
                <span className="block text-xs font-medium uppercase tracking-wider text-emerald-700">Previous topic</span>
                {previousTopic.label}
              </Link>
            ) : <span />}
            {nextTopic ? (
              <Link
                className="rounded-xl border border-emerald-200 bg-white px-5 py-4 text-right text-sm font-semibold text-green-900 transition hover:border-emerald-400"
                href={`/agritech/${nextTopic.slug}`}
              >
                <span className="block text-xs font-medium uppercase tracking-wider text-emerald-700">Next topic</span>
                {nextTopic.label}
              </Link>
            ) : <span />}
          </nav>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
