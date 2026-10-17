'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronDown, Menu, MessageCircle, X } from 'lucide-react';
import { navigationSections } from '@/lib/site-content';
import { useSiteData } from '@/components/site-data-provider';
import { useSiteLanguage } from '@/components/language-provider';
import { translateSiteText } from '@/lib/site-translations';

function FacebookIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M13.5 21v-8.2h2.7l.4-3h-3.1V7.2c0-.9.3-1.5 1.6-1.5h1.7V2.8c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.4H7.5v3h2.6V21h3.4Z" />
    </svg>
  );
}

function YoutubeIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M21.5 8.1a3 3 0 0 0-2.1-2.1C17.9 5.5 12 5.5 12 5.5s-5.9 0-7.4.5A3 3 0 0 0 2.5 8.1 31 31 0 0 0 2 12a31 31 0 0 0 .5 3.9 3 3 0 0 0 2.1 2.1c1.5.5 7.4.5 7.4.5s5.9 0 7.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 22 12a31 31 0 0 0-.5-3.9ZM10 15.5v-7l6 3.5-6 3.5Z" />
    </svg>
  );
}

function InstagramIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true" {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  );
}

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
  const introductionLink = fallbackAbout?.items.find((item) => item.href === '/introduction');
  const founderLink = fallbackAbout?.items.find((item) => item.href === '/founder');
  const aboutSectionIndex = siteSections.findIndex((section) =>
    section.key === 'about-us' || section.labelEn.trim().toLowerCase() === 'about us',
  );
  const visibleSections = [...siteSections].map((section) => ({
    ...section,
    items: section.items.filter((item) => {
      const label = item.labelEn.trim().toLowerCase();
      return item.href !== '/survey-form' &&
        !/survey/i.test(item.labelEn) &&
        !/about\s+vision\s*2040/i.test(label) &&
        item.href !== '/vision';
    }),
  }));

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

  const homeLink: CmsHomeLink | null = site ? site.homeLink : { labelEn: 'HOME', labelUr: 'صفحہ اول', href: '/' };
  const headerSocialLinks = [
    { href: 'https://wa.me/923002008999', label: 'WhatsApp', className: 'whatsapp', Icon: MessageCircle },
    { href: 'https://youtube.com/@theagropreneurs?si=WCYIDo3zaPmM0ncJ', label: 'YouTube', className: 'youtube', Icon: YoutubeIcon },
    { href: 'https://www.facebook.com/share/19bs6skfLZ/', label: 'Facebook', className: 'facebook', Icon: FacebookIcon },
    { href: 'https://www.instagram.com/invites/contact/?utm_source=ig_contact_invite&utm_medium=copy_link&utm_content=7ru3e8v', label: 'Instagram', className: 'instagram', Icon: InstagramIcon },
  ];

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
          <span className="brand-mark"><Image src="/logo1.png" alt="" width={98} height={38} /></span>
          <span className="brand-copy"><strong>The Agropreneurs</strong><small>{text('SUSTAINABLE | SMART | AGRICULTURE')}</small></span>
        </Link>
        <nav
          className={`primary-navigation ${isMobileNavigationOpen ? 'mobile-open' : ''}`}
          id="primary-navigation"
          aria-label={text('Main navigation')}
          onKeyDown={handleNavigationKeyDown}
        >
          {homeLink && <Link className="nav-home" href={homeLink.href} onClick={closeNavigation}>{isUrdu ? homeLink.labelUr : homeLink.labelEn}</Link>}
          {visibleSections.filter((section) => section.key !== 'home' && section.labelEn.trim().toLowerCase() !== 'home').map((section) => {
            const isAboutSection = section.key === 'about-us' || section.labelEn.trim().toLowerCase() === 'about us';
            const isVisionSection = section.key === 'vision-2040' || section.labelEn.trim().toLowerCase() === 'vision 2040';
            if (isAboutSection) {
              return <Link className="nav-home uppercase" href="/about" key={section.key} onClick={closeNavigation}>{text('About Us')}</Link>;
            }
            if (isVisionSection) {
              return <Link className="nav-home uppercase" href="/vision" key={section.key} onClick={closeNavigation}>{isUrdu ? section.labelUr : section.labelEn}</Link>;
            }

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
          <div className="mobile-navigation-socials" aria-label="Social media links">
            {headerSocialLinks.map(({ href, label, className, Icon }) => (
              <a key={label} className={`header-social-link ${className}`} href={href} target="_blank" rel="noreferrer" aria-label={label} title={label}>
                <Icon size={16} aria-hidden="true" />
              </a>
            ))}
          </div>
        </nav>
        <nav className="header-actions" aria-label={text('Contact and actions')}>
          <div className="language-switcher" role="group" aria-label={text('Choose language')}>
            <button type="button" lang="en" aria-pressed={!isUrdu} onClick={() => setLanguage('en')}>EN</button>
            <button type="button" lang="ur" aria-pressed={isUrdu} onClick={() => setLanguage('ur')}>اردو</button>
          </div>
          <div className="header-socials" aria-label="Social media links">
            {headerSocialLinks.map(({ href, label, className, Icon }) => (
              <a key={label} className={`header-social-link ${className}`} href={href} target="_blank" rel="noreferrer" aria-label={label} title={label}>
                <Icon size={14} aria-hidden="true" />
              </a>
            ))}
          </div>
          {/* <Link className="button button-small" href={ctaHref ?? '/survey-form'} onClick={closeNavigation}>{text('Take the Survey')}</Link>
          <button
            className="mobile-navigation-toggle"
            type="button"
            aria-label={text(isMobileNavigationOpen ? 'Close navigation' : 'Open navigation')}
            aria-expanded={isMobileNavigationOpen}
            aria-controls="primary-navigation"
            onClick={() => { setIsMobileNavigationOpen((current) => !current); setOpenNavigation(null); }}
          >
            {isMobileNavigationOpen ? <X size={20} /> : <Menu size={20} />}
          </button> */}
        </nav>
      </div>
    </header>
  );
}
