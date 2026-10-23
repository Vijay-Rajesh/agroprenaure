import type { Metadata } from 'next';
import SiteFooter from '@/components/site-footer';
import SiteHeader from '@/components/site-header';
import NewspaperGallery from '@/components/newspaper-gallery';

export const metadata: Metadata = {
  title: 'Newspaper Gallery | The Agropreneurs',
  description: 'Browse newspaper coverage featuring agriculture and rural communities across Pakistan.',
};

export default function NewspaperGalleryPage() {
  return (
    <>
      <SiteHeader ctaHref="/survey-form" />
      <main className="min-h-screen bg-[#f5f7f1]">
        <NewspaperGallery />
      </main>
      <SiteFooter />
    </>
  );
}