export type HomeHeroSettings = {
  eyebrowEn: string;
  eyebrowUr: string;
  titleEn: string;
  titleUr: string;
  descriptionEn: string;
  descriptionUr: string;
  imageUrl: string;
  visionEyebrowEn: string;
  visionEyebrowUr: string;
  visionTitleEn: string;
  visionTitleUr: string;
  visionLeadEn: string;
  visionLeadUr: string;
  visionBodyEn: string;
  visionBodyUr: string;
  stats: { valueEn: string; valueUr: string; labelEn: string; labelUr: string }[];
  impactEyebrowEn: string;
  impactEyebrowUr: string;
  impactTitleEn: string;
  impactTitleUr: string;
  impactItems: { titleEn: string; titleUr: string; descriptionEn: string; descriptionUr: string }[];
  aboutEyebrowEn: string;
  aboutEyebrowUr: string;
  aboutTitleEn: string;
  aboutTitleUr: string;
  aboutDescriptionEn: string;
  aboutDescriptionUr: string;
  pillars: { titleEn: string; titleUr: string; bodyEn: string; bodyUr: string }[];
  quoteEn: string;
  quoteUr: string;
};

export const defaultHomeHero: HomeHeroSettings = {
  eyebrowEn: 'A future shaped by farmers',
  eyebrowUr: 'کسانوں کے ساتھ مل کر مستقبل کی تشکیل',
  titleEn: 'Farming has a future. Let’s shape it together.',
  titleUr: 'زراعت کا مستقبل ہے، آئیے اسے مل کر سنواریں۔',
  descriptionEn: 'Share your experience and help shape practical action for a food-secure Pakistan.',
  descriptionUr: 'اپنا تجربہ بتائیں اور غذائی تحفظ رکھنے والے پاکستان کے لیے عملی اقدامات کی تشکیل میں مدد کریں۔',
  imageUrl: '/vision-2040-fields.jpg',
  visionEyebrowEn: 'Pakistan Agriculture Community Survey',
  visionEyebrowUr: 'پاکستانی زرعی برادری کا سروے',
  visionTitleEn: 'VISION 2040: Securing the Future of Agriculture in Pakistan',
  visionTitleUr: 'وژن 2040: پاکستان میں زراعت کے مستقبل کا تحفظ',
  visionLeadEn: 'Why your voice matters. A national conversation, rooted in real experience.',
  visionLeadUr: 'آپ کی رائے کیوں اہم ہے۔ حقیقی تجربات پر مبنی قومی گفتگو۔',
  visionBodyEn: 'This survey is designed to understand farmers’ experiences, concerns and expectations about food security through 2040. Responses from every province will help identify practical challenges and opportunities across Pakistan.',
  visionBodyUr: 'یہ سروے 2040 تک غذائی تحفظ کے بارے میں کسانوں کے تجربات، خدشات اور توقعات جاننے کے لیے ہے۔ ہر صوبے سے موصول ہونے والے جوابات پاکستان بھر کے عملی مسائل اور مواقع کی نشاندہی کریں گے۔',
  stats: [
    { valueEn: 'Nationwide', valueUr: 'ملک بھر میں', labelEn: 'All provinces & regions', labelUr: 'تمام صوبے اور علاقے' },
    { valueEn: 'Private', valueUr: 'محفوظ', labelEn: 'Responses stay confidential', labelUr: 'جوابات خفیہ رکھے جاتے ہیں' },
    { valueEn: '15–20 min', valueUr: '15–20 منٹ', labelEn: 'Estimated completion time', labelUr: 'تکمیل کا متوقع وقت' },
  ],
  impactEyebrowEn: 'From insight to impact',
  impactEyebrowUr: 'رائے سے عملی تبدیلی تک',
  impactTitleEn: 'What this survey will make possible',
  impactTitleUr: 'یہ سروے کیا ممکن بنائے گا',
  impactItems: [
    { titleEn: 'Awareness', titleUr: 'آگاہی', descriptionEn: 'Stay informed about food security and agriculture.', descriptionUr: 'غذائی تحفظ اور زراعت سے باخبر رہیں۔' },
    { titleEn: 'Networking', titleUr: 'رابطہ سازی', descriptionEn: 'Connect farmers and agricultural communities.', descriptionUr: 'کسانوں اور زرعی برادریوں کو جوڑیں۔' },
    { titleEn: 'Resource Sharing', titleUr: 'وسائل کی شراکت', descriptionEn: 'Improve access to useful knowledge and resources.', descriptionUr: 'مفید معلومات اور وسائل تک رسائی بہتر بنائیں۔' },
    { titleEn: 'Data Gathering', titleUr: 'اعداد و شمار کا حصول', descriptionEn: 'Build reliable insights from real experiences.', descriptionUr: 'حقیقی تجربات سے قابلِ اعتماد معلومات حاصل کریں۔' },
    { titleEn: 'Farmer Voice', titleUr: 'کسانوں کی آواز', descriptionEn: 'Bring farmers’ priorities into the conversation.', descriptionUr: 'گفتگو میں کسانوں کی ترجیحات شامل کریں۔' },
    { titleEn: 'Challenge Identification', titleUr: 'مسائل کی نشاندہی', descriptionEn: 'Reveal the most urgent barriers on the ground.', descriptionUr: 'میدان میں درپیش فوری رکاوٹوں کی نشاندہی کریں۔' },
    { titleEn: 'Capacity Building & Training', titleUr: 'صلاحیت سازی اور تربیت', descriptionEn: 'Identify practical learning needs.', descriptionUr: 'عملی تربیت کی ضروریات جانیں۔' },
    { titleEn: 'Technology Adoption', titleUr: 'ٹیکنالوجی کا استعمال', descriptionEn: 'Understand readiness for smarter farming tools.', descriptionUr: 'جدید زرعی آلات اپنانے کی تیاری سمجھیں۔' },
    { titleEn: 'Market Linkages', titleUr: 'منڈیوں سے روابط', descriptionEn: 'Discover ways to strengthen market access.', descriptionUr: 'منڈیوں تک بہتر رسائی کے طریقے تلاش کریں۔' },
    { titleEn: 'Collaboration', titleUr: 'باہمی تعاون', descriptionEn: 'Create opportunities for collective action.', descriptionUr: 'اجتماعی اقدامات کے مواقع پیدا کریں۔' },
    { titleEn: 'Opportunity Identification', titleUr: 'مواقع کی نشاندہی', descriptionEn: 'Surface new areas for sustainable growth.', descriptionUr: 'پائیدار ترقی کے نئے شعبے سامنے لائیں۔' },
    { titleEn: 'Farmer Database', titleUr: 'کسانوں کا ڈیٹا بیس', descriptionEn: 'Map a diverse, nationwide farming community.', descriptionUr: 'ملک بھر کی متنوع زرعی برادری کا نقشہ بنائیں۔' },
    { titleEn: 'Policy Support', titleUr: 'پالیسی معاونت', descriptionEn: 'Provide evidence for stronger decisions.', descriptionUr: 'بہتر فیصلوں کے لیے شواہد فراہم کریں۔' },
    { titleEn: 'Future Monitoring', titleUr: 'مستقبل کی نگرانی', descriptionEn: 'Track progress toward Pakistan’s 2040 vision.', descriptionUr: 'پاکستان کے 2040 وژن کی پیش رفت دیکھیں۔' },
  ],
  aboutEyebrowEn: 'About The Agropreneurs',
  aboutEyebrowUr: 'دی ایگروپرینیورز کے بارے میں',
  aboutTitleEn: 'Ideas that grow into action.',
  aboutTitleUr: 'خیالات سے عملی اقدام تک۔',
  aboutDescriptionEn: 'A community-led platform working at the intersection of agriculture, enterprise, technology and sustainability.',
  aboutDescriptionUr: 'ایک برادری پر مبنی پلیٹ فارم جو زراعت، کاروبار، ٹیکنالوجی اور پائیداری کو یکجا کرتا ہے۔',
  pillars: [
    { titleEn: 'Objective', titleUr: 'مقصد', bodyEn: 'Connect Pakistan’s agricultural community and turn shared knowledge into practical opportunities.', bodyUr: 'پاکستان کی زرعی برادری کو جوڑنا اور مشترکہ علم کو عملی مواقع میں بدلنا۔' },
    { titleEn: 'Vision', titleUr: 'ویژن', bodyEn: 'A smart, sustainable and food-secure Pakistan where farmers can thrive.', bodyUr: 'ایک ذہین، پائیدار اور غذائی تحفظ رکھنے والا پاکستان جہاں کسان ترقی کر سکیں۔' },
    { titleEn: 'Mission', titleUr: 'مشن', bodyEn: 'Empower farmers through collaboration, useful data, modern practices and stronger market links.', bodyUr: 'تعاون، مفید معلومات، جدید طریقوں اور منڈیوں سے مضبوط روابط کے ذریعے کسانوں کو بااختیار بنانا۔' },
  ],
  quoteEn: 'The future of agriculture must be shaped with farmers—not only for them.',
  quoteUr: 'زراعت کا مستقبل کسانوں کے ساتھ مل کر بننا چاہیے، صرف ان کے لیے نہیں۔',
};