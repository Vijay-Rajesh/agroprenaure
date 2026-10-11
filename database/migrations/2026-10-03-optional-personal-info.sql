ALTER TABLE survey_responses
  DROP CONSTRAINT IF EXISTS survey_responses_age_check;

ALTER TABLE survey_responses
  ADD CONSTRAINT survey_responses_age_check
  CHECK (char_length(age) BETWEEN 0 AND 40);

ALTER TABLE survey_responses
  DROP CONSTRAINT IF EXISTS survey_responses_province_check;

ALTER TABLE survey_responses
  ADD CONSTRAINT survey_responses_province_check
  CHECK (char_length(province) BETWEEN 0 AND 80);
