'use client';

import Link from 'next/link';
import { ArrowUpRight, MessageCircle, Phone } from 'lucide-react';
import { useSiteLanguage } from '@/components/language-provider';
import { translateSiteText } from '@/lib/site-translations';
import { Mail } from 'lucide-react';

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

export default function SiteFooter() {
  const { isUrdu } = useSiteLanguage();
  const text = (value: string) => translateSiteText(value, isUrdu);

  const socialLinks = [
    { href: 'https://wa.me/923002008999', label: 'WhatsApp', className: 'whatsapp', Icon: MessageCircle },
    { href: 'https://youtube.com/@theagropreneurs?si=WCYIDo3zaPmM0ncJ', label: 'YouTube', className: 'youtube', Icon: YoutubeIcon },
    { href: 'https://www.facebook.com/share/19bs6skfLZ/', label: 'Facebook', className: 'facebook', Icon: FacebookIcon },
    { href: 'https://www.instagram.com/invites/contact/?utm_source=ig_contact_invite&utm_medium=copy_link&utm_content=7ru3e8v', label: 'Instagram', className: 'instagram', Icon: InstagramIcon },
  ];

  return (
    <footer className="site-footer">
      <div className="footer-inner mx-auto grid w-full max-w-6xl gap-10 px-5 md:grid-cols-[1.1fr_0.9fr]">
        <div className="footer-brand">
          <Link className="brand brand-light" href="/">
            <span className="brand-mark"><img src="/logo1.png" alt="The Agropreneurs logo" width={80} height={80} /></span>
            <span className="brand-copy"><strong>The Agropreneurs</strong><small>{text('SUSTAINABLE | SMART | AGRICULTURE')}</small></span>
          </Link>
          <p>{text('Building a smart, sustainable and food-secure future for Pakistan through community, knowledge and action.')}</p>
        </div>
        <div className="footer-contact">
          <a href="tel:+923002008999"><Phone size={16} />+92 300 2008999</a>
          <a href="mailto:Info@theagropreneurs.com">
  <Mail size={16} />
  Info@theagropreneurs.com
</a>
          <a href="https://www.theagropreneurs.com" target="_blank" rel="noreferrer"><ArrowUpRight size={16} />www.theagropreneurs.com</a>
          <div className="footer-socials" aria-label="Social media links">
            {socialLinks.map(({ href, label, className, Icon }) => (
              <a key={label} className={className} href={href} target="_blank" rel="noreferrer" aria-label={label} title={label}>
                <Icon size={16} aria-hidden="true" />
              </a>
            ))}
          </div>
          <p>{text('Muhammad Haider, Founder, The Agropreneurs')}</p>
        </div>
      </div>
      <div className="footer-bottom mx-auto flex w-full max-w-6xl items-center px-5">
        <span>{text('© 2026 The Agropreneurs. VISION 2040 Agriculture Community Survey.')}</span>
      </div>
    </footer>
  );
}
