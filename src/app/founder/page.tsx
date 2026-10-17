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
                  ? 'زراعت نے ہمیشہ پاکستان کے دل کے قریب مقام رکھا ہے۔ یہ ہمارے لوگوں کو کھانا فراہم کرتی ہے، ہمارے معاشروں کو سہارا دیتی ہے اور ہماری معیشت میں اہم کردار ادا کرتی ہے۔ The Agropreneurs اس سادہ وژن کے ساتھ قائم ہوا کہ کسان، تعلیمی ادارے، کاروباری برادری اور تنظیمیں ایک دوسرے کے ساتھ علم کا اشتراک کریں، لوگوں کو مواقع سے جوڑیں اور زرعی صنعت کی ترقی میں معاونت کریں۔'
                  : 'Agriculture has always been close to the heart of Pakistan. It feeds our people, supports our communities, and plays an important role in our economy. The Agropreneurs was founded with a simple vision: to bring farmers, educational institutions, the business community and organizations together to share knowledge, connect people with opportunities and support the growth of the agro industry.'}
              </p>

              <p className="mt-6 text-lg leading-8 text-slate-700">
                {isUrdu
                  ? 'ہمارا فلسفہ سادہ ہے: جب زراعت کے لوگ علم، ٹولز اور مواقع حاصل کریں، تو زراعت آگے بڑھے گی۔ ہم زرعی برادری کے سامنے آنے والے چیلنجز کو سن کر انہیں عملی حل، خیالات اور مواقع سے جوڑنے کے لیے کام کرتے ہیں۔ VISION 2040 – Securing the Future of Agriculture in Pakistan کے ذریعے ہم آنے والی نسل کو زراعت کو مواقع اور ترقی کا شعبہ سمجھنے کے لیے متاثر کرنا چاہتے ہیں اور ایک مضبوط، ذہین اور پائیدار زرعی مستقبل کے لیے کردار ادا کرنا چاہتے ہیں۔'
                  : 'Our philosophy is simple: agriculture moves forward when its people have the knowledge, tools, and opportunities to grow. At The Agropreneurs, we listen to the challenges faced by the agricultural community and work to connect people with practical solutions, ideas, and opportunities. Through initiatives such as VISION 2040 – Securing the Future of Agriculture in Pakistan, we want to inspire the next generation to see agriculture as a sector of opportunity and growth, and contribute to a stronger, smarter, and more sustainable future for agriculture.'}
              </p>

              <p className="mt-6 text-lg leading-8 text-slate-700">
                {isUrdu
                  ? 'The Agropreneurs ہمارے عزم کا اظہار ہے کہ ہم پائیدار اور ذہین حلوں کے ذریعے زراعت کو تبدیل کریں۔'
                  : 'The Agropreneurs is our commitment to transforming agriculture through sustainable and smart solutions.'}
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
