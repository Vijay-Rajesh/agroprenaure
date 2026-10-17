'use client';

import { startTransition, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  Check,
  Cpu,
  Database,
  GraduationCap,
  Landmark,
  Lightbulb,
  MessagesSquare,
  Network,
  PackageOpen,
  ScanSearch,
  ShieldCheck,
  Sprout,
  Store,
  Tractor,
  UsersRound,
  ChartNoAxesCombined,
} from 'lucide-react';
import SiteFooter from '@/components/site-footer';
import SiteHeader from '@/components/site-header';
import { useSiteData } from '@/components/site-data-provider';
import { useSiteLanguage } from '@/components/language-provider';
import { surveyLabels, surveyOptions, surveySteps, type SurveyOption } from '@/lib/survey-form';
import { initialSurveyAnswers, type SurveyAnswers } from '@/lib/survey-schema';
import { questionUsesChoices, type PublicSurveyQuestion } from '@/lib/survey-question';
import { translateSiteText } from '@/lib/site-translations';
import { defaultHomeHero, type HomeHeroSettings } from '@/lib/site-settings';

const storageKey = 'vision-2040-survey-v2';

const impactIconMap = [
  Sprout,
  Network,
  PackageOpen,
  ChartNoAxesCombined,
  MessagesSquare,
  ScanSearch,
  GraduationCap,
  Cpu,
  Store,
  UsersRound,
  Lightbulb,
  Database,
  Landmark,
  Activity,
];

type TextFieldProps = {
  label: SurveyOption;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  optional?: boolean;
  maxLength?: number;
  isUrdu: boolean;
};

function BilingualText({ value, isUrdu }: { value: SurveyOption; isUrdu: boolean }) {
  return (
    <span className="bilingual-copy">
      <span lang={isUrdu ? 'ur' : 'en'} dir={isUrdu ? 'rtl' : 'ltr'}>{isUrdu ? value.ur : value.en}</span>
      <small lang={isUrdu ? 'en' : 'ur'} dir={isUrdu ? 'ltr' : 'rtl'}>{isUrdu ? value.en : value.ur}</small>
    </span>
  );
}

function TextField({ label, value, onChange, type = 'text', optional, maxLength, isUrdu }: TextFieldProps) {
  return (
    <label className="field-label">
      <span className="field-title"><BilingualText value={label} isUrdu={isUrdu} />{optional ? ` (${isUrdu ? surveyLabels.optional.ur : surveyLabels.optional.en})` : ' *'}</span>
      <input className="form-control" type={type} value={value} onChange={(event) => onChange(event.target.value)} required={!optional} maxLength={maxLength} />
    </label>
  );
}

type SelectFieldProps = {
  label: SurveyOption;
  value: string;
  options: readonly SurveyOption[];
  onChange: (value: string) => void;
  isUrdu: boolean;
  required?: boolean;
};

function SelectField({ label, value, options, onChange, isUrdu, required = true }: SelectFieldProps) {
  return (
    <label className="field-label">
      <span className="field-title"><BilingualText value={label} isUrdu={isUrdu} />{required ? ' *' : ` (${isUrdu ? surveyLabels.optional.ur : surveyLabels.optional.en})`}</span>
      <select className="form-control" value={value} onChange={(event) => onChange(event.target.value)} required={required}>
        <option value="">{isUrdu ? `${surveyLabels.select.ur} / ${surveyLabels.select.en}` : `${surveyLabels.select.en} / ${surveyLabels.select.ur}`}</option>
        {options.map((option) => <option key={option.en} value={option.en}>{isUrdu ? `${option.ur} / ${option.en}` : `${option.en} / ${option.ur}`}</option>)}
      </select>
    </label>
  );
}

type ChoiceGridProps = {
  options: readonly SurveyOption[];
  selected: string[];
  onToggle: (option: string) => void;
  isUrdu: boolean;
  maxSelections?: number;
};

function ChoiceGrid({ options, selected, onToggle, isUrdu, maxSelections }: ChoiceGridProps) {
  return (
    <div className="choice-grid">
      {options.map((option) => (
        <label className="choice-card" key={option.en}>
          <input type="checkbox" checked={selected.includes(option.en)} disabled={Boolean(maxSelections && selected.length >= maxSelections && !selected.includes(option.en))} onChange={() => onToggle(option.en)} />
          <BilingualText value={option} isUrdu={isUrdu} />
          <Check aria-hidden="true" size={16} className="choice-check" />
        </label>
      ))}
    </div>
  );
}

type RadioGridProps = {
  name: string;
  options: readonly SurveyOption[];
  selected: string;
  onSelect: (option: string) => void;
  isUrdu: boolean;
  columns?: string;
};

function RadioGrid({ name, options, selected, onSelect, isUrdu, columns = '' }: RadioGridProps) {
  return (
    <div className={`choice-grid ${columns}`}>
      {options.map((option) => (
        <label className="choice-card" key={option.en}>
          <input type="radio" name={name} checked={selected === option.en} onChange={() => onSelect(option.en)} />
          <BilingualText value={option} isUrdu={isUrdu} />
          <span aria-hidden="true" className="radio-dot" />
        </label>
      ))}
    </div>
  );
}

export default function SurveyExperience({ formOnly = false }: { formOnly?: boolean }) {
  const [answers, setAnswers] = useState<SurveyAnswers>(initialSurveyAnswers);
  const [step, setStep] = useState(0);
  const { isUrdu } = useSiteLanguage();
  const text = (value: string) => translateSiteText(value, isUrdu);
  const [isReady, setIsReady] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [managedQuestions, setManagedQuestions] = useState<PublicSurveyQuestion[]>([]);
  const site = useSiteData();
  const homeHero: HomeHeroSettings = site?.home ?? defaultHomeHero;

  useEffect(() => {
    let savedState: { answers?: Partial<SurveyAnswers>; step?: number; submitted?: boolean } | null = null;
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        savedState = JSON.parse(saved) as { answers?: Partial<SurveyAnswers>; step?: number; submitted?: boolean };
      }
    } catch {
      localStorage.removeItem(storageKey);
    }
    startTransition(() => {
      if (savedState) {
        setAnswers({ ...initialSurveyAnswers, ...savedState.answers });
        setStep(Math.min(surveySteps.length - 1, Math.max(0, savedState.step ?? 0)));
        setIsSubmitted(Boolean(savedState.submitted));
      }
      setIsReady(true);
    });
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    fetch('/api/survey/questions', { cache: 'no-store', signal: controller.signal })
      .then(async (response) => {
        const result = await response.json() as { questions?: PublicSurveyQuestion[] };
        if (!response.ok) return;
        const questions = result.questions ?? [];
        setManagedQuestions(questions);
        setStep((currentStep) => Math.min(currentStep, surveySteps.length - 1));
        setAnswers((current) => {
          const legacyAnswers = current as unknown as Record<string, unknown>;
          const customAnswers = Object.fromEntries(questions.flatMap((question) => {
            const legacyKey = question.sortOrder < 12 ? `q${question.sortOrder + 1}` : '';
            const existingAnswer = current.customAnswers[question.id];
            const legacyAnswer = legacyKey ? legacyAnswers[legacyKey] : undefined;
            const defaultAnswer = question.type === 'multiple_choice' ? [] : '';
            const questionAnswer = existingAnswer ?? legacyAnswer ?? defaultAnswer;
            const otherAnswer = current.customAnswers[`${question.id}_other`] ?? (legacyKey ? legacyAnswers[`${legacyKey}Other`] : undefined);
            return otherAnswer === undefined
              ? [[question.id, questionAnswer]]
              : [[question.id, questionAnswer], [`${question.id}_other`, otherAnswer]];
          }));
          return {
            ...current,
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
            customAnswers,
          };
        });
      })
      .catch(() => undefined);
    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (isReady) {
      localStorage.setItem(storageKey, JSON.stringify({ answers, step, submitted: isSubmitted }));
    }
  }, [answers, step, isReady, isSubmitted]);

  function update<K extends keyof SurveyAnswers>(key: K, value: SurveyAnswers[K]) {
    setSubmissionError(null);
    setAnswers((current) => ({ ...current, [key]: value }));
  }

  function toggleChoice(key: 'crops' | 'livestock', option: string) {
    const current = answers[key];
    if (!Array.isArray(current)) return;
    const value = current.includes(option) ? current.filter((item) => item !== option) : [...current, option];
    setAnswers((currentAnswers) => ({ ...currentAnswers, [key]: value }));
  }

  function updateManagedAnswer(id: string, value: unknown) {
    setSubmissionError(null);
    setAnswers((current) => ({
      ...current,
      customAnswers: { ...current.customAnswers, [id]: value },
    }));
  }

  function toggleManagedChoice(id: string, option: string, maxSelections: number | null) {
    const selected = answers.customAnswers[id];
    if (!Array.isArray(selected)) return;
    if (maxSelections && selected.length >= maxSelections && !selected.includes(option)) return;
    updateManagedAnswer(id, selected.includes(option) ? selected.filter((item) => item !== option) : [...selected, option]);
  }

  function translate(option: SurveyOption) {
    return isUrdu ? option.ur : option.en;
  }

  function profileQuestion(fieldKey: string) {
    return managedQuestions.find((question) => question.fieldKey === fieldKey);
  }

  function profileLabel(fieldKey: string, fallback: SurveyOption): SurveyOption {
    const question = profileQuestion(fieldKey);
    return question ? { en: question.promptEn, ur: question.promptUr } : fallback;
  }

  function profileOptions(fieldKey: string, fallback: readonly SurveyOption[]): readonly SurveyOption[] {
    const question = profileQuestion(fieldKey);
    return question?.options.length ? question.options : fallback;
  }

  function profileRequired(fieldKey: string, fallback: boolean) {
    return profileQuestion(fieldKey)?.required ?? fallback;
  }

  function profileQuestionIsVisible(fieldKey: string) {
    if (fieldKey === 'categoryOther') return answers.category === 'Other';
    if (fieldKey === 'occupationOther') return answers.occupation === 'Other';
    if (fieldKey === 'irrigationOther') return answers.irrigation === 'Other';
    if (fieldKey === 'cropsOther') return answers.crops.includes('Other');
    if (fieldKey === 'livestock') return answers.keepsLivestock === 'Yes';
    if (fieldKey === 'livestockOther') return answers.keepsLivestock === 'Yes' && answers.livestock.includes('Other');
    return true;
  }

  function managedQuestionIsValid(question: PublicSurveyQuestion) {
    if (question.fieldKey && !profileQuestionIsVisible(question.fieldKey)) return true;
    const required = question.required;
    const answer = question.fieldKey
      ? answers[question.fieldKey as keyof SurveyAnswers]
      : answers.customAnswers[question.id];
    const isBlank = answer === undefined || answer === null || (typeof answer === 'string' && !answer.trim()) || (Array.isArray(answer) && answer.length === 0);
    if (isBlank) return !required;
    const optionValues = question.options.map((option) => option.en);
    const supportsOther = questionUsesChoices(question.type) || question.type === 'yes_no' || question.type === 'rating';
    const selectedOther = supportsOther && (Array.isArray(answer) ? answer.includes('Other') : answer === 'Other');
    const otherKey = question.fieldKey ? `${question.fieldKey}Other` : `${question.id}_other`;
    const otherAnswer = question.fieldKey
      ? answers[otherKey as keyof SurveyAnswers]
      : answers.customAnswers[otherKey];
    if (required && selectedOther && (typeof otherAnswer !== 'string' || !otherAnswer.trim())) return false;

    switch (question.type) {
      case 'short_text':
      case 'long_text':
        return typeof answer === 'string' && answer.trim().length > 0;
      case 'number':
        return typeof answer === 'string' && answer.trim() !== '' && Number.isFinite(Number(answer));
      case 'email':
        return typeof answer === 'string' && answer.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(answer.trim());
      case 'date':
        return typeof answer === 'string' && !Number.isNaN(Date.parse(answer));
      case 'yes_no':
        return answer === 'Yes' || answer === 'No';
      case 'rating':
        return ['1', '2', '3', '4', '5'].includes(String(answer));
      case 'single_choice':
      case 'dropdown':
        return typeof answer === 'string' && optionValues.includes(answer);
      case 'multiple_choice':
        return Array.isArray(answer) && answer.length > 0 && answer.length <= (question.maxSelections ?? optionValues.length) && answer.every((value) => typeof value === 'string' && optionValues.includes(value));
    }
  }

  function renderManagedQuestion(question: PublicSurveyQuestion, questionNumber: number) {
    const required = question.required;
    const label = { en: question.promptEn, ur: question.promptUr };
    const answer = question.fieldKey
      ? answers[question.fieldKey as keyof SurveyAnswers]
      : answers.customAnswers[question.id];
    const otherKey = `${question.id}_other`;
    const supportsOther = questionUsesChoices(question.type) || question.type === 'yes_no' || question.type === 'rating';
    const selectedOther = supportsOther && (Array.isArray(answer) ? answer.includes('Other') : answer === 'Other');
    const requiredMark = required ? ' *' : ` (${translate(surveyLabels.optional)})`;
    const options = question.options;
    const instruction = { en: question.helpEn, ur: question.helpUr };
    const hasInstruction = Boolean(instruction.en || instruction.ur);

    function renderOtherField() {
      if (!selectedOther) return null;
      return <label className="field-label question-other-field"><span className="field-title"><BilingualText value={surveyLabels.otherResponse} isUrdu={isUrdu} />{required ? ' *' : ` (${translate(surveyLabels.optional)})`}</span><textarea className="form-control textarea-control" value={typeof answers.customAnswers[otherKey] === 'string' ? answers.customAnswers[otherKey] as string : ''} onChange={(event) => updateManagedAnswer(otherKey, event.target.value)} rows={2} maxLength={1000} required={required} /></label>;
    }

    if (question.type === 'multiple_choice') {
      return <fieldset className="choice-fieldset" key={question.id}><legend>{questionNumber}. <BilingualText value={label} isUrdu={isUrdu} />{requiredMark}</legend>{hasInstruction && <p className="question-instruction"><BilingualText value={instruction} isUrdu={isUrdu} /></p>}<ChoiceGrid options={options} selected={Array.isArray(answer) ? answer.filter((value): value is string => typeof value === 'string') : []} onToggle={(value) => toggleManagedChoice(question.id, value, question.maxSelections)} isUrdu={isUrdu} maxSelections={question.maxSelections ?? undefined} />{renderOtherField()}</fieldset>;
    }
    if (question.type === 'single_choice' || question.type === 'yes_no' || question.type === 'rating') {
      const choices = question.type === 'yes_no'
        ? surveyOptions.yesNo
        : question.type === 'rating'
          ? ['1', '2', '3', '4', '5'].map((value) => ({ en: value, ur: value }))
          : options;
      return <fieldset className="choice-fieldset" key={question.id}><legend>{questionNumber}. <BilingualText value={label} isUrdu={isUrdu} />{requiredMark}</legend>{hasInstruction && <p className="question-instruction"><BilingualText value={instruction} isUrdu={isUrdu} /></p>}<RadioGrid name={`managed-${question.id}`} options={choices} selected={typeof answer === 'string' ? answer : ''} onSelect={(value) => updateManagedAnswer(question.id, value)} isUrdu={isUrdu} />{renderOtherField()}</fieldset>;
    }
    if (question.type === 'dropdown') {
      return <div className="managed-dropdown-field" key={question.id}>{hasInstruction && <p className="question-instruction"><BilingualText value={instruction} isUrdu={isUrdu} /></p>}<SelectField label={{ ...label, en: `${questionNumber}. ${label.en}`, ur: `${questionNumber}. ${label.ur}` }} value={typeof answer === 'string' ? answer : ''} options={options} onChange={(value) => updateManagedAnswer(question.id, value)} isUrdu={isUrdu} required={required} />{renderOtherField()}</div>;
    }
    if (question.type === 'long_text') {
      return <label className="field-label" key={question.id}><span className="field-title">{questionNumber}. <BilingualText value={label} isUrdu={isUrdu} />{requiredMark}</span>{hasInstruction && <span className="question-instruction"><BilingualText value={instruction} isUrdu={isUrdu} /></span>}<textarea className="form-control textarea-control" value={typeof answer === 'string' ? answer : ''} onChange={(event) => updateManagedAnswer(question.id, event.target.value)} rows={3} maxLength={5000} required={required} /></label>;
    }
    return <div className="managed-dropdown-field" key={question.id}>{hasInstruction && <p className="question-instruction"><BilingualText value={instruction} isUrdu={isUrdu} /></p>}<TextField label={{ ...label, en: `${questionNumber}. ${label.en}`, ur: `${questionNumber}. ${label.ur}` }} value={typeof answer === 'string' ? answer : ''} onChange={(value) => updateManagedAnswer(question.id, value)} type={question.type === 'number' || question.type === 'email' || question.type === 'date' ? question.type : 'text'} optional={!required} maxLength={question.type === 'email' ? 254 : 5000} isUrdu={isUrdu} /></div>;
  }

  const profileValidity = [
    Boolean(answers.fullName.trim() && answers.contact.trim() && answers.district.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(answers.email)),
    Boolean(answers.experience && answers.landSize && answers.irrigation && (answers.irrigation !== 'Other' || answers.irrigationOther.trim()) && answers.crops.length && (!answers.crops.includes('Other') || answers.cropsOther.trim()) && answers.keepsLivestock && (answers.keepsLivestock !== 'Yes' || answers.livestock.length > 0) && (!answers.livestock.includes('Other') || answers.livestockOther.trim())),
  ];
  const totalSteps = surveySteps.length;
  const questionsByStep = surveySteps.map((_, index) => managedQuestions.filter((question) => question.stepNumber === index + 1));
  const currentStepQuestions = questionsByStep[step] ?? [];
  const validityByStep = surveySteps.map((_, index) => {
    const fixedFieldsAreValid = index < profileValidity.length
      ? profileValidity[index]
      : index === surveySteps.length - 1 ? answers.consent : true;
    return Boolean(fixedFieldsAreValid) && questionsByStep[index].every(managedQuestionIsValid);
  });
  const isValid = validityByStep[step] ?? false;
  const activeStepLabel: SurveyOption = surveySteps[step] ?? surveySteps[0];

  async function submitResponse() {
    if (!isValid || isSubmitting) return;

    setIsSubmitting(true);
    setSubmissionError(null);
    try {
      const response = await fetch('/api/survey', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers }),
      });
      const result = await response.json() as { error?: string };
      if (!response.ok) {
        throw new Error(result.error ?? 'We could not save your response. Please try again.');
      }
      setIsSubmitted(true);
    } catch (error) {
      setSubmissionError(text(error instanceof Error ? error.message : 'We could not save your response. Please try again.'));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main id="top">
      <SiteHeader ctaHref={formOnly ? '/survey-form#survey' : '/survey-form'} />

      {!formOnly && <>
      <section className="hero-section relative isolate overflow-hidden">
        <div className="hero-photo" role="img" aria-label="We are Agropreneurs, planting a seedling together" style={{ backgroundImage: "url('/herosection.png')" }} />
        <div className="hero-shade" />
        <div className="hero-content mx-auto w-full max-w-6xl px-5">
          <div className="hero-copy">
            <Link className="button hero-button" href="/survey-form">{text('Start the Survey')}<ArrowRight size={17} /></Link>
          </div>
        </div>
      </section>

      <section className="why-section bg-background py-16 sm:py-20" id="vision">
        <div className="content-wrap mx-auto grid w-full max-w-6xl gap-10 px-5 md:grid-cols-[0.9fr_1.1fr] md:gap-20">
          <div><p className="eyebrow">{isUrdu ? homeHero.visionEyebrowUr : homeHero.visionEyebrowEn}</p><h2>{isUrdu ? homeHero.visionTitleUr : homeHero.visionTitleEn}</h2></div>
          <div className="why-copy">
            <p className="why-statement">{isUrdu ? homeHero.visionLeadUr : homeHero.visionLeadEn}</p>
            <p>{isUrdu ? homeHero.visionBodyUr : homeHero.visionBodyEn}</p>
            <div className="stats-row">
              {homeHero.stats?.map((stat, index) => (
                <div key={`${stat.valueEn}-${index}`}><strong>{isUrdu ? stat.valueUr : stat.valueEn}</strong><span>{isUrdu ? stat.labelUr : stat.labelEn}</span></div>
              )) ?? [
                <div key="stat-1"><strong>{text('Nationwide')}</strong><span>{text('All provinces & regions')}</span></div>,
                <div key="stat-2"><strong>{text('Private')}</strong><span>{text('Responses stay confidential')}</span></div>,
                <div key="stat-3"><strong>{text('15–20 min')}</strong><span>{text('Estimated completion time')}</span></div>,
              ]}
            </div>
          </div>
        </div>
      </section>

      <section className="impact-section border-y py-16 sm:py-20" id="impact">
        <div className="content-wrap mx-auto w-full max-w-6xl px-5">
          <div className="section-heading"><p className="eyebrow">{isUrdu ? homeHero.impactEyebrowUr : homeHero.impactEyebrowEn}</p><h2>{isUrdu ? homeHero.impactTitleUr : homeHero.impactTitleEn}</h2></div>
          <div className="impact-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {(homeHero.impactItems?.length ? homeHero.impactItems : [{ titleEn: 'Awareness', titleUr: 'آگاہی', descriptionEn: 'Stay informed about food security and agriculture.', descriptionUr: 'غذائی تحفظ اور زراعت سے باخبر رہیں۔' }, { titleEn: 'Networking', titleUr: 'رابطہ سازی', descriptionEn: 'Connect farmers and agricultural communities.', descriptionUr: 'کسانوں اور زرعی برادریوں کو جوڑیں۔' }, { titleEn: 'Resource Sharing', titleUr: 'وسائل کی شراکت', descriptionEn: 'Improve access to useful knowledge and resources.', descriptionUr: 'مفید معلومات اور وسائل تک رسائی بہتر بنائیں۔' }, { titleEn: 'Data Gathering', titleUr: 'اعداد و شمار کا حصول', descriptionEn: 'Build reliable insights from real experiences.', descriptionUr: 'حقیقی تجربات سے قابلِ اعتماد معلومات حاصل کریں۔' }]).map((item, index) => {
              const Icon = impactIconMap[index % impactIconMap.length];
              return <article className="impact-item" key={`${item.titleEn}-${index}`} style={{ animationDelay: `${index * 35}ms` }}><span className="impact-icon"><Icon size={20} strokeWidth={1.7} /></span><h3>{isUrdu ? item.titleUr : item.titleEn}</h3><p>{isUrdu ? item.descriptionUr : item.descriptionEn}</p></article>;
            })}
          </div>
        </div>
      </section>

      <section className="about-section py-16 sm:py-20" id="about">
        <div className="content-wrap mx-auto grid w-full max-w-6xl gap-12 px-5 md:grid-cols-[0.85fr_1.15fr]">
          <div className="about-intro"><p className="eyebrow">{isUrdu ? homeHero.aboutEyebrowUr : homeHero.aboutEyebrowEn}</p><h2>{isUrdu ? homeHero.aboutTitleUr : homeHero.aboutTitleEn}</h2><p>{isUrdu ? homeHero.aboutDescriptionUr : homeHero.aboutDescriptionEn}</p></div>
          <div className="about-pillars">
            {(homeHero.pillars?.length ? homeHero.pillars : [{ titleEn: 'Objective', titleUr: 'مقصد', bodyEn: 'Connect Pakistan’s agricultural community and turn shared knowledge into practical opportunities.', bodyUr: 'پاکستان کی زرعی برادری کو جوڑنا اور مشترکہ علم کو عملی مواقع میں بدلنا۔' }, { titleEn: 'Vision', titleUr: 'ویژن', bodyEn: 'A smart, sustainable and food-secure Pakistan where farmers can thrive.', bodyUr: 'ایک ذہین، پائیدار اور غذائی تحفظ رکھنے والا پاکستان جہاں کسان ترقی کر سکیں۔' }, { titleEn: 'Mission', titleUr: 'مشن', bodyEn: 'Empower farmers through collaboration, useful data, modern practices and stronger market links.', bodyUr: 'تعاون، مفید معلومات، جدید طریقوں اور منڈیوں سے مضبوط روابط کے ذریعے کسانوں کو بااختیار بنانا۔' }]).map((pillar, index) => <article key={`${pillar.titleEn}-${index}`}><span>{String(index + 1).padStart(2, '0')}</span><div><h3>{isUrdu ? pillar.titleUr : pillar.titleEn}</h3><p>{isUrdu ? pillar.bodyUr : pillar.bodyEn}</p></div></article>)}
          </div>
        </div>
      </section>

      <section className="founder-message-section py-16 sm:py-20" id="founder">
        <div className="founder-message-layout content-wrap mx-auto grid w-full max-w-6xl items-center gap-10 px-5 md:grid-cols-[0.95fr_1.05fr] md:gap-16">
          <div className="founder-message-copy" dir={isUrdu ? 'rtl' : 'ltr'}>
            <p className="eyebrow">{isUrdu ? 'بانی کا پیغام' : "FOUNDER'S MESSAGE"}</p>
            <h2>{isUrdu ? 'آئیے زراعت کا مستقبل مل کر بنائیں۔' : 'Let’s build agriculture’s future together.'}</h2>
            <p>{isUrdu
              ? 'زراعت نے ہمیشہ پاکستان کے دل کے قریب مقام رکھا ہے۔ یہ ہمارے لوگوں کو کھانا فراہم کرتی ہے، ہمارے معاشروں کو سہارا دیتی ہے اور ہماری معیشت میں اہم کردار ادا کرتی ہے۔ The Agropreneurs اس سادہ وژن کے ساتھ قائم ہوا کہ کسان، تعلیمی ادارے، کاروباری برادری اور تنظیمیں ایک دوسرے کے ساتھ علم کا اشتراک کریں، لوگوں کو مواقع سے جوڑیں اور زرعی صنعت کی ترقی میں معاونت کریں۔'
              : 'Agriculture has always been close to the heart of Pakistan. It feeds our people, supports our communities, and plays an important role in our economy. The Agropreneurs was founded with a simple vision: to bring farmers, educational institutions, the business community and organizations together to share knowledge, connect people with opportunities and support the growth of the agro industry.'}</p>
            <p>{isUrdu
              ? 'ہمارا فلسفہ سادہ ہے: جب زراعت کے لوگ علم، ٹولز اور مواقع حاصل کریں، تو زراعت آگے بڑھے گی۔ ہم زرعی برادری کے سامنے آنے والے چیلنجز کو سن کر انہیں عملی حل، خیالات اور مواقع سے جوڑنے کے لیے کام کرتے ہیں۔ VISION 2040 – Securing the Future of Agriculture in Pakistan کے ذریعے ہم آنے والی نسل کو زراعت کو مواقع اور ترقی کا شعبہ سمجھنے کے لیے متاثر کرنا چاہتے ہیں اور ایک مضبوط، ذہین اور پائیدار زرعی مستقبل کے لیے کردار ادا کرنا چاہتے ہیں۔'
              : 'Our philosophy is simple: agriculture moves forward when its people have the knowledge, tools, and opportunities to grow. At The Agropreneurs, we listen to the challenges faced by the agricultural community and work to connect people with practical solutions, ideas, and opportunities. Through initiatives such as VISION 2040 – Securing the Future of Agriculture in Pakistan, we want to inspire the next generation to see agriculture as a sector of opportunity and growth, and contribute to a stronger, smarter, and more sustainable future for agriculture.'}</p>
            <p>{isUrdu
              ? 'The Agropreneurs ہمارے عزم کا اظہار ہے کہ ہم پائیدار اور ذہین حلوں کے ذریعے زراعت کو تبدیل کریں۔'
              : 'The Agropreneurs is our commitment to transforming agriculture through sustainable and smart solutions.'}</p>
            <div className="founder-signature">
              <strong>Muhammad Haider</strong>
              <span>{isUrdu ? 'بانی، دی ایگروپرینیورز' : 'Founder, The Agropreneurs'}</span>
            </div>
          </div>
          <figure className="founder-message-image">
            <Image src="/founder.jpg" alt={isUrdu ? 'بانی، دی ایگروپرینیورز' : 'Muhammad Haider, Founder of The Agropreneurs'} fill sizes="(max-width: 768px) 100vw, 48vw" />
            <figcaption>{isUrdu ? 'پاکستان کا زرعی مستقبل' : 'Growing a stronger agricultural future'}</figcaption>
          </figure>
        </div>
      </section>
      </>}

      {formOnly && <section className="detail-hero survey-form-hero">
        <div className="detail-hero-content content-wrap mx-auto w-full max-w-6xl px-5 py-16 text-center">
          <p className="hero-eyebrow justify-center">{text('VISION 2040 AGRICULTURE COMMUNITY SURVEY')}</p>
          <h1 className="text-4xl font-bold text-white sm:text-5xl">
            {isUrdu ? 'اپنا سروے مکمل کریں' : 'Share your agricultural experience'}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/85 sm:text-lg">
            {translate(surveyLabels.intro)}
          </p>
        </div>
      </section>}

      {formOnly && (
      <section className="survey-section scroll-mt-20 py-16 sm:py-24" id="survey">
        <div className="survey-wrap mx-auto w-full max-w-4xl px-5" dir={isUrdu ? 'rtl' : 'ltr'} lang={isUrdu ? 'ur' : 'en'}>
          <div className="survey-intro">
            <p className="eyebrow">{translate(surveyLabels.title)}</p>
            <h2>{isUrdu ? 'وژن 2040 کے مستقبل کی تشکیل میں اپنا کردار ادا کریں' : 'Help shape VISION 2040'}</h2>
            <p>{translate(surveyLabels.intro)}</p>
          </div>

          <div className="survey-progress">
            <div><p>{translate(surveyLabels.step)} {step + 1} {translate(surveyLabels.of)} {totalSteps}</p><strong>{translate(activeStepLabel)}</strong></div>
            <span>{Math.round(((step + 1) / totalSteps) * 100)}%</span>
            <div className="progress-track" role="progressbar" aria-label={isUrdu ? 'سروے کی پیش رفت' : 'Survey progress'} aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(((step + 1) / totalSteps) * 100)}><span style={{ width: `${((step + 1) / totalSteps) * 100}%` }} /></div>
          </div>

          <div className="survey-card" aria-live="polite">
            {isSubmitted ? (
              <div className="success-state"><span className="success-icon"><Check size={27} /></span><p className="eyebrow">{translate(surveyLabels.complete)}</p><h3>{translate(surveyLabels.successTitle)}</h3><p>{translate(surveyLabels.successBody)}</p><button className="button button-outline" onClick={() => { setIsSubmitted(false); setStep(0); setAnswers(initialSurveyAnswers); }}>{translate(surveyLabels.newResponse)}<ArrowRight size={16} /></button></div>
            ) : (
              <>
                <div className="survey-card-heading"><span className="survey-step-icon"><Tractor size={20} /></span><div><h3>{translate(activeStepLabel)}</h3><p>{translate(surveyLabels.requiredNote)}</p></div></div>
                <div className="survey-fields">
                  {step === 0 && (
                    <div className="form-grid">
                      <TextField label={profileLabel('fullName', surveyLabels.fullName)} value={answers.fullName} onChange={(value) => update('fullName', value)} isUrdu={isUrdu} />
                      <TextField label={profileLabel('contact', surveyLabels.contact)} value={answers.contact} onChange={(value) => update('contact', value)} type="tel" isUrdu={isUrdu} />
                      <TextField label={profileLabel('district', surveyLabels.district)} value={answers.district} onChange={(value) => update('district', value)} isUrdu={isUrdu} />
                      <TextField label={profileLabel('email', surveyLabels.email)} value={answers.email} onChange={(value) => update('email', value)} type="email" isUrdu={isUrdu} />
                      <SelectField label={profileLabel('province', surveyLabels.province)} value={answers.province} onChange={(value) => update('province', value)} options={profileOptions('province', surveyOptions.province)} isUrdu={isUrdu} required={profileRequired('province', false)} />
                      <SelectField label={profileLabel('age', surveyLabels.age)} value={answers.age} onChange={(value) => update('age', value)} options={profileOptions('age', surveyOptions.age)} isUrdu={isUrdu} required={profileRequired('age', false)} />
                      <SelectField label={profileLabel('category', surveyLabels.category)} value={answers.category} onChange={(value) => update('category', value)} options={profileOptions('category', surveyOptions.category)} isUrdu={isUrdu} required={profileRequired('category', false)} />
                      {answers.category === 'Other' && <TextField label={profileLabel('categoryOther', surveyLabels.categoryOther)} value={answers.categoryOther} onChange={(value) => update('categoryOther', value)} isUrdu={isUrdu} optional />}
                      <SelectField label={profileLabel('gender', surveyLabels.gender)} value={answers.gender} onChange={(value) => update('gender', value)} options={profileOptions('gender', surveyOptions.gender)} isUrdu={isUrdu} required={profileRequired('gender', false)} />
                      <SelectField label={profileLabel('education', surveyLabels.education)} value={answers.education} onChange={(value) => update('education', value)} options={profileOptions('education', surveyOptions.education)} isUrdu={isUrdu} required={profileRequired('education', false)} />
                      <SelectField label={profileLabel('occupation', surveyLabels.occupation)} value={answers.occupation} onChange={(value) => update('occupation', value)} options={profileOptions('occupation', surveyOptions.occupation)} isUrdu={isUrdu} required={profileRequired('occupation', false)} />
                      {answers.occupation === 'Other' && <TextField label={profileLabel('occupationOther', surveyLabels.occupationOther)} value={answers.occupationOther} onChange={(value) => update('occupationOther', value)} isUrdu={isUrdu} optional />}
                      <SelectField label={profileLabel('areaType', surveyLabels.areaType)} value={answers.areaType} onChange={(value) => update('areaType', value)} options={profileOptions('areaType', surveyOptions.areaType)} isUrdu={isUrdu} required={profileRequired('areaType', false)} />
                    </div>
                  )}

                  {step === 1 && <>
                    <div className="form-grid">
                      <SelectField label={profileLabel('experience', surveyLabels.experience)} value={answers.experience} onChange={(value) => update('experience', value)} options={profileOptions('experience', surveyOptions.experience)} isUrdu={isUrdu} required={profileRequired('experience', true)} />
                      <SelectField label={profileLabel('landSize', surveyLabels.landSize)} value={answers.landSize} onChange={(value) => update('landSize', value)} options={profileOptions('landSize', surveyOptions.landSize)} isUrdu={isUrdu} required={profileRequired('landSize', true)} />
                      <SelectField label={profileLabel('irrigation', surveyLabels.irrigation)} value={answers.irrigation} onChange={(value) => update('irrigation', value)} options={profileOptions('irrigation', surveyOptions.irrigation)} isUrdu={isUrdu} required={profileRequired('irrigation', true)} />
                      {answers.irrigation === 'Other' && <TextField label={profileLabel('irrigationOther', surveyLabels.irrigationOther)} value={answers.irrigationOther} onChange={(value) => update('irrigationOther', value)} isUrdu={isUrdu} />}
                    </div>
                    <fieldset className="choice-fieldset"><legend><BilingualText value={profileLabel('crops', surveyLabels.crops)} isUrdu={isUrdu} />{profileRequired('crops', true) ? ' *' : ` (${translate(surveyLabels.optional)})`}</legend><ChoiceGrid options={profileOptions('crops', surveyOptions.crops)} selected={answers.crops} onToggle={(value) => toggleChoice('crops', value)} isUrdu={isUrdu} /></fieldset>
                    {answers.crops.includes('Other') && <TextField label={profileLabel('cropsOther', surveyLabels.cropsOther)} value={answers.cropsOther} onChange={(value) => update('cropsOther', value)} isUrdu={isUrdu} />}
                    <fieldset className="choice-fieldset"><legend><BilingualText value={profileLabel('keepsLivestock', surveyLabels.keepsLivestock)} isUrdu={isUrdu} />{profileRequired('keepsLivestock', true) ? ' *' : ` (${translate(surveyLabels.optional)})`}</legend><RadioGrid name="keeps-livestock" options={surveyOptions.yesNo} selected={answers.keepsLivestock} onSelect={(value) => update('keepsLivestock', value)} isUrdu={isUrdu} columns="three-cols" /></fieldset>
                    {answers.keepsLivestock === 'Yes' && <><fieldset className="choice-fieldset"><legend><BilingualText value={profileLabel('livestock', surveyLabels.livestock)} isUrdu={isUrdu} /> *</legend><ChoiceGrid options={profileOptions('livestock', surveyOptions.livestock)} selected={answers.livestock} onToggle={(value) => toggleChoice('livestock', value)} isUrdu={isUrdu} /></fieldset>{answers.livestock.includes('Other') && <TextField label={profileLabel('livestockOther', surveyLabels.livestockOther)} value={answers.livestockOther} onChange={(value) => update('livestockOther', value)} isUrdu={isUrdu} />}</>}
                  </>}

                  {currentStepQuestions.filter((question) => !question.fieldKey).map((question) => renderManagedQuestion(question, managedQuestions.findIndex((item) => item.id === question.id) + 1))}

                  {step === totalSteps - 1 && <><label className="consent-card"><input type="checkbox" checked={answers.consent} onChange={(event) => update('consent', event.target.checked)} /><span><strong>{translate(surveyLabels.consentTitle)} *</strong><small>{translate(surveyLabels.consent)}</small></span><Check size={17} className="choice-check" /></label><p className="privacy-note"><ShieldCheck size={17} />{translate(surveyLabels.privacy)}</p></>}
                </div>

                {submissionError && <p className="submit-error" role="alert">{submissionError}</p>}
                <div className="survey-controls"><p className={isValid ? 'form-status form-status-ready' : 'form-status'} role="status">{isSubmitting ? translate(surveyLabels.saving) : isValid ? translate(surveyLabels.ready) : translate(surveyLabels.incomplete)}</p><div className="survey-buttons"><button className="button button-outline" disabled={step === 0 || isSubmitting} onClick={() => setStep((current) => Math.max(0, current - 1))}><ArrowLeft size={16} />{translate(surveyLabels.back)}</button>{step < totalSteps - 1 ? <button className="button" disabled={!isValid || isSubmitting} onClick={() => setStep((current) => Math.min(totalSteps - 1, current + 1))}>{translate(surveyLabels.next)}<ArrowRight size={16} /></button> : <button className="button" disabled={!isValid || isSubmitting} onClick={submitResponse}>{isSubmitting ? translate(surveyLabels.saving) : translate(surveyLabels.submit)}{isSubmitting ? null : <Check size={16} />}</button>}</div></div>
              </>
            )}
          </div>
          <p className="save-note"><ShieldCheck size={16} />{translate(surveyLabels.progressSaved)}</p>
        </div>
      </section>
      )}

      {!formOnly && <section className="quote-section bg-background"><div className="content-wrap mx-auto flex w-full max-w-6xl items-center justify-center px-5"><span className="quote-mark" aria-hidden="true">“</span><blockquote>“{isUrdu ? homeHero.quoteUr : homeHero.quoteEn}”</blockquote></div></section>}

      <SiteFooter />
    </main>
  );
}
