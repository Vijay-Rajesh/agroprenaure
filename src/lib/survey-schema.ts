import { z } from 'zod';
import { surveyOptions, surveyQuestions } from '@/lib/survey-form';

const values = (options: readonly { en: string }[]) => options.map(({ en }) => en);
const questionValues = (key: string) => values(surveyQuestions.find((question) => question.key === key)?.options ?? []);
const selectionSchema = (key: string, max?: number, required = true) => {
  const optionValues = questionValues(key);
  const schema = z.array(z.string()).max(max ?? optionValues.length);
  return (required ? schema.min(1) : schema).default([])
    .refine((selected) => selected.every((value) => optionValues.includes(value)));
};

export const surveyAnswersSchema = z.object({
  fullName: z.string().trim().min(1).max(160),
  age: z.string().refine((value) => values(surveyOptions.age).includes(value)),
  gender: z.string().refine((value) => values(surveyOptions.gender).includes(value)),
  province: z.string().refine((value) => values(surveyOptions.province).includes(value)),
  district: z.string().trim().min(1).max(160),
  contact: z.string().trim().min(1).max(40),
  email: z.string().trim().email().max(254),
  category: z.string().refine((value) => values(surveyOptions.category).includes(value)),
  categoryOther: z.string().max(300),
  education: z.string().refine((value) => values(surveyOptions.education).includes(value)),
  occupation: z.string().refine((value) => values(surveyOptions.occupation).includes(value)),
  occupationOther: z.string().max(300),
  areaType: z.string().refine((value) => values(surveyOptions.areaType).includes(value)),
  experience: z.string().refine((value) => values(surveyOptions.experience).includes(value)),
  landSize: z.string().refine((value) => values(surveyOptions.landSize).includes(value)),
  irrigation: z.string().refine((value) => values(surveyOptions.irrigation).includes(value)),
  irrigationOther: z.string().max(300),
  crops: z.array(z.string()).min(1).max(surveyOptions.crops.length).refine((selected) => selected.every((value) => values(surveyOptions.crops).includes(value))),
  cropsOther: z.string().max(300),
  keepsLivestock: z.string().refine((value) => values(surveyOptions.yesNo).includes(value)),
  livestock: z.array(z.string()).max(surveyOptions.livestock.length).refine((selected) => selected.every((value) => values(surveyOptions.livestock).includes(value))),
  livestockOther: z.string().max(300),
  q1: selectionSchema('q1', 3, false),
  q1Other: z.string().max(1000),
  q2: selectionSchema('q2', undefined, false),
  q2Other: z.string().max(1000),
  q3: selectionSchema('q3', undefined, false),
  q3Other: z.string().max(1000),
  q4: selectionSchema('q4', 3, false),
  q4Other: z.string().max(1000),
  q5: selectionSchema('q5', undefined, false),
  q5Other: z.string().max(1000),
  q6: selectionSchema('q6', undefined, false),
  q6Other: z.string().max(1000),
  q7: selectionSchema('q7', 3, false),
  q7Other: z.string().max(1000),
  q8: selectionSchema('q8', undefined, false),
  q8Other: z.string().max(1000),
  q9: selectionSchema('q9', undefined, false),
  q9Other: z.string().max(1000),
  q10: selectionSchema('q10', undefined, false),
  q10Other: z.string().max(1000),
  q11: selectionSchema('q11', undefined, false),
  q11Other: z.string().max(1000),
  q12: z.string().trim().max(5000).default(''),
  customAnswers: z.record(z.string(), z.unknown()),
  consent: z.boolean().refine((value) => value, 'Consent is required.'),
}).strict().superRefine((answers, context) => {
  if (answers.category === 'Other' && !answers.categoryOther.trim()) {
    context.addIssue({ code: 'custom', path: ['categoryOther'], message: 'Please specify your category.' });
  }
  if (answers.occupation === 'Other' && !answers.occupationOther.trim()) {
    context.addIssue({ code: 'custom', path: ['occupationOther'], message: 'Please specify your occupation.' });
  }
  if (answers.irrigation === 'Other' && !answers.irrigationOther.trim()) {
    context.addIssue({ code: 'custom', path: ['irrigationOther'], message: 'Please specify your irrigation source.' });
  }
  if (answers.crops.includes('Other') && !answers.cropsOther.trim()) {
    context.addIssue({ code: 'custom', path: ['cropsOther'], message: 'Please specify another crop.' });
  }
  if (answers.keepsLivestock === 'Yes' && answers.livestock.length === 0) {
    context.addIssue({ code: 'custom', path: ['livestock'], message: 'Please select your livestock.' });
  }
  if (answers.livestock.includes('Other') && !answers.livestockOther.trim()) {
    context.addIssue({ code: 'custom', path: ['livestockOther'], message: 'Please specify other livestock.' });
  }
  surveyQuestions.forEach(({ key }) => {
    const selected = answers[key as keyof typeof answers];
    if (Array.isArray(selected) && selected.includes('Other') && !answers[`${key}Other` as keyof typeof answers]) {
      context.addIssue({ code: 'custom', path: [`${key}Other`], message: 'Please specify your other response.' });
    }
  });
});

export type SurveyAnswers = z.infer<typeof surveyAnswersSchema>;

export const initialSurveyAnswers: SurveyAnswers = {
  fullName: '',
  age: '',
  gender: '',
  province: '',
  district: '',
  contact: '',
  email: '',
  category: '',
  categoryOther: '',
  education: '',
  occupation: '',
  occupationOther: '',
  areaType: '',
  experience: '',
  landSize: '',
  irrigation: '',
  irrigationOther: '',
  crops: [],
  cropsOther: '',
  keepsLivestock: '',
  livestock: [],
  livestockOther: '',
  q1: [], q1Other: '',
  q2: [], q2Other: '',
  q3: [], q3Other: '',
  q4: [], q4Other: '',
  q5: [], q5Other: '',
  q6: [], q6Other: '',
  q7: [], q7Other: '',
  q8: [], q8Other: '',
  q9: [], q9Other: '',
  q10: [], q10Other: '',
  q11: [], q11Other: '',
  q12: '',
  customAnswers: {},
  consent: false,
};
