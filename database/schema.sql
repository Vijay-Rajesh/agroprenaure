CREATE TABLE IF NOT EXISTS survey_responses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL CHECK (char_length(full_name) BETWEEN 1 AND 160),
  age text NOT NULL CHECK (char_length(age) BETWEEN 1 AND 40),
  province text NOT NULL CHECK (char_length(province) BETWEEN 1 AND 80),
  district text NOT NULL CHECK (char_length(district) BETWEEN 1 AND 160),
  consent boolean NOT NULL CHECK (consent IS TRUE),
  answers jsonb NOT NULL CHECK (jsonb_typeof(answers) = 'object'),
  submitted_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS survey_responses_submitted_at_idx
  ON survey_responses (submitted_at DESC);

CREATE INDEX IF NOT EXISTS survey_responses_province_idx
  ON survey_responses (province);

CREATE TABLE IF NOT EXISTS survey_questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  prompt_en text NOT NULL CHECK (char_length(prompt_en) BETWEEN 1 AND 500),
  prompt_ur text NOT NULL CHECK (char_length(prompt_ur) BETWEEN 1 AND 500),
  question_type text NOT NULL CHECK (question_type IN (
    'short_text', 'long_text', 'number', 'email', 'date', 'yes_no',
    'rating', 'single_choice', 'multiple_choice', 'dropdown'
  )),
  help_en text NOT NULL DEFAULT '',
  help_ur text NOT NULL DEFAULT '',
  options jsonb NOT NULL DEFAULT '[]'::jsonb CHECK (jsonb_typeof(options) = 'array'),
  max_selections smallint CHECK (max_selections IS NULL OR max_selections BETWEEN 1 AND 30),
  required boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  step_number smallint NOT NULL DEFAULT 3 CHECK (step_number BETWEEN 1 AND 6),
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS survey_questions_active_order_idx
  ON survey_questions (is_active, sort_order, created_at);

CREATE TABLE IF NOT EXISTS site_pages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  path text NOT NULL UNIQUE CHECK (char_length(path) BETWEEN 2 AND 240),
  group_key text NOT NULL DEFAULT 'pages',
  group_label_en text NOT NULL DEFAULT 'PAGES',
  group_label_ur text NOT NULL DEFAULT 'صفحات',
  group_description_en text NOT NULL DEFAULT '',
  group_description_ur text NOT NULL DEFAULT '',
  title_en text NOT NULL CHECK (char_length(title_en) BETWEEN 1 AND 180),
  title_ur text NOT NULL DEFAULT '',
  intro_en text NOT NULL DEFAULT '',
  intro_ur text NOT NULL DEFAULT '',
  section_title_en text NOT NULL DEFAULT '',
  section_title_ur text NOT NULL DEFAULT '',
  body_en text NOT NULL DEFAULT '',
  body_ur text NOT NULL DEFAULT '',
  focus_en jsonb NOT NULL DEFAULT '[]'::jsonb CHECK (jsonb_typeof(focus_en) = 'array'),
  focus_ur jsonb NOT NULL DEFAULT '[]'::jsonb CHECK (jsonb_typeof(focus_ur) = 'array'),
  directory jsonb NOT NULL DEFAULT '[]'::jsonb CHECK (jsonb_typeof(directory) = 'array'),
  hero_image_url text NOT NULL DEFAULT '',
  is_published boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS site_pages_published_order_idx
  ON site_pages (is_published, group_key, sort_order);

CREATE TABLE IF NOT EXISTS site_navigation_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  section_key text NOT NULL DEFAULT 'main',
  section_label_en text NOT NULL DEFAULT '',
  section_label_ur text NOT NULL DEFAULT '',
  label_en text NOT NULL CHECK (char_length(label_en) BETWEEN 1 AND 120),
  label_ur text NOT NULL DEFAULT '',
  href text NOT NULL CHECK (char_length(href) BETWEEN 1 AND 300),
  sort_order integer NOT NULL DEFAULT 0,
  is_visible boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (section_key, href)
);

CREATE INDEX IF NOT EXISTS site_navigation_visible_order_idx
  ON site_navigation_items (is_visible, section_key, sort_order);

CREATE TABLE IF NOT EXISTS site_settings (
  key text PRIMARY KEY,
  value jsonb NOT NULL DEFAULT '{}'::jsonb CHECK (jsonb_typeof(value) = 'object'),
  updated_at timestamptz NOT NULL DEFAULT now()
);
