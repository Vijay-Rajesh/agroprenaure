'use client';

import Image from 'next/image';
import Link from 'next/link';
import SiteHeader from '@/components/site-header';
import SiteFooter from '@/components/site-footer';
import { useSiteLanguage } from '@/components/language-provider';
import { ArrowRight } from 'lucide-react';

export default function FounderMessagePage() {
  const { isUrdu } = useSiteLanguage();

  return (
    <>
      <SiteHeader ctaHref="/survey-form" />
      <main className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
        {/* <section className="px-4 py-16 sm:px-6 lg:px-8 bg-gradient-to-r from-green-900 to-green-800">
          <div className="mx-auto max-w-5xl text-center text-white">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-green-100">
              {isUrdu ? 'بانی کا پیغام' : "FOUNDER'S MESSAGE"}
            </p>
            <h1 className="text-4xl font-bold sm:text-5xl">
              {isUrdu ? 'آئیے زراعت کا مستقبل مل کر بنائیں۔' : 'Let’s build agriculture’s future together.'}
            </h1>
          </div>
        </section> */}

        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[0.9fr_1.1fr] md:items-center">
            <div className="relative overflow-hidden rounded-[30px] border border-emerald-200 bg-white p-3 shadow-[0_16px_40px_rgba(20,83,45,0.08)]">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[24px]">
                <Image
                  src="/founder.jpg"
                  alt={isUrdu ? 'محمد حیدر، بانی، دی ایگروپرینیورز' : 'Muhammad Haider, Founder of The Agropreneurs'}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 45vw"
                />
              </div>
            </div>

            <div className="rounded-[30px] border border-emerald-200 bg-white p-8 shadow-[0_16px_40px_rgba(20,83,45,0.08)] sm:p-10">
              <p className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-emerald-700">
                {isUrdu ? 'خلاصہ' : 'A note from the founder'}
              </p>

              <p className="text-lg leading-8 text-slate-700">
                {isUrdu
                  ? 'میرا یقین ہے کہ پاکستان کی زرعی برادری کا ہر فرد ایک مضبوط اور پائیدار مستقبل کی تشکیل میں اہم کردار ادا کرتا ہے۔ اسی لیے ہم نے ایک ایسا پلیٹ فارم شروع کیا ہے جہاں کسان اپنے تجربات، خیالات اور ترجیحات ایک دوسرے کے ساتھ بانٹ سکیں۔'
                  : 'I believe every member of Pakistan’s agricultural community has an important role in shaping a stronger, more sustainable future. We created this platform so farmers can share their experiences, ideas, and priorities with one another.'}
              </p>

              <p className="mt-6 text-lg leading-8 text-slate-700">
                {isUrdu
                  ? 'آپ کی آواز اس سفر کا اہم حصہ ہے۔ آئیے مل کر اپنے کسانوں کو بااختیار بنائیں اور آنے والی نسلوں کے لیے زراعت کو بہتر بنائیں۔'
                  : 'Your voice matters in this journey. Together, we can support our farmers and help create better opportunities for the generations ahead.'}
              </p>

              <div className="mt-8 border-t border-emerald-200 pt-6">
                <p className="text-2xl font-bold text-green-900">Muhammad Haider</p>
                <p className="mt-1 text-sm uppercase tracking-[0.16em] text-emerald-700">
                  {isUrdu ? 'بانی، دی ایگروپرینیورز' : 'Founder, The Agropreneurs'}
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/survey-form"
                  className="inline-flex items-center gap-2 rounded-full bg-green-900 px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-green-800"
                >
                  {isUrdu ? 'سروے شروع کریں' : 'Start the Survey'}
                  <ArrowRight size={16} />
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center justify-center rounded-full border border-emerald-200 bg-white px-6 py-3 text-base font-semibold text-green-900 transition-colors hover:bg-emerald-50"
                >
                  {isUrdu ? 'کے بارے میں' : 'About us'}
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
