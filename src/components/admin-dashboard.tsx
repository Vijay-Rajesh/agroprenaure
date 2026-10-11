'use client';

import { startTransition, useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowDownToLine, ChevronLeft, ChevronRight, Eye, FileText, Globe, LayoutGrid, LogOut, Search, ShieldCheck, Sprout, X } from 'lucide-react';
import AdminQuestionManager from '@/components/admin-question-manager';
import AdminSiteManager from '@/components/admin-site-manager';

type SurveyRecord = {
  id: string;
  full_name: string;
  age: string;
  province: string;
  district: string;
  submitted_at: string;
  answers: Record<string, unknown>;
  question_labels: Record<string, string>;
  question_order: Record<string, number>;
};

type ResponsePage = {
  items: SurveyRecord[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
};

const provinces = [
  'Punjab', 'Sindh', 'Khyber Pakhtunkhwa', 'Balochistan', 'Baluchistan', 'Gilgit-Baltistan',
  'Azad Jammu & Kashmir', 'Islamabad Capital Territory',
];
const pageSizes = [10, 25, 50];

function displayAnswer(value: unknown) {
  if (typeof value === 'boolean') return value ? 'Yes' : 'No';
  if (Array.isArray(value)) return value.join(', ');
  if (value && typeof value === 'object') return JSON.stringify(value);
  return typeof value === 'string' ? value || 'Not provided' : 'Not provided';
}

function displayLabel(value: string) {
  return value.replace(/([A-Z])/g, ' $1').replace(/^./, (letter) => letter.toUpperCase());
}

function getAnswerEntries(record: SurveyRecord) {
  return Object.entries(record.answers).flatMap(([key, value]) => {
    if (key === 'customAnswers' && value && typeof value === 'object' && !Array.isArray(value)) {
      return Object.entries(value as Record<string, unknown>).map(([questionId, answer]) => ({
        key: `${key}-${questionId}`,
        label: record.question_labels[questionId] ?? 'Additional question',
        value: answer,
        order: record.question_order[questionId] ?? Number.MAX_SAFE_INTEGER,
      })).filter(({ value: answer }) => !isBlankAnswer(answer));
    }
    if (isBlankAnswer(value)) return [];
    return [{ key, label: record.question_labels[key] ?? displayLabel(key), value, order: -1 }];
  }).sort((first, second) => {
    if (first.order < 0 && second.order < 0) return 0;
    if (first.order < 0) return -1;
    if (second.order < 0) return 1;
    return first.order - second.order;
  });
}

function isBlankAnswer(value: unknown) {
  return value === null || value === undefined || (typeof value === 'string' && !value.trim()) || (Array.isArray(value) && value.length === 0);
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat('en-PK', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(value));
}

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [password, setPassword] = useState('');
  const [search, setSearch] = useState('');
  const [province, setProvince] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [responsePage, setResponsePage] = useState<ResponsePage | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [error, setError] = useState('');
  const [activeView, setActiveView] = useState<'responses' | 'questions' | 'website'>('responses');
  const shouldLoadResponses = isAuthenticated === true;
  const sidebarItems = [
    { id: 'responses', label: 'Responses', icon: FileText },
    { id: 'questions', label: 'Questions', icon: LayoutGrid },
    { id: 'website', label: 'Website', icon: Globe },
  ] as const;

  useEffect(() => {
    if (isAuthenticated === false) return;

    const controller = new AbortController();
    startTransition(() => setIsLoading(true));
    const params = new URLSearchParams({ search, province, page: String(page), pageSize: String(pageSize) });

    fetch(`/api/admin/responses?${params}`, { cache: 'no-store', signal: controller.signal })
      .then(async (response) => {
        const result = await response.json() as ResponsePage & { error?: string };
        if (response.status === 401) {
          setIsAuthenticated(false);
          setResponsePage(null);
          return;
        }
        if (!response.ok) throw new Error(result.error ?? 'Could not load survey responses.');
        setIsAuthenticated(true);
        setResponsePage(result);
        setError('');
      })
      .catch((requestError: unknown) => {
        if (requestError instanceof Error && requestError.name !== 'AbortError') {
          setError(requestError.message);
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) setIsLoading(false);
      });

    return () => controller.abort();
  }, [search, province, page, pageSize, isAuthenticated, shouldLoadResponses]);

  async function signIn(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSigningIn(true);
    setError('');
    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const result = await response.json() as { error?: string };
      if (!response.ok) throw new Error(result.error ?? 'Could not sign in.');
      setPassword('');
      setPage(1);
      setIsAuthenticated(true);
    } catch (signInError) {
      setError(signInError instanceof Error ? signInError.message : 'Could not sign in.');
    } finally {
      setIsSigningIn(false);
    }
  }

  async function signOut() {
    await fetch('/api/admin/login', { method: 'DELETE' });
    setResponsePage(null);
    setIsAuthenticated(false);
    setExpandedId(null);
    setError('');
  }

  function exportCurrentPage() {
    if (!responsePage) return;
    const firstRecord = responsePage.items[0];
    const answerEntries = firstRecord ? getAnswerEntries(firstRecord) : [];
    const headers = ['Full name', 'Contact number', 'Email', 'City / Village', 'Submitted at', ...answerEntries.map((entry) => entry.label)];
    const escapeCsv = (value: unknown) => `"${String(value ?? '').replaceAll('"', '""')}"`;
    const rows = responsePage.items.map((record) => [
      record.full_name,
      displayAnswer(record.answers.contact),
      displayAnswer(record.answers.email),
      record.district,
      record.submitted_at,
      ...answerEntries.map((entry) => {
        const key = entry.key.startsWith('customAnswers-') ? entry.key.slice('customAnswers-'.length) : entry.key;
        const value = entry.key.startsWith('customAnswers-')
          ? (record.answers.customAnswers as Record<string, unknown> | undefined)?.[key]
          : record.answers[key];
        return displayAnswer(value);
      }),
    ]);
    const csv = [headers, ...rows].map((row) => row.map(escapeCsv).join(',')).join('\r\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    const downloadUrl = URL.createObjectURL(blob);
    const downloadLink = document.createElement('a');
    downloadLink.href = downloadUrl;
    downloadLink.download = `vision-2040-responses-page-${page}.csv`;
    downloadLink.click();
    URL.revokeObjectURL(downloadUrl);
  }

  return (
    <main className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-sidebar-brand">
          <span className="admin-brand-mark"><Sprout size={21} /></span>
          <div>
            <strong>The Agropreneurs</strong>
            <small>VISION 2040</small>
          </div>
        </div>

        <nav className="admin-sidebar-nav" aria-label="Admin sections">
          {sidebarItems.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              className={activeView === id ? 'is-active' : ''}
              onClick={() => setActiveView(id)}
              aria-pressed={activeView === id}
              disabled={isAuthenticated !== true}
            >
              <Icon size={16} />
              <span>{label}</span>
            </button>
          ))}
        </nav>

        <div className="admin-sidebar-footer">
          <span className="admin-status"><span />Private dashboard</span>
          {isAuthenticated && <button className="admin-quiet-button" onClick={signOut}><LogOut size={15} />Sign out</button>}
        </div>
      </aside>

      <div className="admin-main-panel">
        <header className="admin-topbar">
          <div>
            <p className="admin-kicker">Control centre</p>
            <h2>{activeView === 'responses' ? 'Survey responses' : activeView === 'questions' ? 'Survey questions' : 'Website content'}</h2>
          </div>
          <div className="admin-topbar-actions">
            {activeView === 'responses' && <button className="admin-export-button" disabled={!responsePage?.items.length} onClick={exportCurrentPage}><ArrowDownToLine size={16} />Export page</button>}
          </div>
        </header>

        {isAuthenticated === false ? (
          <section className="admin-login-wrap">
            <form className="admin-login-panel" onSubmit={signIn}>
              <span className="admin-login-icon"><ShieldCheck size={22} /></span>
              <p className="admin-kicker">Restricted access</p>
              <h1>Survey responses</h1>
              <p className="admin-login-copy">Sign in to view and manage VISION 2040 submissions.</p>
              <label className="admin-field-label" htmlFor="admin-password">Admin password</label>
              <input id="admin-password" className="admin-input" type="password" autoComplete="current-password" required value={password} onChange={(event) => setPassword(event.target.value)} />
              {error && <p className="admin-error" role="alert">{error}</p>}
              <button className="button admin-login-button" type="submit" disabled={isSigningIn}>{isSigningIn ? 'Signing in…' : 'Sign in'}</button>
              <Link className="admin-back-link" href="/">Return to survey</Link>
            </form>
          </section>
        ) : isAuthenticated === null ? (
          <div className="admin-loading" role="status">Checking admin session…</div>
        ) : (
          <section className="admin-content">
            <div className="admin-page-heading">
              <div><p className="admin-kicker">VISION 2040 · ADMIN</p><h1>{activeView === 'responses' ? 'Survey responses' : activeView === 'questions' ? 'Survey questions' : 'Website content'}</h1><p>{activeView === 'responses' ? 'Review and export community submissions.' : activeView === 'questions' ? 'Manage the questions shown in the public survey.' : 'Edit pages, navbar links, and homepage hero content.'}</p></div>
            </div>

            {activeView === 'questions' ? <AdminQuestionManager /> : activeView === 'website' ? <AdminSiteManager /> : <>
            <div className="admin-toolbar">
              <label className="admin-search"><Search size={16} /><input type="search" placeholder="Search name, number, email or district" value={search} onChange={(event) => { setSearch(event.target.value); setPage(1); }} /></label>
              <label className="admin-filter-label"><span>Province</span><select value={province} onChange={(event) => { setProvince(event.target.value); setPage(1); }}><option value="">All provinces</option>{provinces.map((item) => <option key={item} value={item}>{item}</option>)}</select></label>
              <label className="admin-filter-label"><span>Rows</span><select value={pageSize} onChange={(event) => { setPageSize(Number(event.target.value)); setPage(1); }}>{pageSizes.map((size) => <option key={size} value={size}>{size}</option>)}</select></label>
            </div>

            {error && <p className="admin-error admin-page-error" role="alert">{error}</p>}
            <div className="admin-table-frame">
              <table className="admin-table">
                <thead><tr><th>Respondent</th><th>Contact number</th><th>Email</th><th>City / Village</th><th>Submitted</th><th>Details</th></tr></thead>
                <tbody>
                  {responsePage?.items.map((record) => (
                    <FragmentRow
                      key={record.id}
                      record={record}
                      isExpanded={expandedId === record.id}
                      onToggle={() => setExpandedId((current) => current === record.id ? null : record.id)}
                    />
                  ))}
                  {!isLoading && responsePage?.items.length === 0 && <tr><td className="admin-empty" colSpan={6}>No responses match these filters.</td></tr>}
                  {isLoading && <tr><td className="admin-empty" colSpan={6}>Loading responses…</td></tr>}
                </tbody>
              </table>
            </div>

            <div className="admin-table-footer">
              <p>{responsePage ? `${responsePage.total.toLocaleString()} response${responsePage.total === 1 ? '' : 's'}` : 'Loading response count…'}</p>
              <div className="admin-pagination"><span>Page {responsePage?.page ?? page} of {responsePage?.totalPages ?? 1}</span><button aria-label="Previous page" disabled={page <= 1 || isLoading} onClick={() => setPage((current) => Math.max(1, current - 1))}><ChevronLeft size={17} /></button><button aria-label="Next page" disabled={!responsePage || page >= responsePage.totalPages || isLoading} onClick={() => setPage((current) => current + 1)}><ChevronRight size={17} /></button></div>
            </div>
            </>}
          </section>
        )}
      </div>
    </main>
  );
}

function FragmentRow({ record, isExpanded, onToggle }: { record: SurveyRecord; isExpanded: boolean; onToggle: () => void }) {
  const answerEntries = getAnswerEntries(record);

  return (
    <>
      <tr>
        <td className="admin-respondent" data-label="Respondent">{record.full_name}</td>
        <td data-label="Contact number">{displayAnswer(record.answers.contact)}</td>
        <td data-label="Email">{displayAnswer(record.answers.email)}</td>
        <td data-label="City / Village">{record.district}</td>
        <td data-label="Submitted">{formatDate(record.submitted_at)}</td>
        <td><button className="admin-view-button" aria-expanded={isExpanded} onClick={onToggle}>{isExpanded ? <X size={15} /> : <Eye size={15} />}{isExpanded ? 'Close' : 'View'}</button></td>
      </tr>
      {isExpanded && <tr className="admin-answer-row"><td colSpan={6}><dl>{answerEntries.map(({ key, label, value }) => <div className="admin-answer-item" key={key}><dt>{label}</dt><dd>{displayAnswer(value)}</dd></div>)}</dl></td></tr>}
    </>
  );
}
