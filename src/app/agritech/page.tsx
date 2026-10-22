import type { Metadata } from 'next';
import Link from 'next/link';
import SiteFooter from '@/components/site-footer';
import SiteHeader from '@/components/site-header';
import { agritechSections } from '@/lib/agritech-content';
import { agritechNavigationTopics } from '@/lib/agritech-navigation';

export const metadata: Metadata = {
  title: 'Agritech | The Agropreneurs',
  description: 'Explore agricultural technology, tools, water management, digital farming, and practical Agritech applications in Pakistan.',
};

export default function AgritechPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-[#f5f7f1] px-5 py-12 text-slate-800 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto mb-9 max-w-5xl">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-emerald-700">
            Agriculture technology in Pakistan
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-green-950 sm:text-5xl">Agritech</h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg">
            Explore practical technologies and approaches supporting more productive, efficient, and sustainable agriculture.
          </p>
        </div>
        <div className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-2">
          {agritechNavigationTopics.map((topic) => {
            const section = agritechSections.find((item) => item.number === topic.number);
            if (!section) return null;

            return (
              <Link
                className="group flex min-h-28 items-center gap-4 rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-md sm:p-6"
                href={`/agritech/${topic.slug}`}
                key={topic.slug}
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-900 text-sm font-bold text-white">
                  {String(topic.number).padStart(2, '0')}
                </span>
                <span className="font-bold leading-6 text-green-950 group-hover:text-emerald-800">
                  {section.title}
                </span>
              </Link>
            );
          })}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
