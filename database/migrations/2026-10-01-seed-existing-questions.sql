ALTER TABLE survey_questions
  ADD COLUMN IF NOT EXISTS help_en text NOT NULL DEFAULT '';

ALTER TABLE survey_questions
  ADD COLUMN IF NOT EXISTS help_ur text NOT NULL DEFAULT '';

ALTER TABLE survey_questions
  ADD COLUMN IF NOT EXISTS max_selections smallint CHECK (max_selections IS NULL OR max_selections BETWEEN 1 AND 30);

INSERT INTO survey_questions (prompt_en, prompt_ur, help_en, help_ur, question_type, options, max_selections, required, sort_order)
SELECT
  'What do you consider the three most serious challenges facing agriculture in Pakistan today?',
  'آپ کی رائے میں آج پاکستان کو زراعت کے شعبے میں درپیش تین سب سے سنگین چیلنجز کون سے ہیں؟',
  'Please select up to three.', 'براہ کرم زیادہ سے زیادہ تین کا انتخاب کریں۔', 'multiple_choice',
  '[{"en":"Water scarcity","ur":"پانی کی قلت"},{"en":"Climate change and extreme weather","ur":"موسمیاتی تبدیلیاں اور شدید موسمی حالات"},{"en":"High input costs","ur":"زرعی آدانوں (Inputs) کی بلند قیمتیں"},{"en":"Low agricultural productivity","ur":"زرعی پیداواری صلاحیت کی کمی"},{"en":"Poor-quality seeds and agricultural inputs","ur":"غیر معیاری بیج اور زرعی آدان"},{"en":"Pest and disease problems","ur":"کیڑے مکوڑوں اور بیماریوں کے مسائل"},{"en":"Market and price instability","ur":"مارکیٹ اور قیمتوں کا عدم استحکام"},{"en":"Limited access to modern technology","ur":"جدید ٹیکنالوجی تک محدود رسائی"},{"en":"Other","ur":"دیگر"}]'::jsonb,
  3, true, 0
WHERE NOT EXISTS (SELECT 1 FROM survey_questions WHERE prompt_en = 'What do you consider the three most serious challenges facing agriculture in Pakistan today?');

INSERT INTO survey_questions (prompt_en, prompt_ur, help_en, help_ur, question_type, options, required, sort_order)
SELECT
  'In your view, what are the major factors that could contribute to a food crisis in Pakistan?',
  'آپ کے خیال میں کون سے اہم عوامل پاکستان میں غذائی بحران کا سبب بن سکتے ہیں؟',
  'Select all that apply.', 'براہ کرم تمام متعلقہ آپشنز منتخب کریں۔', 'multiple_choice',
  '[{"en":"Low agricultural productivity","ur":"زرعی پیداوار میں کمی"},{"en":"Water scarcity","ur":"پانی کی قلت"},{"en":"Floods and flood-related damage","ur":"سیلاب اور اس سے ہونے والے نقصانات"},{"en":"Drought, extreme heat, and other weather risks","ur":"خشک سالی، شدید گرمی اور دیگر موسمی خطرات"},{"en":"Rising production costs","ur":"پیداواری لاگت میں اضافہ"},{"en":"Post-harvest losses","ur":"فصل کی کٹائی کے بعد کے نقصانات (Post-harvest losses)"},{"en":"Poor storage and transportation","ur":"ناقص ذخیرہ اندوزی (Storage) اور نقل و حمل"},{"en":"Market inefficiencies","ur":"مارکیٹ کے انتظامات کی خامیاں"},{"en":"Population growth and increasing food demand","ur":"آبادی میں اضافہ اور خوراک کی بڑھتی ہوئی مانگ"},{"en":"Other","ur":"دیگر"}]'::jsonb,
  true, 1
WHERE NOT EXISTS (SELECT 1 FROM survey_questions WHERE prompt_en = 'In your view, what are the major factors that could contribute to a food crisis in Pakistan?');

INSERT INTO survey_questions (prompt_en, prompt_ur, help_en, help_ur, question_type, options, required, sort_order)
SELECT
  'How can smart farming and modern technology help improve agriculture in Pakistan?',
  'سمارٹ فارمنگ اور جدید ٹیکنالوجی پاکستان میں زراعت کو بہتر بنانے میں کیسے مدد کر سکتی ہے؟',
  'Select all that apply.', 'براہ کرم تمام متعلقہ آپشنز منتخب کریں۔', 'multiple_choice',
  '[{"en":"Better water management","ur":"پانی کا بہتر انتظام"},{"en":"Improved crop monitoring","ur":"فصلوں کی بہتر نگرانی"},{"en":"Precision use of fertilizers and pesticides","ur":"کھادوں اور کیڑے مار ادویات کا درست اور نپا تلا استعمال"},{"en":"Weather and climate information","ur":"موسم اور آب و ہوا سے متعلق معلومات"},{"en":"Mechanization and automation","ur":"میکانائزیشن اور آٹومیشن"},{"en":"Better farm decision-making","ur":"فارم سے متعلق بہتر فیصلے"},{"en":"Early detection of pests and diseases","ur":"کیڑوں اور بیماریوں کی بروقت نشاندہی"},{"en":"Other","ur":"دیگر"}]'::jsonb,
  true, 2
WHERE NOT EXISTS (SELECT 1 FROM survey_questions WHERE prompt_en = 'How can smart farming and modern technology help improve agriculture in Pakistan?');

INSERT INTO survey_questions (prompt_en, prompt_ur, help_en, help_ur, question_type, options, max_selections, required, sort_order)
SELECT
  'Which agricultural technologies should receive greater attention and investment by 2040?',
  '2040 تک کن زرعی ٹیکنالوجیز پر زیادہ توجہ اور سرمایہ کاری کی جانی چاہیے؟',
  'Please select up to three.', 'براہ کرم زیادہ سے زیادہ تین کا انتخاب کریں۔', 'multiple_choice',
  '[{"en":"Artificial Intelligence (AI)","ur":"مصنوعی ذہانت (AI)"},{"en":"Internet of Things (IoT) and sensors","ur":"انٹرنیٹ آف تھنگز (IoT) اور سینسرز"},{"en":"Drones and remote sensing","ur":"ڈرونز اور ریموٹ سینسنگ"},{"en":"Satellite technology","ur":"سیٹلائٹ ٹیکنالوجی"},{"en":"Precision irrigation","ur":"درست آبپاشی (Precision irrigation)"},{"en":"Modern farm machinery and mechanization","ur":"جدید زرعی مشینری اور میکانائزیشن"},{"en":"Digital marketplaces and e-commerce","ur":"ڈیجیٹل مارکیٹس اور ای کامرس"},{"en":"Other","ur":"دیگر"}]'::jsonb,
  3, true, 3
WHERE NOT EXISTS (SELECT 1 FROM survey_questions WHERE prompt_en = 'Which agricultural technologies should receive greater attention and investment by 2040?');

INSERT INTO survey_questions (prompt_en, prompt_ur, help_en, help_ur, question_type, options, required, sort_order)
SELECT
  'What are the biggest barriers preventing farmers from adopting modern agricultural technologies?',
  'کسانوں کو جدید زرعی ٹیکنالوجی اپنانے سے روکنے والی سب سے بڑی رکاوٹیں کون سی ہیں؟',
  'Select all that apply.', 'براہ کرم تمام متعلقہ آپشنز منتخب کریں۔', 'multiple_choice',
  '[{"en":"High cost of technology","ur":"ٹیکنالوجی کی بلند قیمت"},{"en":"Lack of awareness and training","ur":"آگاہی اور تربیت کی کمی"},{"en":"Limited access to finance","ur":"فنانسنگ (قرضوں) تک محدود رسائی"},{"en":"Poor internet and digital connectivity","ur":"انٹرنیٹ اور ڈیجیٹل رابطے کا فقدان"},{"en":"Lack of technical support and extension services","ur":"تکنیکی معاونت اور توسیعی خدمات (Extension services) کی کمی"},{"en":"Limited availability of suitable technologies","ur":"مناسب ٹیکنالوجی کی عدم دستیابی"},{"en":"Resistance to changing traditional practices","ur":"روایتی طریقوں کو بدلنے میں ہچکچاہٹ"},{"en":"Other","ur":"دیگر"}]'::jsonb,
  true, 4
WHERE NOT EXISTS (SELECT 1 FROM survey_questions WHERE prompt_en = 'What are the biggest barriers preventing farmers from adopting modern agricultural technologies?');

INSERT INTO survey_questions (prompt_en, prompt_ur, help_en, help_ur, question_type, options, required, sort_order)
SELECT
  'What measures would most effectively reduce water wastage in agriculture?',
  'زراعت میں پانی کے ضیاع کو مؤثر طریقے سے کیسے روکا جا سکتا ہے؟',
  'Select all that apply.', 'براہ کرم تمام متعلقہ آپشنز منتخب کریں۔', 'multiple_choice',
  '[{"en":"Drip and sprinkler irrigation","ur":"ڈراپ اور سپرنکلر آبپاشی (قطرہ وار اور پھوار آبپاشی)"},{"en":"Laser land leveling","ur":"لیزر لینڈ لیولنگ (زمین کی لیزر ہمواری)"},{"en":"Smart irrigation systems","ur":"سمارٹ آبپاشی کے نظام"},{"en":"Water-efficient and drought-tolerant crops","ur":"پانی کی کم کھپت والی اور خشک سالی برداشت کرنے والی فصلیں"},{"en":"Improved canal and water distribution systems","ur":"نہری اور پانی کی تقسیم کے نظام کی بہتری"},{"en":"Better water management practices","ur":"پانی کے انتظام کے بہتر طریقے"},{"en":"Farmer training and awareness","ur":"کسانوں کی تربیت اور آگاہی"},{"en":"Other","ur":"دیگر"}]'::jsonb,
  true, 5
WHERE NOT EXISTS (SELECT 1 FROM survey_questions WHERE prompt_en = 'What measures would most effectively reduce water wastage in agriculture?');

INSERT INTO survey_questions (prompt_en, prompt_ur, help_en, help_ur, question_type, options, max_selections, required, sort_order)
SELECT
  'What should be the main priorities for improving farmers’ incomes?',
  'کسانوں کی آمدنی بڑھانے کے لیے کیا اہم ترجیحات ہونی چاہئیں؟',
  'Please select up to three.', 'براہ کرم زیادہ سے زیادہ تین کا انتخاب کریں۔', 'multiple_choice',
  '[{"en":"Higher agricultural productivity","ur":"زرعی پیداواری صلاحیت میں اضافہ"},{"en":"Lower input costs","ur":"زرعی آدانوں (Inputs) کی لاگت میں کمی"},{"en":"Better access to markets","ur":"منڈیوں (Markets) تک بہتر رسائی"},{"en":"Fair and stable farm-gate prices","ur":"فارم گیٹ پر فصل کی منصفانہ اور مستحکم قیمتیں"},{"en":"Storage and processing facilities","ur":"ذخیرہ اندوزی (Storage) اور پروسیسنگ کی سہولیات"},{"en":"Value addition and agro-processing","ur":"ویلیو ایڈیشن اور ایگرو پروسیسنگ"},{"en":"Access to affordable finance and credit","ur":"کم لاگت فنانسنگ اور کریڈٹ تک رسائی"},{"en":"Other","ur":"دیگر"}]'::jsonb,
  3, true, 6
WHERE NOT EXISTS (SELECT 1 FROM survey_questions WHERE prompt_en = 'What should be the main priorities for improving farmers’ incomes?');

INSERT INTO survey_questions (prompt_en, prompt_ur, help_en, help_ur, question_type, options, required, sort_order)
SELECT
  'What measures can help reduce post-harvest losses of agricultural produce in Pakistan?',
  'پاکستان میں زرعی پیداوار کے ضیاع (Post-harvest losses) کو کم کرنے میں کون سے اقدامات مددگار ثابت ہو سکتے ہیں؟',
  'Select all that apply.', 'براہ کرم تمام متعلقہ آپشنز منتخب کریں۔', 'multiple_choice',
  '[{"en":"Better storage facilities","ur":"ذخیرہ کرنے کی بہتر سہولیات"},{"en":"Cold storage facilities","ur":"کولڈ اسٹوریج کی سہولیات"},{"en":"Improved packaging","ur":"بہتر پیکیجنگ"},{"en":"Food processing and preservation","ur":"فوڈ پروسیسنگ اور تحفظ (Preservation)"},{"en":"Better harvesting and handling practices","ur":"کٹائی اور سنبھالنے (Handling) کے بہتر طریقے"},{"en":"Improved grading and sorting","ur":"درجہ بندی (Grading) اور چھانٹی کے نظام میں بہتری"},{"en":"Other","ur":"دیگر"}]'::jsonb,
  true, 7
WHERE NOT EXISTS (SELECT 1 FROM survey_questions WHERE prompt_en = 'What measures can help reduce post-harvest losses of agricultural produce in Pakistan?');

INSERT INTO survey_questions (prompt_en, prompt_ur, help_en, help_ur, question_type, options, required, sort_order)
SELECT
  'What measures can help improve the efficiency of Pakistan’s food supply chain?',
  'پاکستان کی غذائی سپلائی چین کی کارکردگی کو بہتر بنانے کے لیے کیا اقدامات کیے جانے چاہئیں؟',
  'Select all that apply.', 'براہ کرم تمام متعلقہ آپشنز منتخب کریں۔', 'multiple_choice',
  '[{"en":"Improved transportation infrastructure","ur":"نقل و حمل (ٹرانسپورٹیشن) کے بنیادی ڈھانچے کی بہتری"},{"en":"Cold-chain infrastructure","ur":"کولڈ چین کا بنیادی ڈھانچہ"},{"en":"Digital market linkages","ur":"ڈیجیٹل مارکیٹ روابط"},{"en":"Better coordination among farmers, traders, processors, and retailers","ur":"کسانوں، تاجروں، پروسیسرز اور خوردہ فروشوں کے درمیان بہتر تال میل"},{"en":"Improved market information systems","ur":"مارکیٹ کی معلومات کے بہتر نظام"},{"en":"Faster and more reliable distribution","ur":"تیز رفتار اور قابل اعتماد ترسیل"},{"en":"Improved food quality and safety standards","ur":"خوراک کے معیار اور حفاظت کے بہتر معیارات"},{"en":"Other","ur":"دیگر"}]'::jsonb,
  true, 8
WHERE NOT EXISTS (SELECT 1 FROM survey_questions WHERE prompt_en = 'What measures can help improve the efficiency of Pakistan’s food supply chain?');

INSERT INTO survey_questions (prompt_en, prompt_ur, help_en, help_ur, question_type, options, required, sort_order)
SELECT
  'What measures would help farmers better cope with climate change, floods, droughts, and other agricultural risks?',
  'کسانوں کو موسمیاتی تبدیلیوں، سیلاب، خشک سالی اور دیگر زرعی خطرات کا بہتر مقابلہ کرنے میں کون سے اقدامات مدد دیں گے؟',
  'Select all that apply.', 'براہ کرم تمام متعلقہ آپشنز منتخب کریں۔', 'multiple_choice',
  '[{"en":"Climate-resilient and flood-tolerant crops","ur":"موسمیاتی تبدیلیوں اور سیلاب کو برداشت کرنے والی فصلیں"},{"en":"Crop and livestock insurance","ur":"فصل اور لائیو اسٹاک کی انشورنس"},{"en":"Access to emergency agricultural finance","ur":"ہنگامی زرعی فنانسنگ تک رسائی"},{"en":"Early warning systems for floods, droughts, and extreme weather","ur":"سیلاب، خشک سالی اور شدید موسم کے لیے ارلی وارننگ سسٹمز"},{"en":"Climate-smart farming practices","ur":"موسمیاتی لحاظ سے موزوں فارمنگ کے طریقے"},{"en":"Improved drainage and flood-protection infrastructure","ur":"نکاسی آب اور سیلاب سے بچاؤ کے بہتر بنیادی ڈھانچے"},{"en":"Farmer training and awareness","ur":"کسانوں کی تربیت اور آگاہی"},{"en":"Diversification of crops and farm income","ur":"فصلوں اور فارم کی آمدنی میں تنوع (Diversification)"},{"en":"Other","ur":"دیگر"}]'::jsonb,
  true, 9
WHERE NOT EXISTS (SELECT 1 FROM survey_questions WHERE prompt_en = 'What measures would help farmers better cope with climate change, floods, droughts, and other agricultural risks?');

INSERT INTO survey_questions (prompt_en, prompt_ur, help_en, help_ur, question_type, options, required, sort_order)
SELECT
  'What role should government, universities, the private sector, and farmers play in transforming agriculture by 2040?',
  '2040 تک زراعت کو تبدیل کرنے میں حکومت، یونیورسٹیوں، نجی شعبے اور کسانوں کو کیا کردار ادا کرنا چاہیے؟',
  'Select the most important areas.', 'براہ کرم انتہائی اہم شعبوں کا انتخاب کریں۔', 'multiple_choice',
  '[{"en":"Agricultural research and innovation","ur":"زرعی تحقیق اور جدت طرازی (Innovation)"},{"en":"Farmer training and capacity building","ur":"کسانوں کی تربیت اور صلاحیت سازی"},{"en":"Technology development and adoption","ur":"ٹیکنالوجی کی ترقی اور اس کا فروغ"},{"en":"Financing and investment","ur":"فنانسنگ اور سرمایہ کاری"},{"en":"Agricultural extension services","ur":"زرعی توسیعی خدمات (Agricultural extension services)"},{"en":"Market development and access","ur":"مارکیٹ کی ترقی اور رسائی"},{"en":"Policy and regulation","ur":"پالیسی اور ریگولیشن"},{"en":"Climate adaptation and disaster resilience","ur":"موسمیاتی موافقت اور آفات سے نمٹنے کی صلاحیت"},{"en":"Other","ur":"دیگر"}]'::jsonb,
  true, 10
WHERE NOT EXISTS (SELECT 1 FROM survey_questions WHERE prompt_en = 'What role should government, universities, the private sector, and farmers play in transforming agriculture by 2040?');

INSERT INTO survey_questions (prompt_en, prompt_ur, help_en, help_ur, question_type, options, required, sort_order)
SELECT
  'In one sentence, what is the most important measure needed to secure the future of agriculture and food security in Pakistan from now through 2040?',
  'ایک جملے میں بتائیں کہ اب سے لے کر 2040 تک پاکستان میں زراعت اور غذائی تحفظ کے مستقبل کو محفوظ بنانے کے لیے سب سے اہم اقدام کون سا ہے؟',
  '', '', 'long_text', '[]'::jsonb, true, 11
WHERE NOT EXISTS (SELECT 1 FROM survey_questions WHERE prompt_en = 'In one sentence, what is the most important measure needed to secure the future of agriculture and food security in Pakistan from now through 2040?');