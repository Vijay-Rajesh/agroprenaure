CREATE TABLE IF NOT EXISTS newspaper_gallery (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title_en text NOT NULL CHECK (char_length(title_en) BETWEEN 1 AND 180),
  title_ur text NOT NULL DEFAULT '',
  mime_type text NOT NULL CHECK (mime_type IN ('image/jpeg', 'image/png', 'image/webp')),
  image_data bytea NOT NULL,
  is_published boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0 CHECK (sort_order >= 0),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS newspaper_gallery_published_order_idx
  ON newspaper_gallery (is_published, sort_order, created_at);
