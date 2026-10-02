ALTER TABLE survey_questions
  ADD COLUMN IF NOT EXISTS step_number smallint;

UPDATE survey_questions
SET step_number = CASE
  WHEN sort_order < 4 THEN 3
  WHEN sort_order < 8 THEN 4
  ELSE 5
END
WHERE step_number IS NULL;

ALTER TABLE survey_questions
  ALTER COLUMN step_number SET DEFAULT 3;

ALTER TABLE survey_questions
  ALTER COLUMN step_number SET NOT NULL;