'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Expand, X } from 'lucide-react';
import { useSiteLanguage } from '@/components/language-provider';

type NewspaperImage = {
  id: string;
  title_en: string;
  title_ur: string;
  sort_order: number;
  created_at: string;
};

export default function NewspaperGallery() {
  const { isUrdu } = useSiteLanguage();
  const [images, setImages] = useState<NewspaperImage[]>([]);
  const [selectedImage, setSelectedImage] = useState<NewspaperImage | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    fetch('/api/newspapers', { cache: 'no-store', signal: controller.signal })
      .then(async (response) => {
        const result = await response.json() as { images?: NewspaperImage[]; error?: string };
        if (!response.ok) throw new Error(result.error ?? 'Newspaper images could not be loaded.');
        setImages(result.images ?? []);
      })
      .catch((loadError: unknown) => {
        if (loadError instanceof Error && loadError.name !== 'AbortError') setError(loadError.message);
      })
      .finally(() => {
        if (!controller.signal.aborted) setIsLoading(false);
      });
    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (!selectedImage) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedImage(null);
    };
    window.addEventListener('keydown', closeOnEscape);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', closeOnEscape);
      document.body.style.overflow = '';
    };
  }, [selectedImage]);

  return (
    <section className="bg-[linear-gradient(180deg,#eff6ed_0%,#f8faf6_340px,#fff_100%)] px-4 py-12 sm:px-6 sm:py-16 lg:px-8" aria-labelledby="newspaper-gallery-title">
      <div className="mx-auto max-w-6xl">
        <header className="mx-auto mb-9 max-w-3xl text-center sm:mb-12">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/80 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-emerald-800 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-emerald-600" />
            {isUrdu ? 'اخباری جھلکیاں' : 'News & Media'}
          </span>
          <h1 id="newspaper-gallery-title" className="mt-4 text-3xl font-bold tracking-tight text-green-950 sm:text-5xl">
            {isUrdu ? 'اخبارات میں ہماری جھلک' : 'Newspaper Gallery'}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
            {isUrdu
              ? 'زرعی برادری کی خبریں اور اخباری اشاعتیں دیکھیں۔ کسی بھی صفحے پر کلک کرکے اسے بڑا کھولیں۔'
              : 'A closer look at the stories and newspaper coverage featuring our agricultural community.'}
          </p>
        </header>

        {isLoading ? (
          <p className="rounded-2xl border border-emerald-100 bg-white px-5 py-10 text-center text-slate-600 shadow-sm" role="status">
            {isUrdu ? 'تصاویر لوڈ ہو رہی ہیں…' : 'Loading newspaper pages…'}
          </p>
        ) : error ? (
          <p className="rounded-2xl border border-red-200 bg-white px-5 py-8 text-center text-red-700 shadow-sm" role="alert">{error}</p>
        ) : images.length ? (
          <div className="grid items-start gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {images.map((image, index) => (
              <button
                key={image.id}
                type="button"
                onClick={() => setSelectedImage(image)}
                aria-label={`${isUrdu && image.title_ur ? image.title_ur : image.title_en} — ${isUrdu ? 'بڑا دیکھیں' : 'view larger'}`}
                className="group min-w-0 overflow-hidden rounded-[22px] border border-emerald-100 bg-white text-left shadow-[0_12px_34px_rgba(20,83,45,0.08)] transition duration-200 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-[0_20px_44px_rgba(20,83,45,0.15)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2"
              >
                <span className="relative block overflow-hidden bg-[#f4f6f1]">
                  <Image
                    src={`/api/newspapers/${image.id}/image`}
                    alt={isUrdu && image.title_ur ? image.title_ur : image.title_en}
                    width={1200}
                    height={1600}
                    unoptimized
                    preload={index === 0}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="block h-auto max-h-[72vh] w-full object-contain transition-transform duration-300 group-hover:scale-[1.01]"
                  />
                  {index === 0 && (
                    <span className="absolute left-4 top-4 rounded-full bg-green-900 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-white shadow-md sm:left-5 sm:top-5">
                      {isUrdu ? 'تازہ ترین' : 'Latest edition'}
                    </span>
                  )}
                  <span className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full border border-white/70 bg-white/95 text-green-900 shadow-md transition group-hover:scale-105">
                    <Expand size={17} aria-hidden="true" />
                  </span>
                </span>
                <span className="block px-4 py-3.5">
                  <span className="block text-sm font-semibold leading-snug text-green-950 sm:text-base">
                    {isUrdu && image.title_ur ? image.title_ur : image.title_en}
                  </span>
                  <time className="mt-2 block text-xs font-medium text-slate-500" dateTime={image.created_at}>
                    {new Date(image.created_at).toLocaleDateString(isUrdu ? 'ur-PK' : 'en-PK', { dateStyle: 'medium' })}
                  </time>
                </span>
              </button>
            ))}
          </div>
        ) : (
          <p className="rounded-2xl border border-dashed border-emerald-300 bg-white/80 px-5 py-10 text-center text-slate-600 shadow-sm">
            {isUrdu ? 'اخبارات کی تصاویر جلد یہاں شامل کی جائیں گی۔' : 'Newspaper pages will be added here soon.'}
          </p>
        )}
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#09140f]/95 p-3 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={isUrdu && selectedImage.title_ur ? selectedImage.title_ur : selectedImage.title_en}
          onClick={() => setSelectedImage(null)}
        >
          <button
            type="button"
            autoFocus
            aria-label={isUrdu ? 'بند کریں' : 'Close image'}
            onClick={() => setSelectedImage(null)}
            className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white text-green-950 shadow-lg transition hover:bg-emerald-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <X size={22} />
          </button>
          <div className="relative h-[88vh] w-full max-w-6xl" onClick={(event) => event.stopPropagation()}>
            <Image
              src={`/api/newspapers/${selectedImage.id}/image`}
              alt={isUrdu && selectedImage.title_ur ? selectedImage.title_ur : selectedImage.title_en}
              fill
              unoptimized
              sizes="100vw"
              className="object-contain"
            />
          </div>
          <p className="absolute bottom-3 left-16 right-16 text-center text-sm font-medium text-white/90 sm:bottom-5">
            {isUrdu && selectedImage.title_ur ? selectedImage.title_ur : selectedImage.title_en}
          </p>
        </div>
      )}
    </section>
  );
}
