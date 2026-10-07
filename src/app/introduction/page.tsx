'use client';

import Link from 'next/link';
import {
  Activity,
  ArrowRight,
  ChartNoAxesCombined,
  Cpu,
  Database,
  GraduationCap,
  Landmark,
  Lightbulb,
  MessagesSquare,
  Network,
  ShieldCheck,
  Sprout,
  Store,
  UsersRound,
} from 'lucide-react';
import SiteFooter from '@/components/site-footer';
import SiteHeader from '@/components/site-header';
import { useSiteLanguage } from '@/components/language-provider';

const surveyOutcomes = [
  { en: 'Awareness', ur: 'آگاہی', descriptionEn: 'Stay informed about food security and agriculture.', descriptionUr: 'غذائی تحفظ اور زراعت کے بارے میں باخبر رہیں۔', icon: Lightbulb },
  { en: 'Networking', ur: 'نیٹ ورکنگ', descriptionEn: 'Connect farmers and agricultural communities.', descriptionUr: 'کسانوں اور زرعی برادریوں کو آپس میں جوڑیں۔', icon: Network },
  { en: 'Resource Sharing', ur: 'وسائل کی شراکت', descriptionEn: 'Improve access to useful knowledge and resources.', descriptionUr: 'مفید علم اور وسائل تک رسائی بہتر بنائیں۔', icon: Database },
  { en: 'Data Gathering', ur: 'معلومات کا حصول', descriptionEn: 'Build reliable insights from real experiences.', descriptionUr: 'حقیقی تجربات سے قابلِ اعتماد معلومات حاصل کریں۔', icon: ChartNoAxesCombined },
  { en: 'Farmer Voice', ur: 'کسانوں کی آواز', descriptionEn: 'Bring farmers’ priorities into the conversation.', descriptionUr: 'کسانوں کی ترجیحات کو گفتگو کا حصہ بنائیں۔', icon: MessagesSquare },
  { en: 'Challenge Identification', ur: 'چیلنجز کی نشاندہی', descriptionEn: 'Reveal the most urgent barriers on the ground.', descriptionUr: 'زمینی سطح پر فوری رکاوٹوں کو نمایاں کریں۔', icon: ScanIcon },
  { en: 'Capacity Building & Training', ur: 'صلاحیت سازی اور تربیت', descriptionEn: 'Identify practical learning needs.', descriptionUr: 'عملی تربیت اور سیکھنے کی ضروریات جانیں۔', icon: GraduationCap },
  { en: 'Technology Adoption', ur: 'ٹیکنالوجی کا استعمال', descriptionEn: 'Understand readiness for smarter farming tools.', descriptionUr: 'جدید زرعی آلات اپنانے کی تیاری سمجھیں۔', icon: Cpu },
  { en: 'Market Linkages', ur: 'منڈیوں سے روابط', descriptionEn: 'Discover ways to strengthen market access.', descriptionUr: 'منڈیوں تک رسائی مضبوط کرنے کے طریقے تلاش کریں۔', icon: Store },
  { en: 'Collaboration', ur: 'تعاون', descriptionEn: 'Create opportunities for collective action.', descriptionUr: 'اجتماعی اقدامات کے مواقع پیدا کریں۔', icon: UsersRound },
  { en: 'Opportunity Identification', ur: 'مواقع کی نشاندہی', descriptionEn: 'Surface new areas for sustainable growth.', descriptionUr: 'پائیدار ترقی کے نئے مواقع سامنے لائیں۔', icon: Sprout },
  { en: 'Farmer Database', ur: 'کسانوں کا ڈیٹا بیس', descriptionEn: 'Map a diverse, nationwide farming community.', descriptionUr: 'ملک بھر کی متنوع زرعی برادری کا تعارف حاصل کریں۔', icon: Database },
  { en: 'Policy Support', ur: 'پالیسی میں معاونت', descriptionEn: 'Provide evidence for stronger decisions.', descriptionUr: 'بہتر فیصلوں کے لیے شواہد فراہم کریں۔', icon: Landmark },
  { en: 'Future Monitoring', ur: 'مستقبل کی نگرانی', descriptionEn: 'Track progress toward Pakistan’s 2040 vision.', descriptionUr: 'پاکستان کے وژن 2040 کی پیش رفت پر نظر رکھیں۔', icon: Activity },
];

const pillars = [
  {
    number: '01',
    titleEn: 'Objective',
    titleUr: 'مقصد',
    descriptionEn: 'Connect Pakistan’s agricultural community and turn shared knowledge into practical opportunities.',
    descriptionUr: 'پاکستان کی زرعی برادری کو جوڑنا اور مشترکہ علم کو عملی مواقع میں بدلنا۔',
  },
  {
    number: '02',
    titleEn: 'Vision',
    titleUr: 'ویژن',
    descriptionEn: 'A smart, sustainable and food-secure Pakistan where farmers can thrive.',
    descriptionUr: 'ایک ذہین، پائیدار اور غذائی تحفظ کا حامل پاکستان جہاں کسان ترقی کر سکیں۔',
  },
  {
    number: '03',
    titleEn: 'Mission',
    titleUr: 'مشن',
    descriptionEn: 'Empower farmers through collaboration, useful data, modern practices and stronger market links.',
    descriptionUr: 'تعاون، مفید معلومات، جدید طریقوں اور مضبوط بازاری روابط کے ذریعے کسانوں کو بااختیار بنانا۔',
  },
];

function ScanIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true" {...props}>
      <path d="M4 8V5a1 1 0 0 1 1-1h3M16 4h3a1 1 0 0 1 1 1v3M20 16v3a1 1 0 0 1-1 1h-3M8 20H5a1 1 0 0 1-1-1v-3M7 12h10M12 7v10" />
    </svg>
  );
}

export default function IntroductionPage() {
  const { isUrdu } = useSiteLanguage();

  return (
    <>
      <SiteHeader ctaHref="/survey-form" />
      <main className="min-h-screen bg-[#f7f8f3]" dir={isUrdu ? 'rtl' : 'ltr'}>
        <section className="bg-gradient-to-br from-[#173b2a] via-[#204a34] to-[#2d5a3c] px-5 py-20 text-center text-white sm:py-24">
          <div className="mx-auto max-w-4xl">
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.22em] text-emerald-200 sm:text-sm">
              {isUrdu ? 'پاکستانی زرعی برادری کا سروے' : 'Pakistan Agriculture Community Survey'}
            </p>
            <h1 className="text-4xl font-bold leading-tight sm:text-6xl">
              {isUrdu ? 'VISION 2040: پاکستان میں زراعت کا مستقبل محفوظ بنانا' : 'VISION 2040: Securing the Future of Agriculture in Pakistan'}
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg font-medium text-emerald-100 sm:text-xl">
              {isUrdu ? 'آپ کی آواز کیوں اہم ہے۔ حقیقی تجربات سے جڑی ایک قومی گفتگو۔' : 'Why your voice matters. A national conversation, rooted in real experience.'}
            </p>
            <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-white/80 sm:text-lg">
              {isUrdu
                ? 'یہ سروے 2040 تک غذائی تحفظ کے بارے میں کسانوں کے تجربات، خدشات اور توقعات کو سمجھنے کے لیے ہے۔ ہر صوبے سے موصول ہونے والے جوابات پاکستان بھر کے عملی مسائل اور مواقع کی نشاندہی میں مدد دیں گے۔'
                : 'This survey is designed to understand farmers’ experiences, concerns and expectations about food security through 2040. Responses from every province will help identify practical challenges and opportunities across Pakistan.'}
            </p>
          </div>
        </section>

        <section className="relative z-10 mx-auto -mt-8 grid max-w-5xl gap-4 px-5 sm:grid-cols-3">
          {[
            { titleEn: 'Nationwide', titleUr: 'ملک گیر', detailEn: 'All provinces & regions', detailUr: 'تمام صوبے اور علاقے', icon: Sprout },
            { titleEn: 'Private', titleUr: 'خفیہ', detailEn: 'Responses stay confidential', detailUr: 'جوابات خفیہ رکھے جائیں گے', icon: ShieldCheck },
            { titleEn: '15–20 min', titleUr: '15–20 منٹ', detailEn: 'Estimated completion time', detailUr: 'سروے مکمل کرنے کا متوقع وقت', icon: Activity },
          ].map(({ titleEn, titleUr, detailEn, detailUr, icon: Icon }) => (
            <article key={titleEn} className="flex items-center gap-4 rounded-2xl border border-emerald-100 bg-white p-5 shadow-[0_12px_30px_rgba(20,60,35,0.08)]">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-emerald-50 text-emerald-800">
                <Icon size={22} aria-hidden="true" />
              </span>
              <div>
                <h2 className="text-lg font-bold text-green-950">{isUrdu ? titleUr : titleEn}</h2>
                <p className="mt-1 text-sm text-slate-600">{isUrdu ? detailUr : detailEn}</p>
              </div>
            </article>
          ))}
        </section>

        <section className="px-5 py-20 sm:py-24">
          <div className="mx-auto max-w-6xl">
            <div className="mb-10 max-w-2xl">
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-emerald-700">
                {isUrdu ? 'بصیرت سے اثر تک' : 'From insight to impact'}
              </p>
              <h2 className="text-3xl font-bold text-green-950 sm:text-4xl">
                {isUrdu ? 'یہ سروے کیا ممکن بنائے گا' : 'What this survey will make possible'}
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {surveyOutcomes.map(({ en, ur, descriptionEn, descriptionUr, icon: Icon }) => (
                <article key={en} className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-[0_8px_24px_rgba(20,60,35,0.045)] transition-transform duration-200 hover:-translate-y-1 hover:shadow-[0_14px_28px_rgba(20,60,35,0.09)]">
                  <span className="mb-5 grid h-11 w-11 place-items-center rounded-xl bg-emerald-50 text-emerald-800">
                    <Icon size={21} aria-hidden="true" />
                  </span>
                  <h3 className="text-lg font-bold text-green-950">{isUrdu ? ur : en}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{isUrdu ? descriptionUr : descriptionEn}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#1d3d2b] px-5 py-20 text-white sm:py-24">
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-emerald-200">
                {isUrdu ? 'دی ایگروپرینیورز کے بارے میں' : 'About The Agropreneurs'}
              </p>
              <h2 className="text-3xl font-bold leading-tight sm:text-5xl">
                {isUrdu ? 'خیالات جو عمل میں ڈھلیں۔' : 'Ideas that grow into action.'}
              </h2>
              <p className="mt-5 max-w-md text-base leading-8 text-white/75">
                {isUrdu
                  ? 'ایک کمیونٹی پر مبنی پلیٹ فارم جو زراعت، کاروبار، ٹیکنالوجی اور پائیداری کے سنگم پر کام کرتا ہے۔'
                  : 'A community-led platform working at the intersection of agriculture, enterprise, technology and sustainability.'}
              </p>
            </div>
            <div className="grid gap-4">
              {pillars.map((pillar) => (
                <article key={pillar.number} className="grid gap-4 rounded-2xl border border-white/15 bg-white/[0.06] p-5 sm:grid-cols-[52px_1fr] sm:p-6">
                  <span className="text-sm font-bold tracking-[0.12em] text-emerald-200">{pillar.number}</span>
                  <div>
                    <h3 className="text-xl font-bold">{isUrdu ? pillar.titleUr : pillar.titleEn}</h3>
                    <p className="mt-2 text-sm leading-7 text-white/75">{isUrdu ? pillar.descriptionUr : pillar.descriptionEn}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 py-16 text-center sm:py-20">
          <h2 className="text-3xl font-bold text-green-950">
            {isUrdu ? 'اپنی آواز شامل کریں' : 'Add your voice to the conversation'}
          </h2>
          <p className="mx-auto mt-3 max-w-xl leading-7 text-slate-600">
            {isUrdu ? 'آپ کے تجربات پاکستان کے زرعی مستقبل کی تشکیل میں مدد دے سکتے ہیں۔' : 'Your experience can help shape the future of agriculture in Pakistan.'}
          </p>
          <Link href="/survey-form" className="introduction-cta-button mt-7 inline-flex items-center gap-2 rounded-full bg-green-900 px-7 py-3.5 font-semibold transition-colors hover:bg-green-800">
            {isUrdu ? 'سروے شروع کریں' : 'Start the survey'}
            <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
