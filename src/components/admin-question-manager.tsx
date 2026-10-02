'use client';

import { useEffect, useState } from 'react';
import { Archive, Check, Pencil, Plus, RotateCcw, X } from 'lucide-react';
import { questionUsesChoices, surveyQuestionTypes, type AdminSurveyQuestion, type SurveyQuestionChoice, type SurveyQuestionType } from '@/lib/survey-question';
import { surveySteps } from '@/lib/survey-form';

type QuestionDraft = {
  prompt_en: string;
  prompt_ur: string;
  help_en: string;
  help_ur: string;
  question_type: SurveyQuestionType;
  options: SurveyQuestionChoice[];
  max_selections: number | null;
  required: boolean;
  step_number: number;
  is_active: boolean;
};

const emptyDraft: QuestionDraft = {
  prompt_en: '',
  prompt_ur: '',
  help_en: '',
  help_ur: '',
  question_type: 'short_text',
  options: [],
  max_selections: null,
  required: true,
  step_number: 3,
  is_active: true,
};

const typeLabels: Record<SurveyQuestionType, string> = {
  short_text: 'Short text',
  long_text: 'Long answer',
  number: 'Number',
  email: 'Email',
  date: 'Date',
  yes_no: 'Yes / no',
  rating: 'Rating (1 to 5)',
  single_choice: 'Single choice',
  multiple_choice: 'Multiple choice',
  dropdown: 'Dropdown',
};

export default function AdminQuestionManager() {
  const [questions, setQuestions] = useState<AdminSurveyQuestion[]>([]);
  const [draft, setDraft] = useState<QuestionDraft | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  async function loadQuestions(signal?: AbortSignal) {
    try {
      const response = await fetch('/api/admin/questions', { cache: 'no-store', signal });
      const result = await response.json() as { questions?: AdminSurveyQuestion[]; error?: string };
      if (!response.ok) throw new Error(result.error ?? 'Could not load survey questions.');
      setQuestions(result.questions ?? []);
      setError('');
    } catch (loadError) {
      if (loadError instanceof Error && loadError.name !== 'AbortError') setError(loadError.message);
    } finally {
      if (!signal?.aborted) setIsLoading(false);
    }
  }

  useEffect(() => {
    const controller = new AbortController();
    fetch('/api/admin/questions', { cache: 'no-store', signal: controller.signal })
      .then(async (response) => {
        const result = await response.json() as { questions?: AdminSurveyQuestion[]; error?: string };
        if (!response.ok) throw new Error(result.error ?? 'Could not load survey questions.');
        setQuestions(result.questions ?? []);
        setError('');
      })
      .catch((loadError: unknown) => {
        if (loadError instanceof Error && loadError.name !== 'AbortError') setError(loadError.message);
      })
      .finally(() => {
        if (!controller.signal.aborted) setIsLoading(false);
      });
    return () => controller.abort();
  }, []);

  function beginNewQuestion() {
    setEditingId(null);
    setDraft({ ...emptyDraft });
    setError('');
    setNotice('');
  }

  function beginEdit(question: AdminSurveyQuestion) {
    setEditingId(question.id);
    setDraft({
      prompt_en: question.prompt_en,
      prompt_ur: question.prompt_ur,
      help_en: question.help_en,
      help_ur: question.help_ur,
      question_type: question.question_type,
      options: question.options,
      max_selections: question.max_selections,
      required: question.required,
      step_number: question.step_number,
      is_active: question.is_active,
    });
    setError('');
    setNotice('');
  }

  function updateType(questionType: SurveyQuestionType) {
    setDraft((current) => current ? {
      ...current,
      question_type: questionType,
      options: questionUsesChoices(questionType)
        ? current.options.length ? current.options : [{ en: '', ur: '' }, { en: '', ur: '' }]
        : [],
      max_selections: questionType === 'multiple_choice' ? current.max_selections : null,
    } : current);
  }

  function updateChoice(index: number, key: keyof SurveyQuestionChoice, value: string) {
    setDraft((current) => current ? {
      ...current,
      options: current.options.map((choice, choiceIndex) => choiceIndex === index ? { ...choice, [key]: value } : choice),
    } : current);
  }

  async function saveQuestion(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!draft || isSaving) return;

    setIsSaving(true);
    setError('');
    setNotice('');
    const payload = {
      prompt_en: draft.prompt_en,
      prompt_ur: draft.prompt_ur,
      help_en: draft.help_en,
      help_ur: draft.help_ur,
      question_type: draft.question_type,
      options: draft.options,
      max_selections: draft.max_selections,
      required: draft.required,
      step_number: draft.step_number,
    };
    try {
      const response = await fetch('/api/admin/questions', {
        method: editingId ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingId ? { id: editingId, ...payload } : payload),
      });
      const result = await response.json() as { error?: string };
      if (!response.ok) throw new Error(result.error ?? 'Could not save the question.');
      setDraft(null);
      setEditingId(null);
      setNotice(editingId ? 'Question updated.' : 'Question added to the survey.');
      await loadQuestions();
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : 'Could not save the question.');
    } finally {
      setIsSaving(false);
    }
  }

  async function setQuestionActive(question: AdminSurveyQuestion, isActive: boolean) {
    setError('');
    setNotice('');
    try {
      const response = await fetch('/api/admin/questions', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: question.id, is_active: isActive }),
      });
      const result = await response.json() as { error?: string };
      if (!response.ok) throw new Error(result.error ?? 'Could not update the question.');
      setNotice(isActive ? 'Question restored.' : 'Question archived.');
      await loadQuestions();
    } catch (updateError) {
      setError(updateError instanceof Error ? updateError.message : 'Could not update the question.');
    }
  }

  const usesChoices = draft ? questionUsesChoices(draft.question_type) : false;

  return (
    <section className="admin-question-manager" aria-labelledby="question-manager-title">
      <div className="admin-question-heading">
        <div><p className="admin-kicker">FORM BUILDER</p><h2 id="question-manager-title">Survey questions</h2><p>Add, edit, or archive questions without changing the site code.</p></div>
        {!draft && <button className="button" type="button" onClick={beginNewQuestion}><Plus size={16} />Add question</button>}
      </div>

      {error && <p className="admin-error admin-page-error" role="alert">{error}</p>}
      {notice && <p className="admin-question-notice" role="status">{notice}</p>}

      {draft && (
        <form className="admin-question-editor" onSubmit={saveQuestion}>
          <div className="admin-question-editor-heading"><h3>{editingId ? 'Edit question' : 'New question'}</h3><button className="admin-icon-button" type="button" aria-label="Close question editor" onClick={() => setDraft(null)}><X size={17} /></button></div>
          <div className="admin-question-fields">
            <label className="admin-question-field"><span>Question in English *</span><textarea className="admin-question-input" value={draft.prompt_en} onChange={(event) => setDraft({ ...draft, prompt_en: event.target.value })} maxLength={500} rows={2} required /></label>
            <label className="admin-question-field" dir="rtl"><span>سوال اردو میں *</span><textarea className="admin-question-input" value={draft.prompt_ur} onChange={(event) => setDraft({ ...draft, prompt_ur: event.target.value })} maxLength={500} rows={2} required /></label>
            <label className="admin-question-field"><span>Instructions (English)</span><input className="admin-question-input" value={draft.help_en} onChange={(event) => setDraft({ ...draft, help_en: event.target.value })} maxLength={300} /></label>
            <label className="admin-question-field" dir="rtl"><span>ہدایات (اردو)</span><input className="admin-question-input" value={draft.help_ur} onChange={(event) => setDraft({ ...draft, help_ur: event.target.value })} maxLength={300} /></label>
            <label className="admin-question-field"><span>Answer type</span><select className="admin-question-input" value={draft.question_type} onChange={(event) => updateType(event.target.value as SurveyQuestionType)}>{surveyQuestionTypes.map((type) => <option key={type} value={type}>{typeLabels[type]}</option>)}</select></label>
            <label className="admin-question-field"><span>Form step</span><select className="admin-question-input" value={draft.step_number} onChange={(event) => setDraft({ ...draft, step_number: Number(event.target.value) })}>{surveySteps.map((formStep, index) => <option key={formStep.en} value={index + 1}>Step {index + 1}: {formStep.en}</option>)}</select></label>
            {draft.question_type === 'multiple_choice' && <label className="admin-question-field"><span>Maximum selections (optional)</span><input className="admin-question-input" type="number" min="1" max={draft.options.length} value={draft.max_selections ?? ''} onChange={(event) => setDraft({ ...draft, max_selections: event.target.value ? Number(event.target.value) : null })} /></label>}
            <label className="admin-question-required"><input type="checkbox" checked={draft.required} onChange={(event) => setDraft({ ...draft, required: event.target.checked })} /><span>Response required</span></label>
          </div>

          {usesChoices && <div className="admin-option-editor">
            <div className="admin-option-heading"><h4>Answer choices</h4><button className="admin-text-button" type="button" disabled={draft.options.length >= 30} onClick={() => setDraft({ ...draft, options: [...draft.options, { en: '', ur: '' }] })}><Plus size={14} />Add choice</button></div>
            {draft.options.map((choice, index) => <div className="admin-option-row" key={`choice-${index}`}><label className="admin-question-field"><span>English choice {index + 1}</span><input className="admin-question-input" value={choice.en} onChange={(event) => updateChoice(index, 'en', event.target.value)} maxLength={200} required /></label><label className="admin-question-field" dir="rtl"><span>اردو آپشن {index + 1}</span><input className="admin-question-input" value={choice.ur} onChange={(event) => updateChoice(index, 'ur', event.target.value)} maxLength={200} required /></label><button className="admin-icon-button" type="button" aria-label={`Remove choice ${index + 1}`} disabled={draft.options.length <= 2} onClick={() => setDraft({ ...draft, options: draft.options.filter((_, choiceIndex) => choiceIndex !== index) })}><X size={15} /></button></div>)}
          </div>}

          <div className="admin-question-form-actions"><button className="button button-outline" type="button" disabled={isSaving} onClick={() => setDraft(null)}>Cancel</button><button className="button" type="submit" disabled={isSaving}>{isSaving ? 'Saving…' : 'Save question'}{isSaving ? null : <Check size={15} />}</button></div>
        </form>
      )}

      <div className="admin-question-list-heading">
        <div><p className="admin-kicker">QUESTION BANK</p><h3>Current questions</h3></div>
        <div className="admin-question-counts"><span><strong>{questions.filter((question) => question.is_active).length}</strong> active</span><span><strong>{questions.length}</strong> total</span></div>
      </div>
      {isLoading ? <p className="admin-question-empty" role="status">Loading questions…</p> : questions.length === 0 ? <p className="admin-question-empty">No additional questions yet.</p> : (
        <ul className="admin-question-list">
          {questions.map((question, index) => (
            <li className={`admin-question-item ${question.is_active ? '' : 'is-archived'}`} key={question.id}>
              <span className="admin-question-number" aria-label={`Question ${index + 1}`}>{String(index + 1).padStart(2, '0')}</span>
              <div className="admin-question-item-copy">
                <div className="admin-question-meta">
                  <span className="admin-question-tag">{typeLabels[question.question_type]}</span>
                  <span className="admin-question-tag">Step {question.step_number}: {surveySteps[question.step_number - 1]?.en ?? 'Survey'}</span>
                  <span className={`admin-question-tag ${question.required ? 'is-required' : ''}`}>{question.required ? 'Required' : 'Optional'}</span>
                  {question.max_selections && <span className="admin-question-tag">Up to {question.max_selections} selections</span>}
                  {!question.is_active && <span className="admin-question-tag is-archived-tag">Archived</span>}
                </div>
                <div className="admin-question-prompts">
                  <div className="admin-question-language-block">
                    <span className="admin-question-language-label">English</span>
                    <h4>{question.prompt_en}</h4>
                    {question.help_en && <p>{question.help_en}</p>}
                  </div>
                  <div className="admin-question-language-block is-urdu" dir="rtl">
                    <span className="admin-question-language-label">اردو</span>
                    <h4>{question.prompt_ur}</h4>
                    {question.help_ur && <p>{question.help_ur}</p>}
                  </div>
                </div>
                {question.options.length > 0 && <div className="admin-question-options"><span className="admin-question-options-label">Answer choices</span><div>{question.options.map((option, optionIndex) => <span className="admin-question-option" key={`${question.id}-option-${optionIndex}`}>{option.en}<b aria-hidden="true">/</b><span dir="rtl">{option.ur}</span></span>)}</div></div>}
              </div>
              <div className="admin-question-item-actions"><button className="admin-icon-button" type="button" aria-label={`Edit ${question.prompt_en}`} onClick={() => beginEdit(question)}><Pencil size={15} /></button><button className="admin-icon-button" type="button" aria-label={question.is_active ? `Archive ${question.prompt_en}` : `Restore ${question.prompt_en}`} onClick={() => setQuestionActive(question, !question.is_active)}>{question.is_active ? <Archive size={15} /> : <RotateCcw size={15} />}</button></div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}