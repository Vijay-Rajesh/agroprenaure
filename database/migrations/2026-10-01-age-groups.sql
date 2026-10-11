ALTER TABLE survey_responses
  DROP CONSTRAINT IF EXISTS survey_responses_age_check;

ALTER TABLE survey_responses
  ALTER COLUMN age TYPE text USING age::text;

ALTER TABLE survey_responses
  ADD CONSTRAINT survey_responses_age_check
  CHECK (char_length(age) BETWEEN 0 AND 40);