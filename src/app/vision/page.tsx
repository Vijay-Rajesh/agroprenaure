'use client';

import SiteHeader from '@/components/site-header';
import SiteFooter from '@/components/site-footer';
import { useSiteLanguage } from '@/components/language-provider';
import { Eye, Target, Lightbulb, Users } from 'lucide-react';

export default function VisionPage() {
  const { isUrdu } = useSiteLanguage();

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
        {/* Header Section */}
        <section className="px-4 py-20 sm:px-6 lg:px-8 bg-gradient-to-r from-green-900 to-green-800">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              {isUrdu ? 'VISION 2040' : 'VISION 2040'}
            </h1>
            <p className="text-xl">
              {isUrdu 
                ? 'پاکستان میں زراعت کا مستقبل محفوظ کریں'
                : 'Securing the Future of Agriculture in Pakistan'}
            </p>
          </div>
        </section>

        {/* Vision Statement */}
        <section className="px-4 py-16 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-start gap-4 mb-8">
              <Eye className="w-10 h-10 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-3xl font-bold text-green-900 mb-4">
                  {isUrdu ? 'ہماری بصیرت' : 'Our Vision'}
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {isUrdu
                    ? 'پاکستان میں زراعت کو تبدیل کرنا تاکہ یہ پائیدار، منافع بخش اور اگلی نسل کے کسانوں کے لیے جاذب بن جائے۔ ہم ایک ایسے مستقبل کا تصور کرتے ہیں جہاں جدید ٹیکنالوجی، بہتر طریقے اور مضبوط نیٹ ورک ملکر پاکستانی زرعی شعبے کو طاقتور بنائیں۔'
                    : 'To transform agriculture in Pakistan to make it sustainable, profitable, and attractive for the next generation of farmers. We envision a future where modern technology, better practices, and strong networks empower Pakistan\'s agricultural sector.'}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Mission */}
        <section className="px-4 py-16 sm:px-6 lg:px-8 bg-green-50">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-start gap-4 mb-8">
              <Target className="w-10 h-10 text-green-700 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-3xl font-bold text-green-900 mb-4">
                  {isUrdu ? 'ہماری مشن' : 'Our Mission'}
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  {isUrdu
                    ? 'کسانوں، اہم فریقین اور حکومتی ادارے کے ساتھ کام کرتے ہوئے ایک منصوبہ بندی ڈھانچہ تیار کرنا جو:'
                    : 'To develop a planning framework by working with farmers, stakeholders, and government institutions that:'}
                </p>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 font-bold">→</span>
                    <span>
                      {isUrdu
                        ? 'کسانوں کی حقیقی ضروریات، چیلنجز اور توقعات کو سمجھے'
                        : 'Understands the real needs, challenges, and expectations of farmers'}
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 font-bold">→</span>
                    <span>
                      {isUrdu
                        ? 'عالمی بہترین طریقوں کو مقامی حالات کے ساتھ ملاتا ہے'
                        : 'Combines global best practices with local conditions'}
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 font-bold">→</span>
                    <span>
                      {isUrdu
                        ? 'پائیدار اور منافع بخش حل فراہم کرتا ہے'
                        : 'Provides sustainable and profitable solutions'}
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 font-bold">→</span>
                    <span>
                      {isUrdu
                        ? 'اگلی نسل کو زراعت میں شامل ہونے کی حوصلہ افزائی کرتا ہے'
                        : 'Encourages the next generation to engage in agriculture'}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Key Focus Areas */}
        <section className="px-4 py-16 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-green-900 mb-12 text-center">
              {isUrdu ? 'کلیدی توجہات' : 'Key Focus Areas'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-green-50 p-8 rounded-lg">
                <Lightbulb className="w-10 h-10 text-green-600 mb-4" />
                <h3 className="text-xl font-bold text-green-900 mb-3">
                  {isUrdu ? 'ٹیکنالوجی اور جدید طریقے' : 'Technology & Innovation'}
                </h3>
                <p className="text-gray-700">
                  {isUrdu
                    ? 'سمارٹ فارمنگ، ڈرون ٹیکنالوجی، آب پاشی کے جدید طریقے اور ڈیٹا سے چلنے والے فیصلے'
                    : 'Smart farming, drone technology, modern irrigation, and data-driven decisions'}
                </p>
              </div>
              <div className="bg-green-50 p-8 rounded-lg">
                <Users className="w-10 h-10 text-green-600 mb-4" />
                <h3 className="text-xl font-bold text-green-900 mb-3">
                  {isUrdu ? 'کسان کی ترقی' : 'Farmer Development'}
                </h3>
                <p className="text-gray-700">
                  {isUrdu
                    ? 'صلاحیت میں اضافہ، تربیت، نیٹ ورکنگ اور بازار تک رسائی'
                    : 'Capacity building, training, networking, and market access'}
                </p>
              </div>
              <div className="bg-green-50 p-8 rounded-lg">
                <Lightbulb className="w-10 h-10 text-green-600 mb-4" />
                <h3 className="text-xl font-bold text-green-900 mb-3">
                  {isUrdu ? 'پائیدار زراعت' : 'Sustainable Agriculture'}
                </h3>
                <p className="text-gray-700">
                  {isUrdu
                    ? 'ماحول دوست طریقے، مٹی کی صحت، پانی کی بچت اور حیاتیات کے تنوع'
                    : 'Eco-friendly practices, soil health, water conservation, and biodiversity'}
                </p>
              </div>
              <div className="bg-green-50 p-8 rounded-lg">
                <Users className="w-10 h-10 text-green-600 mb-4" />
                <h3 className="text-xl font-bold text-green-900 mb-3">
                  {isUrdu ? 'خوراکی تحفظ' : 'Food Security'}
                </h3>
                <p className="text-gray-700">
                  {isUrdu
                    ? 'پاکستان میں خوراکی بحران سے نمٹنا اور پائیدار پیداوار یقینی کرنا'
                    : 'Addressing food crisis in Pakistan and ensuring sustainable production'}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="px-4 py-16 sm:px-6 lg:px-8 bg-gradient-to-r from-green-900 to-green-800">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-3xl font-bold mb-4">
              {isUrdu ? 'اس مشن میں شامل ہوں' : 'Join This Mission'}
            </h2>
            <p className="text-lg mb-8">
              {isUrdu
                ? 'آپ کا تجربہ اور نقطہ نظر شریک کرتے ہوئے VISION 2040 کا حصہ بن جائیں۔'
                : 'Become part of VISION 2040 by sharing your experience and perspective.'}
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
