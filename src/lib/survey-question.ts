export const surveyQuestionTypes = [
  'short_text',
  'long_text',
  'number',
  'email',
  'date',
  'yes_no',
  'rating',
  'single_choice',
  'multiple_choice',
  'dropdown',
] as const;

export type SurveyQuestionType = (typeof surveyQuestionTypes)[number];

export type SurveyQuestionChoice = {
  en: string;
  ur: string;
};

export type PublicSurveyQuestion = {
  id: string;
  fieldKey: string | null;
  promptEn: string;
  promptUr: string;
  helpEn: string;
  helpUr: string;
  type: SurveyQuestionType;
  options: SurveyQuestionChoice[];
  maxSelections: number | null;
  required: boolean;
  sortOrder: number;
  stepNumber: number;
};

export type AdminSurveyQuestion = {
  id: string;
  field_key: string | null;
  prompt_en: string;
  prompt_ur: string;
  help_en: string;
  help_ur: string;
  question_type: SurveyQuestionType;
  options: SurveyQuestionChoice[];
  max_selections: number | null;
  required: boolean;
  sort_order: number;
  step_number: number;
  is_active: boolean;
};

export function questionUsesChoices(type: SurveyQuestionType) {
  return type === 'single_choice' || type === 'multiple_choice' || type === 'dropdown';
}