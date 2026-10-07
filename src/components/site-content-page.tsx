'use client';

import Link from 'next/link';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import type { SiteContentGroup, SiteContentPage as SiteContentPageData } from '@/lib/site-content';
import { useSiteLanguage } from '@/components/language-provider';
import SiteFooter from '@/components/site-footer';
import SiteHeader from '@/components/site-header';
import { translatePage, translateSiteText } from '@/lib/site-translations';

type SiteContentPageProps = {
  group: SiteContentGroup;
  page: SiteContentPageData;
};

export default function SiteContentPage({ group, page }: SiteContentPageProps) {
  const relatedPages = group.pages.filter((relatedPage) => relatedPage.slug !== page.slug).slice(0, 3);
  const { isUrdu } = useSiteLanguage();
  const text = (value: string) => translateSiteText(value, isUrdu);
  const contentPage = translatePage(page, isUrdu);
  const groupLabel = isUrdu ? group.labelUr || text(group.label) : group.label;
  const groupDescription = isUrdu ? group.descriptionUr || text(group.description) : group.description;

  return (
    <div id="top">
      <SiteHeader ctaHref="/survey-form" />
      <main>
        <section className="detail-hero relative isolate overflow-hidden">
          <div className="hero-photo" role="img" aria-label={contentPage.title} style={page.heroImageUrl ? { backgroundImage: `url(${JSON.stringify(page.heroImageUrl)}), url('/vision-2040-fields.jpg')` } : undefined} />
          <div className="hero-shade" />
          <div className="detail-hero-content mx-auto w-full max-w-6xl px-5">
            <nav className="detail-breadcrumbs" aria-label="Breadcrumb">
              <Link href="/">{text('HOME')}</Link><span aria-hidden="true">/</span><span>{groupLabel}</span>
            </nav>
            <p className="eyebrow hero-eyebrow">The Agropreneurs · {groupLabel}</p>
            <h1>{contentPage.title}</h1>
            <p className="detail-lead">{contentPage.intro}</p>
            <Link className="button hero-button" href="/survey-form">{text('Explore VISION 2040 survey')}<ArrowRight size={17} /></Link>
          </div>
        </section>

        <section className="detail-content-section">
          <div className="detail-content-wrap mx-auto grid w-full max-w-6xl gap-12 px-5 md:grid-cols-[1.05fr_0.95fr]">
            <article className="detail-article">
              <p className="eyebrow">{contentPage.title}</p>
              <h2>{contentPage.sectionTitle}</h2>
              <p>{contentPage.body}</p>
              <Link className="detail-back-link" href="/"><ArrowLeft size={16} />{text('Back to home')}</Link>
            </article>
            <aside className="detail-focus" aria-labelledby="detail-focus-title">
              <p className="eyebrow">{text('A closer look')}</p>
              <h2 id="detail-focus-title">{text('Areas of focus')}</h2>
              <ul>{contentPage.focus.map((item) => <li key={item}>{item}<ArrowUpRight size={15} aria-hidden="true" /></li>)}</ul>
            </aside>
          </div>
        </section>

        {page.directory && (
          <section className="directory-section" aria-labelledby="directory-title">
            <div className="detail-content-wrap mx-auto w-full max-w-6xl px-5">
              <p className="eyebrow">{text('Directory')}</p>
              <h2 id="directory-title">{isUrdu ? `${contentPage.title} پاکستان میں` : `${contentPage.title} in Pakistan`}</h2>
              <p className="detail-group-description">{page.directory.length} {text('institutions listed from the provided directory.')}</p>
              <ul className="directory-list">
                {page.directory.map((entry) => (
                  <li className="directory-entry" key={`${entry.name}-${entry.location}`}>
                    <div>
                      <h3>{entry.name}</h3>
                      <p>{entry.location}</p>
                      {entry.phone && <a href={`tel:${entry.phone.replace(/[^\d+]/g, '')}`}>{entry.phone}</a>}
                    </div>
                    {entry.website && <a className="directory-website" href={entry.website} target="_blank" rel="noreferrer">{text('Visit website')}<ArrowUpRight size={15} aria-hidden="true" /></a>}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {relatedPages.length > 0 && (
          <section className="detail-related-section">
            <div className="detail-content-wrap mx-auto w-full max-w-6xl px-5">
              <p className="eyebrow">{text('Explore more')}</p>
              <h2>{groupLabel}</h2>
              <p className="detail-group-description">{groupDescription}</p>
              <div className="related-page-list">
                {relatedPages.map((relatedPage) => (
                  <Link className="related-page-link" href={`/${group.slug}/${relatedPage.slug}`} key={relatedPage.slug}>
                    <span>{translatePage(relatedPage, isUrdu).title}</span><ArrowRight size={17} />
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="detail-cta-section">
          <div className="detail-cta-inner mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-6 px-5 md:flex-row md:items-center">
            <div><p className="eyebrow">{text('VISION 2040')}</p><h2>{text('Help shape a stronger agricultural future.')}</h2></div>
            <Link className="button" href="/survey-form">{text('Take the survey')}<ArrowRight size={17} /></Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
