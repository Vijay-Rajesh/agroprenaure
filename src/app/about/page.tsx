'use client';

import Image from 'next/image';
import { Mail } from 'lucide-react';
import SiteHeader from '@/components/site-header';
import SiteFooter from '@/components/site-footer';
import { useSiteLanguage } from '@/components/language-provider';

const missionPoints = [
  {
    en: 'Make agriculture easier and more productive by providing simple, practical and affordable solutions for everyday needs.',
    ur: 'روزمرہ ضروریات کے لیے آسان، عملی اور سستے حل فراہم کرکے زراعت کو آسان اور زیادہ پیداواری بنانا۔',
  },
  {
    en: 'Help new people enter the sector with confidence by providing useful knowledge, guidance, training and business opportunities.',
    ur: 'مفید علم، رہنمائی، تربیت اور کاروباری مواقع فراہم کرکے نئے لوگوں کو اعتماد کے ساتھ اس شعبے میں آنے میں مدد دینا۔',
  },
  {
    en: 'Connect people with the right technology, products and services to improve efficiency, productivity and the way agriculture is done.',
    ur: 'کارکردگی، پیداواریت اور زرعی طریقوں کو بہتر بنانے کے لیے لوگوں کو موزوں ٹیکنالوجی، مصنوعات اور خدمات سے جوڑنا۔',
  },
  {
    en: 'Encourage new ideas and agribusinesses by supporting innovation, entrepreneurship and opportunities across the agricultural value chain.',
    ur: 'جدت، کاروباری صلاحیت اور زرعی ویلیو چین میں مواقع کی حمایت کرکے نئے خیالات اور زرعی کاروباروں کی حوصلہ افزائی کرنا۔',
  },
  {
    en: 'Build a stronger and sustainable future by promoting responsible practices, collaboration and access to local, national and international markets.',
    ur: 'ذمہ دارانہ طریقوں، تعاون اور مقامی، قومی و بین الاقوامی منڈیوں تک رسائی کو فروغ دے کر ایک مضبوط اور پائیدار مستقبل بنانا۔',
  },
];

export default function AboutPage() {
  const { isUrdu } = useSiteLanguage();
  const dir = isUrdu ? 'rtl' : 'ltr';

  return (
    <>
      <SiteHeader ctaHref="/survey-form" />
      <main className="min-h-screen bg-[#f5f7f1] text-slate-800" dir={dir}>
        <section className="px-5 py-10 sm:px-6 sm:py-12 lg:px-8">
          <div className="mx-auto grid max-w-6xl gap-6 rounded-[28px] border border-emerald-200 bg-gradient-to-br from-white to-emerald-50 p-4 shadow-[0_12px_35px_rgba(20,83,45,0.05)] sm:gap-8 sm:p-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-start lg:gap-10 lg:p-8">
            <div>
              <div className="relative overflow-hidden rounded-[26px] border border-emerald-200 bg-white p-2.5 shadow-[0_12px_30px_rgba(20,83,45,0.07)] sm:p-3">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[22px]">
                  <Image
                    src="/founder.jpg"
                    alt={isUrdu ? 'محمد حیدر، بانی، دی ایگروپرینیورز' : 'Muhammad Haider, Founder of The Agropreneurs'}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 38vw"
                  />
                </div>
              </div>
              <div className="px-2 pt-5 text-center sm:pt-6">
                <p className="text-lg font-semibold text-green-900">Muhammad Haider</p>
                <p className="text-sm uppercase tracking-[0.15em] text-emerald-700">
                  {isUrdu ? 'بانی، The Agropreneurs' : 'Founder, The Agropreneurs'}
                </p>
                <a
                  href="mailto:Founder@theagropreneurs.com"
                  className="mt-2 inline-flex items-center justify-center gap-2 text-sm font-medium text-green-800 underline decoration-emerald-300 underline-offset-4 transition hover:text-green-950"
                >
                  <Mail size={16} aria-hidden="true" />
                  Founder@theagropreneurs.com
                </a>
              </div>
            </div>

            <div>
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-emerald-700">
                {isUrdu ? 'بانی کا پیغام' : "FOUNDER'S MESSAGE"}
              </p>
              <h1 className="mb-4 text-3xl font-bold leading-tight tracking-tight text-green-900 sm:text-4xl">
                {isUrdu ? 'آئیے زراعت کا مستقبل مل کر بنائیں۔' : 'Connecting People to Smart Agriculture & Sustainable Resources.'}
              </h1>
              <div className="max-w-2xl space-y-4 text-base leading-7 text-slate-700 sm:space-y-5 sm:leading-7 lg:text-[1.05rem] lg:leading-8">
                <p>
                  {isUrdu
                    ? 'زراعت نے ہمیشہ پاکستان کے دل کے قریب مقام رکھا ہے۔ یہ ہمارے لوگوں کو خوراک فراہم کرتی ہے، ہماری برادریوں کو سہارا دیتی ہے اور ہماری معیشت میں اہم کردار ادا کرتی ہے۔ The Agropreneurs ایک سادہ وژن کے تحت قائم ہوا: کسانوں، تعلیمی اداروں، کاروباری برادری اور تنظیموں کو اکٹھا کرنا تاکہ علم کا اشتراک ہو، لوگوں کو مواقع سے جوڑا جائے اور زرعی صنعت کی ترقی میں مدد ملے۔'
                    : 'Agriculture has always been close to the heart of Pakistan. It feeds our people, supports our communities, and plays an important role in our economy. The Agropreneurs was founded with a simple vision: to bring farmers, educational institutions, the business community and organizations together to share knowledge, connect people with opportunities and support the growth of the agro industry.'}
                </p>
                <p>
                  {isUrdu
                    ? 'ہمارا فلسفہ سادہ ہے: زراعت اسی وقت آگے بڑھتی ہے جب اس سے وابستہ لوگوں کو ترقی کے لیے علم، ذرائع اور مواقع ملیں۔ The Agropreneurs میں ہم زرعی برادری کو درپیش چیلنجز سنتے ہیں اور لوگوں کو عملی حل، خیالات اور مواقع سے جوڑنے کے لیے کام کرتے ہیں۔ VISION 2040 – Securing the Future of Agriculture in Pakistan جیسے اقدامات کے ذریعے ہم نئی نسل کو زراعت میں مواقع اور ترقی دیکھنے کی ترغیب دینا چاہتے ہیں، اور زراعت کے لیے ایک مضبوط، ذہین اور زیادہ پائیدار مستقبل کی تشکیل میں حصہ لینا چاہتے ہیں۔'
                    : 'Our philosophy is simple: agriculture moves forward when its people have the knowledge, tools, and opportunities to grow. At The Agropreneurs, we listen to the challenges faced by the agricultural community and work to connect people with practical solutions, ideas, and opportunities. Through initiatives such as VISION 2040 – Securing the Future of Agriculture in Pakistan, we want to inspire the next generation to see agriculture as a sector of opportunity and growth, and contribute to a stronger, smarter, and more sustainable future for agriculture.'}
                </p>
                <p>
                  {isUrdu
                    ? 'The Agropreneurs پائیدار اور ذہین حلوں کے ذریعے زراعت کو تبدیل کرنے کے ہمارے عزم کا اظہار ہے۔'
                    : 'The Agropreneurs is our commitment to transforming agriculture through sustainable and smart solutions.'}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="px-5 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="mx-auto grid max-w-6xl gap-6 rounded-[28px] border border-emerald-100 bg-white p-6 shadow-[0_12px_35px_rgba(20,83,45,0.05)] sm:grid-cols-[0.35fr_1fr] sm:gap-10 sm:p-9 lg:p-12">
            <div>
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-emerald-700">
                {isUrdu ? 'ہم کیا کرتے ہیں' : 'OUR PURPOSE'}
              </p>
              <h2 className="text-3xl font-bold tracking-tight text-green-900 sm:text-4xl">
                {isUrdu ? 'مقصد' : 'Objective'}
              </h2>
            </div>
            <div className="space-y-4 text-base leading-8 text-slate-700 sm:text-lg">
              <p>
                {isUrdu
                  ? 'The Agropreneurs زرعی شعبے میں کام کرنے والے کسانوں، زرعی ماہرین، جدت پسندوں اور تنظیموں کو اکٹھا کرتا ہے۔ ہمارا مقصد علم، ٹیکنالوجی اور عملی تجربے کے درمیان رابطہ قائم کرنا اور ایسے حل فراہم کرنا ہے جو کارکردگی بہتر بنائیں اور زرعی برادری کے لیے بہتر مواقع پیدا کریں۔'
                  : 'The Agropreneurs brings together farmers, agri experts, innovators and organizations working across the agricultural sector. Our aim is to bridge knowledge, technology and practical experience by providing solutions that enhance efficiency and create better opportunities for farming communities.'}
              </p>
              <p>
                {isUrdu
                  ? 'ہم ایسا ماحول قائم کرنا چاہتے ہیں جہاں خیالات کا تبادلہ ہو، مہارتیں پروان چڑھیں اور نئی نسل زراعت کو پائیدار ترقی اور معاشی نمو کے لیے ایک اہم شعبہ سمجھے۔'
                  : 'We seek to foster an environment where ideas are shared, skills are developed, and the next generation is inspired to recognize agriculture as a vital sector for sustainable development and economic growth.'}
              </p>
            </div>
          </div>
        </section>

        <section className="bg-[#173b2a] px-5 py-12 text-white sm:px-6 sm:py-16 lg:px-8">
          <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-[0.35fr_1fr] sm:gap-10">
            <div>
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-emerald-200">
                {isUrdu ? 'ہمارا مستقبل' : 'OUR FUTURE'}
              </p>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                {isUrdu ? 'ویژن' : 'Vision'}
              </h2>
            </div>
            <p className="max-w-4xl text-lg leading-8 text-emerald-50/90 sm:text-xl">
              {isUrdu
                ? 'زراعت کے شعبے کے لیے ایک زیادہ ذہین، جدید اور پائیدار مستقبل بنانا، جہاں جدید طریقے اور باہمی تعاون عالمی معیار کو آگے بڑھائیں، زرعی ترقی کو فروغ دیں، نئے مواقع پیدا کریں اور طویل مدتی غذائی تحفظ میں مدد دیں۔'
                : 'To build a smarter, more innovative, and sustainable future for the agriculture sector, where modern practices and collaboration drive global standards, promote agricultural growth, create new opportunities, and support long-term food security.'}
            </p>
          </div>
        </section>

        <section className="px-5 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="mx-auto max-w-6xl rounded-[28px] border border-emerald-100 bg-white p-6 shadow-[0_12px_35px_rgba(20,83,45,0.05)] sm:p-9 lg:p-12">
            <div className="mb-8 max-w-3xl">
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-emerald-700">
                {isUrdu ? 'ہماری وابستگی' : 'WHAT WE DO'}
              </p>
              <h2 className="text-3xl font-bold tracking-tight text-green-900 sm:text-4xl">
                {isUrdu ? 'مشن' : 'Mission'}
              </h2>
              <p className="mt-4 text-base leading-8 text-slate-700 sm:text-lg">
                {isUrdu
                  ? 'The Agropreneurs لوگوں کو کامیابی کے لیے درکار علم، ذرائع، مواقع اور مدد سے جوڑ کر زراعت میں داخلے کے سفر کو آسان بنانے کے لیے پُرعزم ہے۔ ہمارا مشن یہ ہے کہ:'
                  : 'The Agropreneurs is committed to simplifying the journey into agriculture by connecting people with the knowledge, tools, opportunities, and support they need to succeed. Our mission is to:'}
              </p>
            </div>
            <ol className="grid gap-3 md:grid-cols-2">
              {missionPoints.map(({ en, ur }, index) => (
                <li key={en} className="flex gap-4 rounded-2xl border border-emerald-100 bg-[#f7faf5] p-5">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-900 text-sm font-bold text-white">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <p className="text-sm leading-7 text-slate-700 sm:text-base">
                    {isUrdu ? ur : en}
                  </p>
                </li>
              ))}
            </ol>
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
              <p className="mt-4 text-base leading-8 text-slate-700 sm:text-lg">
                {isUrdu
                  ? 'ہم زرعی برادری کی حقیقی ضروریات، چیلنجز اور خدشات کو سمجھنے سے آغاز کرتے ہیں۔ ہمارا پہلا منصوبہ، VISION 2040 — پاکستان میں زراعت کے مستقبل کا تحفظ، زرعی کمیونٹی سروے کے ذریعے غذائی بحران اور ممکنہ اقدامات کے بارے میں آرا جاننے کے لیے شروع ہوا۔ ہمارا طریقہ یہی ہے: پہلے سننا، چیلنج سمجھنا، پھر عملی علم، ٹیکنالوجی، مصنوعات، خدمات اور مواقع کے ذریعے دیرپا قدر پیدا کرنا۔'
                  : 'We start by understanding the real needs, challenges and concerns of the agricultural community. Our first project, VISION 2040 — Securing the Future of Agriculture in Pakistan, began with an Agriculture Community Survey exploring perspectives on the food crisis and possible measures. This reflects our approach: listen first, understand the challenges, and then connect people with practical knowledge, technology, products, services and opportunities to develop solutions that create real and lasting value.'}
              </p>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
