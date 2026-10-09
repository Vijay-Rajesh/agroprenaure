'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  BriefcaseBusiness,
  Globe2,
  Leaf,
  Lightbulb,
  Sprout,
  Target,
  Users,
} from 'lucide-react';
import SiteHeader from '@/components/site-header';
import SiteFooter from '@/components/site-footer';
import { useSiteLanguage } from '@/components/language-provider';

const pillars = [
  {
    titleEn: 'Objective',
    titleUr: 'مقصد',
    descriptionEn:
      'Bring together farmers, agricultural experts, innovators and organizations to turn shared knowledge into practical opportunities.',
    descriptionUr:
      'کسانوں، زرعی ماہرین، موجدین اور تنظیموں کو ایک ساتھ لانا تاکہ مشترکہ علم کو عملی مواقع میں بدلنا۔',
    icon: Target,
  },
  {
    titleEn: 'Vision',
    titleUr: 'ویژن',
    descriptionEn:
      'To build a smarter, more innovative and sustainable future for agriculture, where collaboration drives growth, food security and global standards.',
    descriptionUr:
      'ایک ذہین، زیادہ جدید اور پائیدار زرعی مستقبل بنانا، جہاں تعاون، غذائی تحفظ، ترقی اور عالمی معیار کو فروغ ملتا ہے۔',
    icon: Lightbulb,
  },
  {
    titleEn: 'Mission',
    titleUr: 'مشن',
    descriptionEn:
      'Simplify the journey into agriculture by connecting people with the knowledge, tools, opportunities and support they need to succeed.',
    descriptionUr:
      'زراعت میں داخلے کے سفر کو آسان بنانا، لوگوں کو مطلوبہ علم، ٹولز، مواقع اور معاونت فراہم کرنا تاکہ وہ کامیاب ہو سکیں۔',
    icon: Sprout,
  },
];

const focusAreas = [
  {
    titleEn: 'Farmers and communities',
    titleUr: 'کسان اور برادری',
    descriptionEn:
      'We start by understanding the real needs, challenges and concerns of the agricultural community.',
    descriptionUr:
      'ہم زرعی برادری کی حقیقی ضروریات، چیلنجز اور خدشات کو سمجھنے سے کام شروع کرتے ہیں۔',
    icon: Users,
  },
  {
    titleEn: 'Knowledge and opportunity',
    titleUr: 'علم اور موقع',
    descriptionEn:
      'We connect people with practical knowledge, technology, products, services and opportunities that build lasting value.',
    descriptionUr:
      'ہم لوگوں کو عملی علم، ٹیکنالوجی، مصنوعات، خدمات اور ایسے مواقع سے جوڑتے ہیں جو دیرپا قیمت پیدا کریں۔',
    icon: Globe2,
  },
  {
    titleEn: 'Smart and sustainable growth',
    titleUr: 'ذہین اور پائیدار ترقی',
    descriptionEn:
      'We support innovation, entrepreneurship and responsible practices to create stronger local, national and international market access.',
    descriptionUr:
      'ہم نئی فکر، کاروباری صلاحیت اور ذمہ دارانہ طریقوں کو سہارا دیتے ہیں تاکہ مقامی، قومی اور بین الاقوامی بازاروں تک رسائی مضبوط ہو۔',
    icon: Leaf,
  },
  {
    titleEn: 'Agriculture as opportunity',
    titleUr: 'زراعت ایک موقع',
    descriptionEn:
      'We want to inspire the next generation to see agriculture as a sector of opportunity, growth and long-term sustainability.',
    descriptionUr:
      'ہم اگلی نسل کو یہ دکھانا چاہتے ہیں کہ زراعت ترقی، مواقع اور دیرپا پائیداری کا ایک اہم شعبہ ہے۔',
    icon: BriefcaseBusiness,
  },
];

export default function AboutPage() {
  const { isUrdu } = useSiteLanguage();
  const dir = isUrdu ? 'rtl' : 'ltr';

  return (
    <>
      <SiteHeader ctaHref="/survey-form" />
      <main className="min-h-screen bg-[#f5f7f1] text-slate-800" dir={dir}>
        <section className="relative overflow-hidden bg-gradient-to-br from-[#173b2a] via-[#204a34] to-[#2f6548] px-5 pb-24 pt-16 text-white sm:pb-28 sm:pt-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.12),_transparent_40%)]" />
          <div className="relative mx-auto max-w-6xl text-center">
            <p className="mb-4 text-[0.7rem] font-bold uppercase tracking-[0.28em] text-emerald-200 sm:text-xs">
              {isUrdu ? 'تعارف' : 'INTRODUCTION'}
            </p>
            <h1 className="mx-auto max-w-5xl text-[2.75rem] font-bold leading-[1.08] tracking-[-0.05em] sm:text-6xl lg:text-7xl">
              {isUrdu ? 'The Agropreneurs کے بارے میں' : 'About The Agropreneurs'}
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-base leading-7 text-emerald-50/90 sm:mt-7 sm:text-xl sm:leading-8">
              {isUrdu
                ? 'کسانوں، تعلیمی اداروں، کاروباری برادری اور تنظیموں کو جوڑ کر پاکستان میں زرعی ترقی اور پائیداری پیدا کرنا۔'
                : 'Connecting people to smart agriculture and sustainable resources to build a stronger agricultural future in Pakistan.'}
            </p>
          </div>
        </section>

        <section className="relative mx-auto -mt-12 max-w-5xl px-5 pb-2 sm:px-6 lg:px-8">
          <div className="grid gap-3 md:grid-cols-3 md:gap-4">
            {[
              { value: 'Farmers', labelEn: 'Farmers & communities', labelUr: 'کسان اور برادری', icon: Users },
              { value: 'Growth', labelEn: 'Smart growth', labelUr: 'ذہین ترقی', icon: Lightbulb },
              { value: 'Future', labelEn: 'Sustainable future', labelUr: 'پائیدار مستقبل', icon: Leaf },
            ].map(({ value, labelEn, labelUr, icon: Icon }) => (
              <article
                key={value}
                className="flex min-h-[125px] flex-col rounded-[20px] border border-[#e2e8df] bg-white p-4 shadow-[0_10px_24px_rgba(20,83,45,0.06)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_16px_30px_rgba(20,83,45,0.1)] sm:min-h-[135px] sm:p-5"
              >
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-[#e3f2e7] text-[#1f5d45]">
                  <Icon size={19} strokeWidth={2} />
                </div>
                <h2 className="max-w-[15ch] text-lg font-bold leading-tight tracking-[-0.04em] text-[#1d2d28] sm:text-xl">
                  {isUrdu ? labelUr : labelEn}
                </h2>
              </article>
            ))}
          </div>
        </section>

        <section className="px-5 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="mx-auto max-w-6xl rounded-[28px] border border-emerald-100 bg-white p-5 shadow-[0_12px_35px_rgba(20,83,45,0.05)] sm:p-8 lg:p-10">
            <div className="mb-6 flex items-center gap-3 sm:mb-7">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                <Sprout size={20} />
              </span>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-700">
                {isUrdu ? 'ہم کیا ہیں' : 'Who We Are'}
              </p>
            </div>

            <div className="max-w-4xl space-y-5 text-base leading-8 text-slate-700 sm:space-y-6 sm:text-lg">
              <p>
                {isUrdu
                  ? 'The Agropreneurs پاکستان کی زرعی معاشی زندگی کے ساتھ گہرا تعلق رکھتا ہے۔ زراعت نے ہمیشہ پاکستان کے دل کے قریب مقام رکھا ہے۔ یہ ہمارے لوگوں کو کھانا فراہم کرتی ہے، ہمارے معاشروں کو سہارا دیتی ہے اور ہماری معیشت کو مضبوط بناتی ہے۔'
                  : 'Agriculture has always been close to the heart of Pakistan. It feeds our people, supports our communities and plays an important role in our economy.'}
              </p>
              <p>
                {isUrdu
                  ? 'The Agropreneurs اس سادہ وژن کے ساتھ قائم ہوا کہ کسانوں، تعلیمی اداروں، کاروباری برادری اور تنظیموں کو اکٹھا کیا جائے تاکہ علم کا اشتراک، مواقع سے رابطہ اور زرعی صنعت کی ترقی ممکن ہو۔'
                  : 'The Agropreneurs was founded with a simple vision: to bring farmers, educational institutions, the business community and organizations together to share knowledge, connect people with opportunities and support the growth of the agro industry.'}
              </p>
              <p>
                {isUrdu
                  ? 'ہمارا فلسفہ سادہ ہے: جب زراعت کے لوگ علم، ٹولز اور مواقع حاصل کریں گے، تو زراعت آگے بڑھے گی۔ ہم ان چیلنجز کو سنتے ہیں جو زرعی برادری کے سامنے ہیں اور ان کے لیے عملی حل، خیالات اور مواقع فراہم کرنے کے لیے کام کرتے ہیں۔'
                  : 'Our philosophy is simple: agriculture moves forward when its people have the knowledge, tools and opportunities to grow. At The Agropreneurs, we listen to the challenges faced by the agricultural community and work to connect people with practical solutions, ideas and opportunities.'}
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white px-5 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="mb-9 border-b border-emerald-100 pb-6 sm:mb-10">
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-emerald-700">
                {isUrdu ? 'ہماری بنیاد' : 'Our Foundation'}
              </p>
              <h2 className="text-3xl font-bold tracking-tight text-green-900 sm:text-4xl">
                {isUrdu ? 'بنیادی ستون' : 'Core Pillars'}
              </h2>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {pillars.map(({ titleEn, titleUr, descriptionEn, descriptionUr, icon: Icon }) => (
                <article key={titleEn} className="h-full rounded-[22px] border border-emerald-100 bg-gradient-to-br from-emerald-50/80 via-white to-white p-5 shadow-[0_12px_28px_rgba(20,83,45,0.05)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_18px_34px_rgba(20,83,45,0.09)] sm:p-6">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-green-900 text-white">
                    <Icon size={18} />
                  </div>
                  <h3 className="mb-2 text-lg font-bold tracking-tight text-green-900 sm:text-xl">
                    {isUrdu ? titleUr : titleEn}
                  </h3>
                  <p className="text-sm leading-6 text-slate-700 sm:text-[0.95rem]">
                    {isUrdu ? descriptionUr : descriptionEn}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#edf7ef] px-5 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="mb-10 max-w-3xl">
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-emerald-700">
                {isUrdu ? 'ہمارا طریقہ کار' : 'Our Approach'}
              </p>
              <h2 className="text-3xl font-bold leading-tight tracking-tight text-green-900 sm:text-4xl">
                {isUrdu ? 'سچائی کو سمجھنا، پھر عملی حل فراہم کرنا' : 'Understand the real needs before creating solutions'}
              </h2>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {focusAreas.map(({ titleEn, titleUr, descriptionEn, descriptionUr, icon: Icon }, index) => (
                <article key={titleEn} className="h-full rounded-[22px] border border-emerald-100 bg-white p-5 shadow-[0_8px_24px_rgba(20,83,45,0.04)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_16px_32px_rgba(20,83,45,0.08)] sm:p-6">
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                      <Icon size={19} />
                    </div>
                    <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold tracking-[0.12em] text-emerald-700">0{index + 1}</span>
                  </div>
                  <h3 className="mb-2 text-base font-bold text-green-900 sm:text-lg">
                    {isUrdu ? titleUr : titleEn}
                  </h3>
                  <p className="text-sm leading-6 text-slate-700 sm:text-[0.95rem]">
                    {isUrdu ? descriptionUr : descriptionEn}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="mx-auto grid max-w-6xl gap-6 rounded-[28px] border border-emerald-200 bg-gradient-to-br from-white to-emerald-50 p-4 shadow-[0_12px_35px_rgba(20,83,45,0.05)] sm:gap-8 sm:p-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:p-8">
            <div className="relative overflow-hidden rounded-[26px] border border-emerald-200 bg-white p-2.5 shadow-[0_12px_30px_rgba(20,83,45,0.07)] sm:p-3">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[22px] lg:aspect-square">
                <Image
                  src="/founder.jpg"
                  alt={isUrdu ? 'محمد حیدر، بانی، دی ایگروپرینیورز' : 'Muhammad Haider, Founder of The Agropreneurs'}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 38vw"
                />
              </div>
            </div>

            <div>
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-emerald-700">
                {isUrdu ? 'بانی کا پیغام' : "FOUNDER'S MESSAGE"}
              </p>
              <h2 className="mb-4 text-3xl font-bold leading-tight tracking-tight text-green-900 sm:text-4xl">
                {isUrdu ? 'آئیے زراعت کا مستقبل مل کر بنائیں۔' : 'Let’s build agriculture’s future together.'}
              </h2>
              <p className="text-base leading-8 text-slate-700 sm:text-lg">
                {isUrdu
                  ? 'ہم نے VISION 2040: Securing the Future of Agriculture in Pakistan کے ساتھ ایک ایسا سفر شروع کیا جس کا مقصد زراعت کے بارے میں حقیقی سمت، مسائل اور امکانات کو سامنے لانا ہے۔ اس کا آغاز ایک زرعی کمیونٹی سروے سے ہوا، جس نے غذائی بحران اور تجاویز کے بارے میں لوگوں کے خیالات کو دریافت کیا۔ یہ ہمارے انداز کی عکاسی ہے: پہلے سنو، پھر مسئلہ سمجھو، اور بعد میں عملی علم، ٹیکنالوجی، مصنوعات، خدمات اور مواقع کے ذریعے بہتر حل پیدا کرو۔'
                  : 'We began with VISION 2040: Securing the Future of Agriculture in Pakistan, a journey focused on uncovering the real direction, challenges and opportunities in agriculture. It started with an Agriculture Community Survey, exploring perspectives on the food crisis and possible measures. This reflects our approach: listen first, understand the challenge, and then connect people with practical knowledge, technology, products, services and opportunities to create sustainable value.'}
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-lg font-semibold text-green-900">Muhammad Haider</p>
                  <p className="text-sm uppercase tracking-[0.15em] text-emerald-700">
                    {isUrdu ? 'بانی، The Agropreneurs' : 'Founder, The Agropreneurs'}
                  </p>
                </div>
                <Link
                  href="/founder"
                  className="inline-flex items-center gap-2 rounded-full bg-green-900 px-5 py-3 text-sm font-semibold transition-colors hover:bg-green-800"
                  style={{ color: '#fff' }}
                >
                  {isUrdu ? 'بانی کے بارے میں مزید' : 'Read more'}
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-r from-[#173b2a] via-[#204a34] to-[#2d5a3c] px-5 py-16 text-white sm:px-6 sm:py-20 lg:px-8">
          <div className="mx-auto max-w-6xl text-center">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-emerald-200">
              {isUrdu ? 'ہم کیوں اہم ہیں' : 'Why It Matters'}
            </p>
            <h2 className="mx-auto max-w-4xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
              {isUrdu ? 'زراعت کو جدید، پائیدار اور خوشحال بنانا' : 'Building agriculture that is smarter, stronger and more sustainable'}
            </h2>
            <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-emerald-50/90 sm:text-lg">
              {isUrdu
                ? 'ہمہ کو مل کر آگے بڑھنا ہے تاکہ اگلی نسل زراعت کو ایک آپشن، ایک موقع اور ایک پائیدار مستقبل کے طور پر دیکھ سکے۔'
                : 'We want to inspire the next generation to see agriculture as a sector of opportunity, growth and long-term sustainability.'}
            </p>
            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <Link href="/survey-form" className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-base font-semibold transition hover:bg-emerald-50" style={{ color: '#21432f' }}>
                {isUrdu ? 'سروے بھریں' : 'Take the Survey'}
              </Link>
              <Link href="/introduction" className="inline-flex items-center justify-center rounded-full border border-white/60 bg-transparent px-6 py-3 text-base font-semibold transition hover:bg-white/10" style={{ color: '#fff' }}>
                {isUrdu ? 'VISION 2040 دیکھیں' : 'Explore VISION 2040'}
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
