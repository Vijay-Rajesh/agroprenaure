'use client';

import Link from 'next/link';
import SiteHeader from '@/components/site-header';
import SiteFooter from '@/components/site-footer';
import { useSiteLanguage } from '@/components/language-provider';
import {
  ArrowRight,
  ChartNoAxesCombined,
  Clock3,
  Cpu,
  ShieldCheck,
  Sprout,
  Store,
  UsersRound,
} from 'lucide-react';

const surveyOutcomes = [
  { label: 'Productivity', icon: Sprout },
  { label: 'Efficiency', icon: ChartNoAxesCombined },
  { label: 'Sustainability', icon: LeafIcon },
  { label: 'Farm profitability', icon: Store },
  { label: 'Access to knowledge and technology', icon: Cpu },
  { label: 'Opportunities for generations to come', icon: UsersRound },
];

const initiativeSupport = [
  'Farmer development',
  'Stakeholder engagement',
  'Awareness and information sharing',
  'Capacity building',
  'Technology adoption',
  'Commercial opportunities',
  'Networking and collaboration',
  'Resource sharing',
  'Understanding agricultural challenges',
  'Identifying new opportunities',
  'Data-driven insights',
  'Stronger farmer networks',
  'Access to wider and international markets',
  'Monitoring and evaluation',
];

function LeafIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <path d="M19 3c-6.5 0-11 3.5-13 11 2 0 4-.4 6-1.3 2.8-1.3 4.9-3.8 7-7.7Z" />
      <path d="M9 12c.8 1.5 2.4 3 4.5 4.1" />
      <path d="M5 19c2.5-1.7 4.8-4.1 6.5-7.1" />
    </svg>
  );
}

export default function HomePage() {
  const { isUrdu } = useSiteLanguage();

  return (
    <>
      <SiteHeader ctaHref="/survey-form" />
      <main className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
        <section className="hero-section home-hero-section relative isolate overflow-hidden">
          <div
            className="hero-photo"
            role="img"
            aria-label="Agricultural fields in Pakistan"
            style={{ backgroundImage: "url('/herosection.jpeg')" }}
          />
        </section>

        <section className="px-4 py-6 sm:px-6 lg:px-8 bg-white">
          <div className="mx-auto max-w-5xl rounded-[28px] border border-emerald-100 bg-emerald-50/60 px-6 py-6 text-center shadow-[0_10px_30px_rgba(22,101,52,0.06)] sm:px-10">
            <p className="text-base leading-8 text-slate-700 sm:text-lg">
              We truly secure tomorrow when everyone finds a way to contribute by protecting natural resources,
              supporting the agricultural community, and creating access to resources for generations to come.
            </p>
            <p className="mt-3 text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700 sm:text-base">
              — Muhammad Haider
            </p>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-emerald-50/60 to-white">
          <div className="mx-auto max-w-6xl">
            <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-emerald-700">
                  {isUrdu ? 'یہ سروے کے بارے میں' : 'About This Survey'}
                </p>
                <h2 className="text-3xl font-bold leading-tight text-green-900 sm:text-4xl">
                  {isUrdu ? 'سروے کا تعارف' : 'About This Survey'}
                </h2>
              </div>
              <div className="inline-flex items-center gap-2 self-start rounded-full border border-emerald-200 bg-white px-4 py-2 text-sm font-medium text-emerald-800 shadow-sm">
                <Clock3 size={16} className="text-emerald-600" />
                {isUrdu ? 'تخمینہ: 15 منٹ' : 'Estimated time: 15 minutes'}
              </div>
            </div>

            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="space-y-6 rounded-[30px] border border-emerald-100 bg-white p-6 shadow-[0_12px_35px_rgba(20,83,45,0.08)] sm:p-8">
                <p className="text-lg leading-8 text-slate-700">
                  {isUrdu
                    ? 'یہ سروے VISION 2040: Securing the Future of Agriculture in Pakistan کا حصہ ہے۔'
                    : 'This survey is part of VISION 2040: Securing the Future of Agriculture in Pakistan.'}
                </p>
                <p className="text-lg leading-8 text-slate-700">
                  {isUrdu
                    ? 'اس کا مقصد کسانوں کے تجربات، نقطہ نظر، توقعات اور خیالات کو سمجھنا ہے تاکہ پاکستان میں زراعت اور غذائی تحفظ کا مستقبل 2040 اور اس کے بعد کیسے بنتا ہے، اس کے بارے میں بہتر معلومات حاصل کی جا سکیں۔'
                    : 'Its purpose is to understand farmers\' experiences, perspectives, expectations and ideas regarding the future of agriculture and food security in Pakistan through 2040 and beyond.'}
                </p>
                <p className="text-lg leading-8 text-slate-700">
                  {isUrdu
                    ? 'ہم پاکستان کے تمام صوبوں اور علاقوں سے کسانوں کو شامل کرنے کا مقصد رکھتے ہیں تاکہ وہ اپنی عملی زندگی کے تجربات اور محسوس کیے گئے مسائل ہمارے ساتھ بانٹیں۔'
                    : 'We aim to engage farmers from all provinces and regions of Pakistan and learn directly from their experiences.'}
                </p>
                <p className="text-lg leading-8 text-slate-700">
                  {isUrdu
                    ? 'جمع کیے گئے انبیشتات سے تحقیقی منصوبہ بندی، منصوبہ سازی اور جدید زرعی ٹیکنالوجیز، جدید طریقوں اور سمارٹ فارمنگ حل فراہم کرنے کے مواقع تلاش کیے جائیں گے۔'
                    : 'The insights gathered will support research, planning and the exploration of opportunities to introduce modern agricultural technologies, innovative practices and smart farming solutions that can improve:'}
                </p>
              </div>

              <div className="rounded-[30px] border border-emerald-200 bg-gradient-to-br from-emerald-50 via-white to-lime-50 p-6 shadow-[0_12px_35px_rgba(20,83,45,0.05)] sm:p-8">
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                    <Sprout size={20} />
                  </div>
                  <h3 className="text-xl font-bold text-green-900">
                    {isUrdu ? 'نتائج' : 'Key Benefits'}
                  </h3>
                </div>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                  {surveyOutcomes.map(({ label, icon: Icon }) => (
                    <div
                      key={label}
                      className="flex items-center gap-3 rounded-2xl border border-emerald-100 bg-white/80 px-4 py-3 text-sm font-medium text-slate-700 shadow-sm"
                    >
                      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                        <Icon size={17} />
                      </span>
                      <span>{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-12 rounded-[30px] border border-emerald-100 bg-white p-6 shadow-[0_12px_35px_rgba(15,118,110,0.06)] sm:p-8">
              <h3 className="mb-6 text-2xl font-bold text-green-900">
                {isUrdu ? 'یہ اقدام کیا سہارا دے سکتا ہے؟' : 'What Can This Initiative Support?'}
              </h3>

              <div className="grid gap-3 md:grid-cols-2">
                {initiativeSupport.map((item, index) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-2xl border border-emerald-100 bg-emerald-50/60 px-4 py-3"
                  >
                    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-green-900 text-xs font-bold text-white">
                      {index + 1}
                    </span>
                    <span className="text-base leading-7 text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-12 rounded-[30px] border border-emerald-200 bg-gradient-to-br from-emerald-50 via-white to-lime-50 p-6 shadow-[0_12px_35px_rgba(20,83,45,0.08)] sm:p-8">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                  <ShieldCheck size={20} />
                </div>
                <h3 className="text-2xl font-bold text-green-900">
                  {isUrdu ? 'آپ کی شرکت اہم ہے' : 'Your Participation Matters'}
                </h3>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl border border-emerald-100 bg-white p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
                    {isUrdu ? 'سیکیورٹی' : 'Privacy'}
                  </p>
                  <p className="mt-2 text-base leading-7 text-slate-700">
                    {isUrdu
                      ? 'آپ کے جوابات خفیہ رکھے جائیں گے۔'
                      : 'Your responses will be kept confidential.'}
                  </p>
                </div>
                <div className="rounded-2xl border border-emerald-100 bg-white p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
                    {isUrdu ? 'وقت' : 'Time'}
                  </p>
                  <p className="mt-2 text-base leading-7 text-slate-700">
                    <strong>{isUrdu ? 'تخمینے کا وقت:' : 'Estimated completion time:'}</strong> 15 minutes.
                  </p>
                </div>
                <div className="rounded-2xl border border-emerald-100 bg-white p-4 md:col-span-1">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
                    {isUrdu ? 'شراکت' : 'Impact'}
                  </p>
                  <p className="mt-2 text-base leading-7 text-slate-700">
                    {isUrdu
                      ? 'آپ کا قیمتی تجربہ مستقبل کی حکمت عملی میں معاون ثابت ہوگا۔'
                      : 'Your experience can help shape a stronger agricultural future for Pakistan.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-6 sm:px-6 lg:px-8 bg-white">
          <div className="mx-auto max-w-5xl rounded-[28px] border border-emerald-100 bg-gradient-to-r from-emerald-50 via-white to-lime-50 px-6 py-6 text-center shadow-[0_10px_30px_rgba(22,101,52,0.05)] sm:px-10">
            <p className="text-base leading-8 text-slate-700 sm:text-lg" dir="rtl">
              ہم حقیقی معنوں میں کل کو محفوظ بنانے پر یقین رکھتے ہیں، جہاں ہر فرد قدرتی وسائل کے تحفظ، زرعی برادری کی معاونت، اور
              آنے والی نسلوں کے لیے وسائل تک رسائی پیدا کرنے میں اپنا کردار ادا کرے۔
            </p>
            <p className="mt-3 text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700 sm:text-base" dir="rtl">
              — محمد حیدر
            </p>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-4 py-20 sm:px-6 lg:px-8 bg-gradient-to-r from-green-900 to-green-800">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              {isUrdu ? 'سروے میں حصہ لیں' : 'Participate in the Survey'}
            </h2>
            <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
              {isUrdu
                ? 'اپنی آواز سنائیں اور پاکستان میں زراعت کے مستقبل کو بہتر بنانے میں مدد کریں۔'
                : 'Make your voice heard and help improve the future of agriculture in Pakistan.'}
            </p>
            <Link
              href="/survey-form"
              className="inline-flex items-center justify-center bg-white text-green-900 px-8 py-4 rounded-lg font-semibold hover:bg-green-50 transition-colors text-lg gap-2"
            >
              {isUrdu ? 'سروے شروع کریں' : 'Start Survey'}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
