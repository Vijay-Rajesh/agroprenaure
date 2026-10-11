ALTER TABLE survey_questions
  ADD COLUMN IF NOT EXISTS field_key text;

CREATE UNIQUE INDEX IF NOT EXISTS survey_questions_field_key_idx
  ON survey_questions (field_key);

INSERT INTO survey_questions
  (field_key, prompt_en, prompt_ur, question_type, options, required, sort_order, step_number)
VALUES
  ('fullName', 'Name', 'نام', 'short_text', '[]'::jsonb, TRUE, -100, 1),
  ('contact', 'Contact number', 'رابطہ نمبر', 'short_text', '[]'::jsonb, TRUE, -99, 1),
  ('district', 'City / village', 'شہر / گاؤں', 'short_text', '[]'::jsonb, TRUE, -98, 1),
  ('email', 'Email address', 'ای میل آئی ڈی', 'email', '[]'::jsonb, TRUE, -97, 1),
  ('province', 'Province', 'صوبہ', 'dropdown', '[{"en":"Sindh","ur":"سندھ"},{"en":"Punjab","ur":"پنجاب"},{"en":"Khyber Pakhtunkhwa","ur":"خیبر پختونخوا"},{"en":"Baluchistan","ur":"بلوچستان"},{"en":"Gilgit-Baltistan","ur":"گلگت بلتستان"},{"en":"Azad Jammu & Kashmir","ur":"آزاد جموں و کشمیر"},{"en":"Islamabad Capital Territory","ur":"اسلام آباد کیپیٹل ٹریٹری"}]'::jsonb, FALSE, -96, 1),
  ('age', 'Age', 'عمر', 'dropdown', '[{"en":"Under 20","ur":"20 سال سے کم"},{"en":"21–44","ur":"21 تا 44 سال"},{"en":"45–60","ur":"45 تا 60 سال"},{"en":"65 or above","ur":"65 سال یا اس سے زیادہ"}]'::jsonb, FALSE, -95, 1),
  ('category', 'Category', 'شعبہ', 'dropdown', '[{"en":"Student","ur":"طالب علم"},{"en":"Teacher/Academic","ur":"استاد / ماہر تعلیم"},{"en":"Farmer","ur":"کسان / کاشتکار"},{"en":"Agribusiness/Industry","ur":"ایگری بزنس / صنعت"},{"en":"Researcher","ur":"محقق / ریسرچر"},{"en":"Government Employee","ur":"سرکاری ملازم"},{"en":"Other","ur":"دیگر"}]'::jsonb, FALSE, -94, 1),
  ('categoryOther', 'Please specify your category', 'اپنے شعبے کی وضاحت کریں', 'short_text', '[]'::jsonb, FALSE, -93, 1),
  ('gender', 'Gender', 'جنس', 'dropdown', '[{"en":"Male","ur":"مرد"},{"en":"Female","ur":"عورت"}]'::jsonb, FALSE, -92, 1),
  ('education', 'Education', 'تعلیم', 'dropdown', '[{"en":"No formal education","ur":"کوئی باضابطہ تعلیم نہیں"},{"en":"Matric","ur":"میٹرک"},{"en":"Intermediate","ur":"انٹرمیڈیٹ"},{"en":"Bachelor’s degree","ur":"بیچلر ڈگری"},{"en":"Master’s or above","ur":"ماسٹرز یا اس سے زیادہ"},{"en":"Religious/other education","ur":"دینی / دیگر تعلیم"}]'::jsonb, FALSE, -91, 1),
  ('occupation', 'Main occupation', 'بنیادی پیشہ', 'dropdown', '[{"en":"Farming","ur":"زراعت / کاشتکاری"},{"en":"Livestock","ur":"لائیو اسٹاک (مال مویشی)"},{"en":"Agricultural labor","ur":"زرعی مزدور"},{"en":"Business","ur":"کاروبار"},{"en":"Other","ur":"دیگر"}]'::jsonb, FALSE, -90, 1),
  ('occupationOther', 'Please specify your occupation', 'اپنے پیشے کی وضاحت کریں', 'short_text', '[]'::jsonb, FALSE, -89, 1),
  ('areaType', 'Type of area', 'علاقے کی قسم', 'dropdown', '[{"en":"Rural","ur":"دیہی"},{"en":"Peri-urban","ur":"نیم شہری"},{"en":"Other","ur":"دیگر"}]'::jsonb, FALSE, -88, 1),
  ('experience', 'How long have you been involved in the agriculture industry?', 'آپ کتنے عرصے سے زرعی شعبے سے وابستہ ہیں؟', 'dropdown', '[{"en":"Less than 5 years","ur":"5 سال سے کم"},{"en":"5–10 years","ur":"5 تا 10 سال"},{"en":"11–20 years","ur":"11 تا 20 سال"},{"en":"21–30 years","ur":"21 تا 30 سال"},{"en":"More than 30 years","ur":"30 سال سے زیادہ"}]'::jsonb, TRUE, -87, 2),
  ('landSize', 'Total agricultural land operated by you', 'آپ کے زیرِ استعمال کل زرعی زمین', 'dropdown', '[{"en":"Less than 02 acres","ur":"02 ایکڑ سے کم"},{"en":"02–05 acres","ur":"02 تا 05 ایکڑ"},{"en":"05–15 acres","ur":"05 تا 15 ایکڑ"},{"en":"15–50 acres","ur":"15 تا 50 ایکڑ"},{"en":"More than 50 acres","ur":"50 ایکڑ سے زیادہ"}]'::jsonb, TRUE, -86, 2),
  ('irrigation', 'Main source of irrigation', 'آبپاشی کا بنیادی ذریعہ', 'dropdown', '[{"en":"Canal","ur":"نہر"},{"en":"Tubewell","ur":"ٹیوب ویل"},{"en":"Dug well","ur":"کنواں"},{"en":"Rainfed","ur":"بارانی"},{"en":"River/stream","ur":"دریا / ندی"},{"en":"Watercourse","ur":"کھال / واٹر کورس"},{"en":"Combination","ur":"ملا جلا"},{"en":"Other","ur":"دیگر"}]'::jsonb, TRUE, -85, 2),
  ('irrigationOther', 'Please specify your irrigation source', 'اپنے آبپاشی کے ذریعے کی وضاحت کریں', 'short_text', '[]'::jsonb, TRUE, -84, 2),
  ('crops', 'Main crops grown', 'پیدا کی جانے والی اہم فصلیں', 'multiple_choice', '[{"en":"Wheat","ur":"گندم"},{"en":"Rice","ur":"چاول"},{"en":"Maize","ur":"مکئی"},{"en":"Cotton","ur":"کپاس"},{"en":"Sugarcane","ur":"گنا"},{"en":"Pulses","ur":"دالیں"},{"en":"Oilseeds","ur":"تیل دار اجناس"},{"en":"Vegetables","ur":"سبزیاں"},{"en":"Fruits","ur":"پھل"},{"en":"Fodder","ur":"چارہ"},{"en":"Other","ur":"دیگر"}]'::jsonb, TRUE, -83, 2),
  ('cropsOther', 'Please specify another crop', 'کسی دوسری فصل کی وضاحت کریں', 'short_text', '[]'::jsonb, TRUE, -82, 2),
  ('keepsLivestock', 'Do you keep livestock?', 'کیا آپ لائیو اسٹاک (مال مویشی) پالتے ہیں؟', 'yes_no', '[]'::jsonb, TRUE, -81, 2),
  ('livestock', 'If yes, main livestock', 'اگر ہاں، تو کون سے اہم جانور پالتے ہیں؟', 'multiple_choice', '[{"en":"Cattle","ur":"گائے / بیل"},{"en":"Buffalo","ur":"بھینس"},{"en":"Sheep","ur":"بھیڑ"},{"en":"Goats","ur":"بکریاں"},{"en":"Poultry","ur":"مرغیاں / پولٹری"},{"en":"Other","ur":"دیگر"}]'::jsonb, FALSE, -80, 2),
  ('livestockOther', 'Please specify other livestock', 'دیگر جانوروں کی وضاحت کریں', 'short_text', '[]'::jsonb, TRUE, -79, 2)
ON CONFLICT (field_key) DO NOTHING;
