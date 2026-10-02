'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, Menu, Sprout, X } from 'lucide-react';
import { navigationSections } from '@/lib/site-content';
import { useSiteData } from '@/components/site-data-provider';
import { useSiteLanguage } from '@/components/language-provider';
import { translateSiteText } from '@/lib/site-translations';

type CmsNavigationSection = {
  key: string;
  labelEn: string;
  labelUr: string;
  items: { labelEn: string; labelUr: string; href: string }[];
};

type CmsHomeLink = { labelEn: string; labelUr: string; href: string };

type SiteHeaderProps = {
  ctaHref?: string;
};

export default function SiteHeader({ ctaHref }: SiteHeaderProps) {
  const [openNavigation, setOpenNavigation] = useState<string | null>(null);
  const [isMobileNavigationOpen, setIsMobileNavigationOpen] = useState(false);
  const site = useSiteData();
  const { isUrdu, setLanguage } = useSiteLanguage();
  const text = (value: string) => translateSiteText(value, isUrdu);
  const fallbackSections = navigationSections.map((section) => ({
    key: section.label.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    labelEn: section.label,
    labelUr: translateSiteText(section.label, true),
    items: section.items.flatMap((item) => item.href ? [{
      labelEn: item.label,
      labelUr: translateSiteText(item.label, true),
      href: item.href,
    }] : []),
  }));
  const visibleSections: CmsNavigationSection[] = site?.navigation ?? fallbackSections;
  const homeLink: CmsHomeLink | null = site ? site.homeLink : { labelEn: 'HOME', labelUr: 'صفحہ اول', href: '/' };

  function closeNavigation() {
    setOpenNavigation(null);
    setIsMobileNavigationOpen(false);
  }

  function handleNavigationKeyDown(event: React.KeyboardEvent<HTMLElement>) {
    if (event.key === 'Escape') closeNavigation();
  }

  return (
    <header className="site-header sticky top-0 z-50">
      <div className="header-inner mx-auto flex w-full max-w-6xl items-center justify-between px-5">
        <Link className="brand" href="/" aria-label={text('The Agropreneurs home')} onClick={closeNavigation}>
          <span className="brand-mark"><Sprout size={23} strokeWidth={1.8} /></span>
          <span className="brand-copy"><strong>The Agropreneurs</strong><small>{text('SMART | SUSTAINABLE | AGRICULTURE')}</small></span>
        </Link>
        <nav
          className={`primary-navigation ${isMobileNavigationOpen ? 'mobile-open' : ''}`}
          id="primary-navigation"
          aria-label={text('Main navigation')}
          onKeyDown={handleNavigationKeyDown}
        >
          {homeLink && <Link className="nav-home" href={homeLink.href} onClick={closeNavigation}>{isUrdu ? homeLink.labelUr : homeLink.labelEn}</Link>}
          {visibleSections.map((section) => {
            const sectionId = `navigation-${section.key}`;
            const isExpanded = openNavigation === section.key;
            return (
              <div className={`nav-accordion ${isExpanded ? 'is-open' : ''}`} key={section.key}>
                <button
                  className="nav-accordion-trigger"
                  type="button"
                  aria-expanded={isExpanded}
                  aria-controls={sectionId}
                  onClick={() => setOpenNavigation((current) => current === section.key ? null : section.key)}
                >
                  {isUrdu ? section.labelUr : section.labelEn}<ChevronDown size={13} aria-hidden="true" />
                </button>
                <div className="nav-accordion-panel" id={sectionId} hidden={!isExpanded}>
                  {section.items.map((item) => (
                    <Link className="nav-subitem" href={item.href} key={`${item.href}-${item.labelEn}`} onClick={closeNavigation}>{isUrdu ? item.labelUr : item.labelEn}</Link>
                  ))}
                </div>
              </div>
            );
          })}
        </nav>
        <nav className="header-actions" aria-label={text('Contact and actions')}>
          <div className="language-switcher" role="group" aria-label={text('Choose language')}>
            <button type="button" lang="en" aria-pressed={!isUrdu} onClick={() => setLanguage('en')}>EN</button>
            <button type="button" lang="ur" aria-pressed={isUrdu} onClick={() => setLanguage('ur')}>اردو</button>
          </div>
          {ctaHref ? (
            <Link className="button button-small" href={ctaHref} onClick={closeNavigation}>{text('Take the Survey')}</Link>
          ) : (
            <button className="button button-small" onClick={() => { closeNavigation(); document.getElementById('survey')?.scrollIntoView({ behavior: 'smooth' }); }}>{text('Take the Survey')}</button>
          )}
          <button
            className="mobile-navigation-toggle"
            type="button"
            aria-label={text(isMobileNavigationOpen ? 'Close navigation' : 'Open navigation')}
            aria-expanded={isMobileNavigationOpen}
            aria-controls="primary-navigation"
            onClick={() => { setIsMobileNavigationOpen((current) => !current); setOpenNavigation(null); }}
          >
            {isMobileNavigationOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>
      </div>
    </header>
  );
}
