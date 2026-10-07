'use client';

import Link from 'next/link';
import SiteHeader from '@/components/site-header';
import SiteFooter from '@/components/site-footer';
import { useSiteLanguage } from '@/components/language-provider';
import { Users, Handshake, Globe, Leaf } from 'lucide-react';

export default function AboutPage() {
  const { isUrdu } = useSiteLanguage();

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
        {/* Header Section */}
        <section className="px-4 py-20 sm:px-6 lg:px-8 bg-gradient-to-r from-green-900 to-green-800">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              {isUrdu ? 'The Agropreneurs کے بارے میں' : 'About The Agropreneurs'}
            </h1>
            <p className="text-xl">
              {isUrdu 
                ? 'پاکستان میں زرعی انقلاب کی قیادت کریں'
                : 'Leading Agricultural Revolution in Pakistan'}
            </p>
          </div>
        </section>

        {/* Introduction Section */}
        <section className="px-4 py-16 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-green-900 mb-8">
              {isUrdu ? 'ہمارا تعارف' : 'Who We Are'}
            </h2>
            <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
              <p>
                {isUrdu
                  ? 'The Agropreneurs ایک جدید اور متحرک منظمہ ہے جو پاکستان میں زراعت کے شعبے میں سچ مچ کا تبدیلی لانے کے لیے وقف ہے۔ ہم کسانوں، حکومتی اداروں اور عالمی ماہرین کو ملا کر ایک بہتر زرعی نظام بنانا چاہتے ہیں۔'
                  : 'The Agropreneurs is a modern and dynamic organization dedicated to bringing real change to Pakistan\'s agricultural sector. We work to connect farmers, government institutions, and global experts to build a better agricultural system.'}
              </p>
              <p>
                {isUrdu
                  ? 'ہماری سٹیم میں کسان، ماہرین، ٹیکنالوجی کے ماہرین اور کاروباری شخصیات شامل ہیں جو سب ایک مقصد سے متحد ہیں - پاکستان میں کسانوں کی زندگی بہتر بنانا۔'
                  : 'Our team includes farmers, experts, technology specialists, and business professionals united in one mission - to improve the lives of farmers in Pakistan.'}
              </p>
            </div>
          </div>
        </section>

        {/* Our Focus */}
        <section className="px-4 py-16 sm:px-6 lg:px-8 bg-green-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-green-900 mb-12 text-center">
              {isUrdu ? 'ہماری توجہ' : 'Our Focus'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg p-8 shadow-md">
                <Users className="w-12 h-12 text-green-600 mb-4" />
                <h3 className="text-xl font-bold text-green-900 mb-4">
                  {isUrdu ? 'کسان کوں صلاحیت دینا' : 'Empowering Farmers'}
                </h3>
                <p className="text-gray-700">
                  {isUrdu
                    ? 'ہم کسانوں کو ٹیکنالوجی، تربیت اور بازار تک رسائی فراہم کرتے ہیں تاکہ وہ اپنی صلاحیت کو سمجھ سکیں اور اپنے کاروبار کو بڑھا سکیں۔'
                    : 'We provide farmers with technology, training, and market access to help them realize their potential and grow their businesses.'}
                </p>
              </div>
              <div className="bg-white rounded-lg p-8 shadow-md">
                <Handshake className="w-12 h-12 text-green-600 mb-4" />
                <h3 className="text-xl font-bold text-green-900 mb-4">
                  {isUrdu ? 'اہم فریقین کو شامل کرنا' : 'Engaging Stakeholders'}
                </h3>
                <p className="text-gray-700">
                  {isUrdu
                    ? 'ہم حکومت، نجی شعبے، تعلیمی اداروں اور عالمی تنظیموں کے ساتھ کام کرتے ہیں ایک مضبوط نیٹ ورک بنانے کے لیے۔'
                    : 'We collaborate with government, private sector, educational institutions, and international organizations to build a strong network.'}
                </p>
              </div>
              <div className="bg-white rounded-lg p-8 shadow-md">
                <Leaf className="w-12 h-12 text-green-600 mb-4" />
                <h3 className="text-xl font-bold text-green-900 mb-4">
                  {isUrdu ? 'پائیدار حل' : 'Sustainable Solutions'}
                </h3>
                <p className="text-gray-700">
                  {isUrdu
                    ? 'ہم ایسے حل تلاش کرتے ہیں جو پیداوری بڑھائیں، ماحول کو محفوظ رکھیں اور منافع یقینی کریں۔'
                    : 'We seek solutions that increase productivity, protect the environment, and ensure profitability.'}
                </p>
              </div>
              <div className="bg-white rounded-lg p-8 shadow-md">
                <Globe className="w-12 h-12 text-green-600 mb-4" />
                <h3 className="text-xl font-bold text-green-900 mb-4">
                  {isUrdu ? 'عالمی معیار' : 'Global Standards'}
                </h3>
                <p className="text-gray-700">
                  {isUrdu
                    ? 'ہم عالمی بہترین طریقوں کو پاکستانی حالات کے ساتھ ملا کر ایسے حل بناتے ہیں جو حقیقی اور مؤثر ہوں۔'
                    : 'We combine global best practices with Pakistani conditions to create solutions that are practical and effective.'}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 lg:px-8 bg-gradient-to-r from-green-50 via-white to-emerald-50">
          <div className="max-w-4xl mx-auto">
            <div className="rounded-[28px] border border-emerald-200 bg-white p-8 shadow-[0_12px_35px_rgba(20,83,45,0.06)] sm:p-10">
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-emerald-700">
                {isUrdu ? 'بانی کا پیغام' : "FOUNDER'S MESSAGE"}
              </p>
              <h3 className="text-3xl font-bold text-green-900 mb-4">
                {isUrdu ? 'آئیے زراعت کا مستقبل مل کر بنائیں۔' : 'Let’s build agriculture’s future together.'}
              </h3>
              <p className="text-lg leading-8 text-gray-700 mb-6">
                {isUrdu
                  ? 'میرا یقین ہے کہ پاکستان کی زرعی برادری کا ہر فرد ایک مضبوط اور پائیدار مستقبل کی تشکیل میں اہم کردار ادا کرتا ہے۔ اسی لیے ہم نے ایک ایسا پلیٹ فارم شروع کیا ہے جہاں کسان اپنے تجربات، خیالات اور ترجیحات ایک دوسرے کے ساتھ بانٹ سکیں۔'
                  : 'I believe every member of Pakistan’s agricultural community has an important role in shaping a stronger, more sustainable future. This is why we created a platform where farmers can share their experience, ideas, and priorities.'}
              </p>
              <Link
                href="/founder"
                className="inline-flex items-center justify-center rounded-full bg-green-900 px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-green-800"
              >
                {isUrdu ? 'بانی کا پیغام دیکھیں' : 'Read the founder message'}
              </Link>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="px-4 py-16 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-green-900 mb-12 text-center">
              {isUrdu ? 'ہماری قیمتیں' : 'Our Values'}
            </h2>
            <div className="space-y-8">
              <div className="border-l-4 border-green-600 pl-6">
                <h3 className="text-xl font-bold text-green-900 mb-2">
                  {isUrdu ? '📌 حقیقت' : '📌 Authenticity'}
                </h3>
                <p className="text-gray-700">
                  {isUrdu
                    ? 'ہم کسانوں کے حقیقی تجربات اور ضروریات سے شروع کرتے ہیں۔'
                    : 'We start with the real experiences and needs of farmers.'}
                </p>
              </div>
              <div className="border-l-4 border-green-600 pl-6">
                <h3 className="text-xl font-bold text-green-900 mb-2">
                  {isUrdu ? '📌 تعاون' : '📌 Collaboration'}
                </h3>
                <p className="text-gray-700">
                  {isUrdu
                    ? 'ہم تنہا کام نہیں کرتے۔ ہم ایک دوسرے کے ساتھ مل کر کام کرتے ہیں۔'
                    : 'We don\'t work alone. We work together with others.'}
                </p>
              </div>
              <div className="border-l-4 border-green-600 pl-6">
                <h3 className="text-xl font-bold text-green-900 mb-2">
                  {isUrdu ? '📌 پائیداری' : '📌 Sustainability'}
                </h3>
                <p className="text-gray-700">
                  {isUrdu
                    ? 'ہمارے حل آج اور مستقبل دونوں کے لیے کام کرتے ہیں۔'
                    : 'Our solutions work for today and for the future.'}
                </p>
              </div>
              <div className="border-l-4 border-green-600 pl-6">
                <h3 className="text-xl font-bold text-green-900 mb-2">
                  {isUrdu ? '📌 نوآوری' : '📌 Innovation'}
                </h3>
                <p className="text-gray-700">
                  {isUrdu
                    ? 'ہم نئے طریقے اور ٹیکنالوجی سے نہیں ڈرتے۔'
                    : 'We embrace new methods and technology.'}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="px-4 py-16 sm:px-6 lg:px-8 bg-gradient-to-r from-green-900 to-green-800">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-3xl font-bold mb-4">
              {isUrdu ? 'ہمارا حصہ بن جائیں' : 'Become Part of Us'}
            </h2>
            <p className="text-lg mb-8">
              {isUrdu
                ? 'The Agropreneurs کے ساتھ جڑیں اور پاکستان میں زراعت کو تبدیل کرنے میں مدد کریں۔'
                : 'Join The Agropreneurs and help transform agriculture in Pakistan.'}
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
