'use client';

import Link from 'next/link';
import { ArrowUpRight, Phone, Sprout } from 'lucide-react';
import { useSiteLanguage } from '@/components/language-provider';
import { translateSiteText } from '@/lib/site-translations';

export default function SiteFooter() {
  const { isUrdu } = useSiteLanguage();
  const text = (value: string) => translateSiteText(value, isUrdu);

  return (
    <footer className="site-footer">
      <div className="footer-inner mx-auto grid w-full max-w-6xl gap-10 px-5 md:grid-cols-[1.1fr_0.9fr]">
        <div className="footer-brand">
          <Link className="brand brand-light" href="/">
            <span className="brand-mark"><Sprout size={23} /></span>
            <strong>The Agropreneurs</strong>
          </Link>
          <p>{text('Building a smart, sustainable and food-secure future for Pakistan through community, knowledge and action.')}</p>
        </div>
        <div className="footer-contact">
          <a href="tel:03002008999"><Phone size={16} />0300-2008999</a>
          <a href="https://www.theagropreneurs.com" target="_blank" rel="noreferrer"><ArrowUpRight size={16} />www.theagropreneurs.com</a>
          <p>{text('Muhammad Haider, Founder, The Agropreneurs')}</p>
        </div>
      </div>
      <div className="footer-bottom mx-auto flex w-full max-w-6xl items-center px-5">
        <span>{text('© 2026 The Agropreneurs. VISION 2040 Agriculture Community Survey.')}</span>
      </div>
    </footer>
  );
}
