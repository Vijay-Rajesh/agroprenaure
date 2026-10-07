'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronDown, Menu, X } from 'lucide-react';
import { navigationSections } from '@/lib/site-content';
import { useSiteData } from '@/components/site-data-provider';
import { useSiteLanguage } from '@/components/language-provider';
import { translateSiteText } from '@/lib/site-translations';

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
  const siteSections = site?.navigation ?? fallbackSections;
  const fallbackAbout = fallbackSections.find((section) => section.key === 'about-us');
  const fallbackVision = fallbackSections.find((section) => section.key === 'vision-2040');
  const introductionLink = fallbackAbout?.items.find((item) => item.href === '/introduction');
  const founderLink = fallbackAbout?.items.find((item) => item.href === '/founder');
  const visionIntroductionLink = fallbackVision
    ? { labelEn: 'About VISION 2040', labelUr: translateSiteText('About VISION 2040', true), href: '/introduction' }
    : undefined;
  const surveyLink = fallbackVision?.items.find((item) => item.href === '/survey-form');
  const aboutSectionIndex = siteSections.findIndex((section) =>
    section.key === 'about-us' || section.labelEn.trim().toLowerCase() === 'about us',
  );
  const visibleSections = [...siteSections];

  if (founderLink || introductionLink) {
    if (aboutSectionIndex === -1) {
      visibleSections.push({
        ...fallbackAbout!,
        items: [introductionLink, founderLink].filter((item): item is NonNullable<typeof item> => Boolean(item)),
      });
    } else {
      const aboutSection = visibleSections[aboutSectionIndex];
      const existingIntroductionLink = aboutSection.items.find((item) => item.href === introductionLink?.href);
      const existingFounderLink = aboutSection.items.find((item) => item.href === founderLink?.href);
      const otherItems = aboutSection.items.filter((item) => {
        const label = item.labelEn.trim().toLowerCase();
        return item.href !== introductionLink?.href &&
          item.href !== founderLink?.href &&
          item.href !== '/#founder' &&
          item.href !== '/#about' &&
          !/founder.?s message/i.test(label) &&
          label !== 'introduction';
      });
      visibleSections[aboutSectionIndex] = {
        ...aboutSection,
        items: [
          ...otherItems,
          existingIntroductionLink ?? introductionLink,
          existingFounderLink ?? founderLink,
        ].filter((item): item is NonNullable<typeof item> => Boolean(item)),
      };
    }
  }

  const visionSectionIndex = visibleSections.findIndex((section) =>
    section.key === 'vision-2040' || section.labelEn.trim().toLowerCase() === 'vision 2040',
  );
  if (surveyLink) {
    if (visionSectionIndex === -1) {
      visibleSections.push({
        ...fallbackVision!,
        items: [visionIntroductionLink, surveyLink].filter((item): item is NonNullable<typeof item> => Boolean(item)),
      });
    } else {
      const visionSection = visibleSections[visionSectionIndex];
      const existingSurveyLink = visionSection.items.find((item) => item.href === surveyLink.href);
      const existingIntroductionLink = visionSection.items.find((item) =>
        item.href === visionIntroductionLink?.href ||
        /about\s+vision\s*2040/i.test(item.labelEn),
      );
      const otherItems = visionSection.items.filter((item) =>
        item.href !== surveyLink.href &&
        item.href !== visionIntroductionLink?.href &&
        !/about\s+vision\s*2040/i.test(item.labelEn) &&
        !/survey/i.test(item.labelEn),
      );
      visibleSections[visionSectionIndex] = {
        ...visionSection,
        items: [
          ...otherItems,
          existingIntroductionLink
            ? { ...existingIntroductionLink, href: visionIntroductionLink?.href ?? '/introduction' }
            : visionIntroductionLink,
          existingSurveyLink ?? surveyLink,
        ].filter((item): item is NonNullable<typeof item> => Boolean(item)),
      };
    }
  }

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
          <span className="brand-mark"><Image src="/logo.png" alt="" width={38} height={38} /></span>
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
          <Link className="button button-small" href={ctaHref ?? '/survey-form'} onClick={closeNavigation}>{text('Take the Survey')}</Link>
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
