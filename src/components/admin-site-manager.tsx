'use client';

import { useEffect, useState } from 'react';
import { Archive, Eye, LoaderCircle, Pencil, Plus, RotateCcw, Save, Trash2, X } from 'lucide-react';
import { defaultHomeHero, type HomeHeroSettings } from '@/lib/site-settings';

type SitePageRecord = {
  id: string;
  path: string;
  group_key: string;
  group_label_en: string;
  group_label_ur: string;
  group_description_en: string;
  group_description_ur: string;
  title_en: string;
  title_ur: string;
  intro_en: string;
  intro_ur: string;
  section_title_en: string;
  section_title_ur: string;
  body_en: string;
  body_ur: string;
  focus_en: string[];
  focus_ur: string[];
  directory: unknown[];
  hero_image_url: string;
  is_published: boolean;
  sort_order: number;
};

type NavigationRecord = {
  id: string;
  section_key: string;
  section_label_en: string;
  section_label_ur: string;
  label_en: string;
  label_ur: string;
  href: string;
  sort_order: number;
  is_visible: boolean;
};

type PageDraft = Omit<SitePageRecord, 'id'>;
type NavigationDraft = Omit<NavigationRecord, 'id'>;
type CmsTab = 'pages' | 'navigation' | 'home';

const emptyPage: PageDraft = {
  path: '/new-page',
  group_key: 'custom',
  group_label_en: 'MORE',
  group_label_ur: 'مزید',
  group_description_en: '',
  group_description_ur: '',
  title_en: '',
  title_ur: '',
  intro_en: '',
  intro_ur: '',
  section_title_en: '',
  section_title_ur: '',
  body_en: '',
  body_ur: '',
  focus_en: [],
  focus_ur: [],
  directory: [],
  hero_image_url: '',
  is_published: true,
  sort_order: 100,
};

const emptyNavigation: NavigationDraft = {
  section_key: 'custom',
  section_label_en: 'MORE',
  section_label_ur: 'مزید',
  label_en: '',
  label_ur: '',
  href: '/',
  sort_order: 100,
  is_visible: true,
};

function parseLines(value: string) {
  return value.split(/\r?\n/).map((item) => item.trim()).filter(Boolean);
}

function normalizePageDraft(value: Partial<PageDraft> | null | undefined): PageDraft {
  const source = value && typeof value === 'object' ? value as Record<string, unknown> : {};
  const sortOrder = Number(source.sort_order ?? 100);
  return {
    ...emptyPage,
    ...Object.fromEntries(Object.entries(source).filter(([key]) => key in emptyPage)),
    focus_en: Array.isArray(source.focus_en) ? (source.focus_en as string[]) : [],
    focus_ur: Array.isArray(source.focus_ur) ? (source.focus_ur as string[]) : [],
    directory: Array.isArray(source.directory) ? (source.directory as unknown[]) : [],
    hero_image_url: typeof source.hero_image_url === 'string' ? source.hero_image_url : '',
    is_published: source.is_published === true,
    sort_order: Number.isFinite(sortOrder) ? Math.max(0, sortOrder) : 100,
  };
}

function normalizeNavigationDraft(value: Partial<NavigationDraft> | null | undefined): NavigationDraft {
  const source = value && typeof value === 'object' ? value as Record<string, unknown> : {};
  const sortOrder = Number(source.sort_order ?? 100);
  return {
    ...emptyNavigation,
    ...Object.fromEntries(Object.entries(source).filter(([key]) => key in emptyNavigation)),
    href: typeof source.href === 'string' ? source.href : '/',
    sort_order: Number.isFinite(sortOrder) ? Math.max(0, sortOrder) : 100,
    is_visible: source.is_visible === true,
  };
}

function normalizeHomeSettings(value: Partial<HomeHeroSettings> | null | undefined): HomeHeroSettings {
  return {
    ...defaultHomeHero,
    ...value,
    stats: Array.isArray(value?.stats) ? value.stats : defaultHomeHero.stats,
    impactItems: Array.isArray(value?.impactItems) ? value.impactItems : defaultHomeHero.impactItems,
    pillars: Array.isArray(value?.pillars) ? value.pillars : defaultHomeHero.pillars,
  };
}

export default function AdminSiteManager() {
  const [tab, setTab] = useState<CmsTab>('pages');
  const [pages, setPages] = useState<SitePageRecord[]>([]);
  const [navigation, setNavigation] = useState<NavigationRecord[]>([]);
  const [home, setHome] = useState<HomeHeroSettings>(defaultHomeHero);
  const [pageDraft, setPageDraft] = useState<PageDraft | null>(null);
  const [pageId, setPageId] = useState<string | null>(null);
  const [directoryJson, setDirectoryJson] = useState('[]');
  const [navigationDraft, setNavigationDraft] = useState<NavigationDraft | null>(null);
  const [navigationId, setNavigationId] = useState<string | null>(null);
  const [togglingNavigationId, setTogglingNavigationId] = useState<string | null>(null);
  const [togglingNavigationGroupKey, setTogglingNavigationGroupKey] = useState<string | null>(null);
  const [expandedNavigationGroups, setExpandedNavigationGroups] = useState<Set<string>>(() => new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  async function reload() {
    const response = await fetch('/api/admin/site', { cache: 'no-store' });
    const result = await response.json() as { pages?: SitePageRecord[]; navigation?: NavigationRecord[]; home?: HomeHeroSettings; error?: string };
    if (!response.ok) throw new Error(result.error ?? 'Could not load website content.');
    setPages(result.pages ?? []);
    setNavigation(result.navigation ?? []);
    setHome(normalizeHomeSettings(result.home));
  }

  useEffect(() => {
    const controller = new AbortController();
    fetch('/api/admin/site', { cache: 'no-store', signal: controller.signal })
      .then(async (response) => {
        const result = await response.json() as { pages?: SitePageRecord[]; navigation?: NavigationRecord[]; home?: HomeHeroSettings; error?: string };
        if (!response.ok) throw new Error(result.error ?? 'Could not load website content.');
        setPages(result.pages ?? []);
        setNavigation(result.navigation ?? []);
        setHome(normalizeHomeSettings(result.home));
      })
      .catch((loadError: unknown) => {
        if (loadError instanceof Error && loadError.name !== 'AbortError') setError(loadError.message);
      })
      .finally(() => {
        if (!controller.signal.aborted) setIsLoading(false);
      });
    return () => controller.abort();
  }, []);

  function beginNewPage() {
    setPageId(null);
    setPageDraft(normalizePageDraft(emptyPage));
    setDirectoryJson('[]');
    setError('');
    setNotice('');
  }

  function editPage(page: SitePageRecord) {
    setPageId(page.id);
    setPageDraft(normalizePageDraft(page));
    setDirectoryJson(JSON.stringify(page.directory ?? [], null, 2));
    setError('');
    setNotice('');
  }

  async function savePage(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!pageDraft || isSaving) return;
    let directory: unknown[];
    try {
      const parsedDirectory: unknown = JSON.parse(directoryJson);
      if (!Array.isArray(parsedDirectory)) throw new Error('Directory data must be a JSON array.');
      directory = parsedDirectory;
    } catch {
      setError('Directory data must be valid JSON in an array.');
      return;
    }

    setIsSaving(true);
    setError('');
    setNotice('');
    const payload = normalizePageDraft({
      ...pageDraft,
      path: `/${(pageDraft.path ?? '').trim().replace(/^\/+|\/+$/g, '')}`,
      focus_en: parseLines((Array.isArray(pageDraft.focus_en) ? pageDraft.focus_en : []).join('\n')),
      focus_ur: parseLines((Array.isArray(pageDraft.focus_ur) ? pageDraft.focus_ur : []).join('\n')),
      directory,
    });
    try {
      const response = await fetch('/api/admin/site', {
        method: pageId ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pageId ? { kind: 'page', id: pageId, ...payload } : { kind: 'page', ...payload }),
      });
      const result = await response.json() as { error?: string };
      if (!response.ok) throw new Error(result.error ?? 'Could not save page.');
      setPageDraft(null);
      setPageId(null);
      setNotice(pageId ? 'Page updated.' : 'Page added.');
      await reload();
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : 'Could not save page.');
    } finally {
      setIsSaving(false);
    }
  }

  function beginNewNavigation() {
    setNavigationId(null);
    setNavigationDraft(normalizeNavigationDraft({ ...emptyNavigation, sort_order: navigation.length + 1 }));
    setError('');
    setNotice('');
  }

  function editNavigation(item: NavigationRecord) {
    setNavigationId(item.id);
    setNavigationDraft(normalizeNavigationDraft(item));
    setExpandedNavigationGroups((current) => new Set(current).add(item.section_key));
    setError('');
    setNotice('');
  }

  async function saveNavigation(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!navigationDraft || isSaving) return;
    setIsSaving(true);
    setError('');
    setNotice('');
    try {
      const response = await fetch('/api/admin/site', {
        method: navigationId ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(navigationId
          ? { kind: 'navigation', id: navigationId, ...navigationDraft }
          : { kind: 'navigation', ...navigationDraft }),
      });
      const result = await response.json() as { error?: string };
      if (!response.ok) throw new Error(result.error ?? 'Could not save navbar item.');
      setNavigationDraft(null);
      setNavigationId(null);
      setNotice(navigationId ? 'Navbar item updated.' : 'Navbar item added.');
      await reload();
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : 'Could not save navbar item.');
    } finally {
      setIsSaving(false);
    }
  }

  async function saveHome(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSaving) return;
    setIsSaving(true);
    setError('');
    setNotice('');
    try {
      const response = await fetch('/api/admin/site', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ kind: 'home', ...normalizeHomeSettings(home) }),
      });
      const result = await response.json() as { error?: string };
      if (!response.ok) throw new Error(result.error ?? 'Could not save homepage hero.');
      setNotice('Homepage hero updated.');
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : 'Could not save homepage hero.');
    } finally {
      setIsSaving(false);
    }
  }

  async function toggleNavigationVisibility(item: NavigationRecord) {
    if (togglingNavigationId || togglingNavigationGroupKey) return;
    const { id, created_at, updated_at, ...rest } = item as NavigationRecord & { created_at?: string; updated_at?: string };
    setError('');
    setNotice('');
    setTogglingNavigationId(id);
    try {
      const response = await fetch('/api/admin/site', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ kind: 'navigation', id, ...normalizeNavigationDraft({ ...rest, is_visible: !item.is_visible }) }),
      });
      const result = await response.json() as { error?: string };
      if (!response.ok) throw new Error(result.error ?? 'Could not update navbar visibility.');
      const isVisible = !item.is_visible;
      setNavigation((current) => current.map((entry) => entry.id === id ? { ...entry, is_visible: isVisible } : entry));
      setNotice(isVisible ? 'Navbar item enabled.' : 'Navbar item disabled.');
      await reload();
    } catch (toggleError) {
      setError(toggleError instanceof Error ? toggleError.message : 'Could not update navbar visibility.');
    } finally {
      setTogglingNavigationId(null);
    }
  }

  async function toggleNavigationGroup(group: { key: string; labelEn: string; items: NavigationRecord[] }) {
    if (togglingNavigationId || togglingNavigationGroupKey) return;
    const isVisible = !group.items.every((item) => item.is_visible);

    setError('');
    setNotice('');
    setTogglingNavigationGroupKey(group.key);
    try {
      const response = await fetch('/api/admin/site', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ kind: 'navigation-section', section_key: group.key, is_visible: isVisible }),
      });
      const result = await response.json() as { error?: string };
      if (!response.ok) throw new Error(result.error ?? 'Could not update navbar section visibility.');
      setNavigation((current) => current.map((item) => item.section_key === group.key ? { ...item, is_visible: isVisible } : item));
      setNotice(`${group.labelEn} section ${isVisible ? 'enabled' : 'disabled'}.`);
      await reload();
    } catch (toggleError) {
      setError(toggleError instanceof Error ? toggleError.message : 'Could not update navbar section visibility.');
      try {
        await reload();
      } catch {
        // Keep the original toggle error visible if reloading also fails.
      }
    } finally {
      setTogglingNavigationGroupKey(null);
    }
  }

  async function deleteItem(kind: 'page' | 'navigation', id: string) {
    if (!window.confirm(kind === 'page' ? 'Archive this page? It will no longer appear publicly.' : 'Remove this navbar item?')) return;
    setError('');
    setNotice('');
    try {
      const response = await fetch('/api/admin/site', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ kind, id }),
      });
      const result = await response.json() as { error?: string };
      if (!response.ok) throw new Error(result.error ?? 'Could not remove item.');
      setNotice(kind === 'page' ? 'Page archived.' : 'Navbar item removed.');
      await reload();
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : 'Could not remove item.');
    }
  }

  async function togglePagePublished(page: SitePageRecord) {
    const { id, created_at, updated_at, ...rest } = page as SitePageRecord & { created_at?: string; updated_at?: string };
    const response = await fetch('/api/admin/site', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ kind: 'page', id, ...normalizePageDraft({ ...rest, is_published: !page.is_published }) }),
    });
    const result = await response.json() as { error?: string };
    if (!response.ok) {
      setError(result.error ?? 'Could not change page visibility.');
      return;
    }
    setNotice(page.is_published ? 'Page unpublished.' : 'Page published.');
    await reload();
  }

  const updatePage = <K extends keyof PageDraft>(key: K, value: PageDraft[K]) => setPageDraft((current) => current ? { ...current, [key]: value } : current);
  const updateNavigation = <K extends keyof NavigationDraft>(key: K, value: NavigationDraft[K]) => setNavigationDraft((current) => current ? { ...current, [key]: value } : current);
  const navigationGroups = navigation.reduce<Array<{ key: string; labelEn: string; labelUr: string; items: NavigationRecord[] }>>((groups, item) => {
    const group = groups.find((entry) => entry.key === item.section_key);
    if (group) group.items.push(item);
    else groups.push({ key: item.section_key, labelEn: item.section_label_en, labelUr: item.section_label_ur, items: [item] });
    return groups;
  }, []);
  const editingNavigationGroupKey = navigation.find((item) => item.id === navigationId)?.section_key;
  const navigationEditor = navigationDraft && <form className="admin-cms-form" onSubmit={saveNavigation}>
    <div className="admin-question-editor-heading"><h3>{navigationId ? 'Edit navbar item' : 'New navbar item'}</h3><button className="admin-icon-button" type="button" aria-label="Close navbar editor" onClick={() => setNavigationDraft(null)}><X size={17} /></button></div>
    <div className="admin-cms-grid">
      <label className="admin-question-field"><span>Section key</span><input className="admin-question-input" value={navigationDraft.section_key} onChange={(event) => updateNavigation('section_key', event.target.value)} required /></label>
      <label className="admin-question-field"><span>Section label (English)</span><input className="admin-question-input" value={navigationDraft.section_label_en} onChange={(event) => updateNavigation('section_label_en', event.target.value)} required /></label>
      <label className="admin-question-field" dir="rtl"><span>سیکشن کا نام (اردو)</span><input className="admin-question-input" value={navigationDraft.section_label_ur} onChange={(event) => updateNavigation('section_label_ur', event.target.value)} /></label>
      <label className="admin-question-field"><span>Link label (English)</span><input className="admin-question-input" value={navigationDraft.label_en} onChange={(event) => updateNavigation('label_en', event.target.value)} required /></label>
      <label className="admin-question-field" dir="rtl"><span>لنک کا نام (اردو)</span><input className="admin-question-input" value={navigationDraft.label_ur} onChange={(event) => updateNavigation('label_ur', event.target.value)} /></label>
      <label className="admin-question-field"><span>Internal URL</span><input className="admin-question-input" value={navigationDraft.href} onChange={(event) => updateNavigation('href', event.target.value)} placeholder="/education/universities or /#survey" required /></label>
      <label className="admin-question-field"><span>Display order</span><input className="admin-question-input" type="number" min="0" value={navigationDraft.sort_order} onChange={(event) => updateNavigation('sort_order', Number(event.target.value))} /></label>
      <label className="admin-question-required"><input type="checkbox" checked={navigationDraft.is_visible} onChange={(event) => updateNavigation('is_visible', event.target.checked)} /><span>Visible in navbar</span></label>
    </div>
    <div className="admin-question-form-actions"><button className="button button-outline" type="button" onClick={() => setNavigationDraft(null)}>Cancel</button><button className="button" type="submit" disabled={isSaving}>{isSaving ? 'Saving…' : 'Save navbar item'}<Save size={15} /></button></div>
  </form>;

  return (
    <section className="admin-site-manager" aria-labelledby="site-manager-title">
      <div className="admin-site-heading"><div><p className="admin-kicker">WEBSITE CMS</p><h2 id="site-manager-title">Website content</h2><p>Manage published pages, navbar links, and the homepage hero.</p></div></div>

      <div className="admin-cms-summary">
        <div className="admin-mini-stat">
          <span>Pages</span>
          <strong>{pages.length}</strong>
        </div>
        <div className="admin-mini-stat">
          <span>Visible nav</span>
          <strong>{navigation.filter((item) => item.is_visible).length}</strong>
        </div>
        <div className="admin-mini-stat">
          <span>Homepage</span>
          <strong>{home.titleEn ? 'Ready' : 'Draft'}</strong>
        </div>
      </div>

      <div className="admin-view-tabs" role="tablist" aria-label="Website content sections">
        <button type="button" role="tab" aria-selected={tab === 'pages'} onClick={() => setTab('pages')}>Pages</button>
        <button type="button" role="tab" aria-selected={tab === 'navigation'} onClick={() => setTab('navigation')}>Navbar</button>
        <button type="button" role="tab" aria-selected={tab === 'home'} onClick={() => setTab('home')}>Homepage hero</button>
      </div>
      {error && <p className="admin-error admin-page-error" role="alert">{error}</p>}
      {notice && <p className="admin-question-notice" role="status">{notice}</p>}
      {isLoading ? <p className="admin-question-empty" role="status">Loading website content…</p> : <>
        {tab === 'pages' && <div className="admin-cms-panel">
          <div className="admin-cms-list-heading"><h3>Pages</h3><button className="button" type="button" onClick={beginNewPage}><Plus size={16} />Add page</button></div>
          {pageDraft ? <form className="admin-cms-form" onSubmit={savePage}>
            <div className="admin-question-editor-heading"><h3>{pageId ? 'Edit page' : 'New page'}</h3><button className="admin-icon-button" type="button" aria-label="Close page editor" onClick={() => setPageDraft(null)}><X size={17} /></button></div>
            <div className="admin-cms-grid">
              <label className="admin-question-field"><span>Page path *</span><input className="admin-question-input" value={pageDraft.path} onChange={(event) => updatePage('path', event.target.value)} placeholder="/community/soil-health" required /></label>
              <label className="admin-question-field"><span>Navbar group key</span><input className="admin-question-input" value={pageDraft.group_key} onChange={(event) => updatePage('group_key', event.target.value)} required /></label>
              <label className="admin-question-field"><span>Navbar group (English)</span><input className="admin-question-input" value={pageDraft.group_label_en} onChange={(event) => updatePage('group_label_en', event.target.value)} required /></label>
              <label className="admin-question-field" dir="rtl"><span>نیویگیشن گروپ (اردو)</span><input className="admin-question-input" value={pageDraft.group_label_ur} onChange={(event) => updatePage('group_label_ur', event.target.value)} /></label>
              <label className="admin-question-field"><span>Page title (English) *</span><input className="admin-question-input" value={pageDraft.title_en} onChange={(event) => updatePage('title_en', event.target.value)} required /></label>
              <label className="admin-question-field" dir="rtl"><span>صفحے کا عنوان (اردو)</span><input className="admin-question-input" value={pageDraft.title_ur} onChange={(event) => updatePage('title_ur', event.target.value)} /></label>
              <label className="admin-question-field"><span>Intro (English)</span><textarea className="admin-question-input" rows={3} value={pageDraft.intro_en} onChange={(event) => updatePage('intro_en', event.target.value)} /></label>
              <label className="admin-question-field" dir="rtl"><span>تعارف (اردو)</span><textarea className="admin-question-input" rows={3} value={pageDraft.intro_ur} onChange={(event) => updatePage('intro_ur', event.target.value)} /></label>
              <label className="admin-question-field"><span>Section heading (English)</span><input className="admin-question-input" value={pageDraft.section_title_en} onChange={(event) => updatePage('section_title_en', event.target.value)} /></label>
              <label className="admin-question-field" dir="rtl"><span>سیکشن کی سرخی (اردو)</span><input className="admin-question-input" value={pageDraft.section_title_ur} onChange={(event) => updatePage('section_title_ur', event.target.value)} /></label>
              <label className="admin-question-field"><span>Page content (English)</span><textarea className="admin-question-input" rows={7} value={pageDraft.body_en} onChange={(event) => updatePage('body_en', event.target.value)} /></label>
              <label className="admin-question-field" dir="rtl"><span>صفحے کا مواد (اردو)</span><textarea className="admin-question-input" rows={7} value={pageDraft.body_ur} onChange={(event) => updatePage('body_ur', event.target.value)} /></label>
              <label className="admin-question-field"><span>Focus areas (English, one per line)</span><textarea className="admin-question-input" rows={4} value={pageDraft.focus_en.join('\n')} onChange={(event) => updatePage('focus_en', parseLines(event.target.value))} /></label>
              <label className="admin-question-field" dir="rtl"><span>اہم شعبے (اردو، ہر سطر میں ایک)</span><textarea className="admin-question-input" rows={4} value={pageDraft.focus_ur.join('\n')} onChange={(event) => updatePage('focus_ur', parseLines(event.target.value))} /></label>
              <label className="admin-question-field admin-cms-full"><span>Hero image URL or local path</span><input className="admin-question-input" type="text" value={pageDraft.hero_image_url} onChange={(event) => updatePage('hero_image_url', event.target.value)} placeholder="https://… or /image.jpg" /></label>
              {pageDraft.hero_image_url && <div className="admin-cms-image-preview" role="img" aria-label="Page hero image preview" style={{ backgroundImage: `url(${JSON.stringify(pageDraft.hero_image_url)})` }}><span>Page hero preview</span></div>}
              <label className="admin-question-field"><span>Page order</span><input className="admin-question-input" type="number" min="0" value={pageDraft.sort_order} onChange={(event) => updatePage('sort_order', Number(event.target.value))} /></label>
              <label className="admin-question-required"><input type="checkbox" checked={pageDraft.is_published} onChange={(event) => updatePage('is_published', event.target.checked)} /><span>Published on the public site</span></label>
              <details className="admin-cms-full admin-cms-advanced"><summary>Directory data (JSON)</summary><textarea className="admin-question-input" rows={10} value={directoryJson} onChange={(event) => setDirectoryJson(event.target.value)} spellCheck={false} /><small>Used for university and research-center entries. Keep this as a JSON array.</small></details>
            </div>
            <div className="admin-question-form-actions"><button className="button button-outline" type="button" disabled={isSaving} onClick={() => setPageDraft(null)}>Cancel</button><button className="button" type="submit" disabled={isSaving}>{isSaving ? 'Saving…' : 'Save page'}{isSaving ? null : <Save size={15} />}</button></div>
          </form> : <ul className="admin-cms-list">{pages.map((page) => <li className="admin-cms-row" key={page.id}>
            <div><span className="admin-question-type">{page.is_published ? 'Published' : 'Draft'} · {page.path}</span><h4>{page.title_en}</h4><p dir="rtl">{page.title_ur}</p><small>Hero: {page.hero_image_url || 'No image'}</small></div>
            <div className="admin-question-item-actions"><button className="admin-icon-button" type="button" aria-label={`Edit ${page.title_en}`} onClick={() => editPage(page)}><Pencil size={15} /></button><button className="admin-icon-button" type="button" aria-label={page.is_published ? `Unpublish ${page.title_en}` : `Publish ${page.title_en}`} onClick={() => void togglePagePublished(page)}>{page.is_published ? <Eye size={15} /> : <RotateCcw size={15} />}</button><button className="admin-icon-button" type="button" aria-label={`Archive ${page.title_en}`} onClick={() => void deleteItem('page', page.id)}><Archive size={15} /></button></div>
          </li>)}</ul>}
        </div>}

        {tab === 'navigation' && <div className="admin-cms-panel">
          <div className="admin-cms-list-heading"><div><h3>Navbar items</h3><p>Change labels, group sections, order, or visibility.</p></div><button className="button" type="button" onClick={beginNewNavigation}><Plus size={16} />Add navbar item</button></div>
          {navigationDraft && !navigationId && navigationEditor}
          <div className="admin-nav-groups">
            {navigationGroups.map((group, index) => <section className="admin-nav-group" key={group.key}>
              <div className="admin-nav-group-heading">
                <button className="admin-nav-group-trigger" type="button" aria-expanded={expandedNavigationGroups.has(group.key) || group.key === editingNavigationGroupKey} aria-controls={`admin-nav-group-${index}`} onClick={() => setExpandedNavigationGroups((current) => {
                  const next = new Set(current);
                  if (next.has(group.key)) next.delete(group.key);
                  else next.add(group.key);
                  return next;
                })}>
                  <span><strong>{group.labelEn}</strong><small dir="rtl">{group.labelUr || 'اردو نام نہیں'}</small></span>
                  <span className="admin-nav-group-count">{group.items.length} {group.items.length === 1 ? 'link' : 'links'}</span>
                </button>
                <button className={`admin-toggle-pill admin-nav-group-toggle ${group.items.every((item) => item.is_visible) ? 'is-enabled' : ''}`} type="button" disabled={togglingNavigationId !== null || togglingNavigationGroupKey !== null} aria-busy={togglingNavigationGroupKey === group.key} onClick={() => void toggleNavigationGroup(group)}>
                  {togglingNavigationGroupKey === group.key ? <><LoaderCircle className="admin-toggle-spinner" size={14} />Saving…</> : group.items.every((item) => item.is_visible) ? 'Disable section' : 'Enable section'}
                </button>
              </div>
              {(expandedNavigationGroups.has(group.key) || group.key === editingNavigationGroupKey) && <div id={`admin-nav-group-${index}`} className="admin-nav-group-content">
              <ul className="admin-cms-list">{group.items.map((item) => <li className="admin-cms-row" key={item.id}>
                <div><span className="admin-question-type">{item.is_visible ? 'Visible in navbar' : 'Hidden from navbar'} · {item.href}</span><h4>{item.label_en}</h4><p dir="rtl">{item.label_ur}</p></div>
                <div className="admin-question-item-actions">
                  <button className={`admin-toggle-pill ${item.is_visible ? 'is-enabled' : ''}`} type="button" disabled={togglingNavigationId !== null || togglingNavigationGroupKey !== null} aria-busy={togglingNavigationId === item.id} onClick={() => void toggleNavigationVisibility(item)}>{togglingNavigationId === item.id ? <><LoaderCircle className="admin-toggle-spinner" size={14} />Saving…</> : item.is_visible ? 'Enabled' : 'Disabled'}</button>
                  <button className="admin-icon-button" type="button" aria-label={`Edit ${item.label_en}`} onClick={() => editNavigation(item)}><Pencil size={15} /></button>
                  <button className="admin-icon-button" type="button" aria-label={`Remove ${item.label_en}`} onClick={() => void deleteItem('navigation', item.id)}><Trash2 size={15} /></button>
                </div>
              </li>)}</ul>
              {navigationDraft && navigationId && group.key === editingNavigationGroupKey && navigationEditor}
              </div>}
            </section>)}
          </div>
        </div>}

        {tab === 'home' && <form className="admin-cms-form" onSubmit={saveHome}>
          <div className="admin-question-editor-heading"><h3>Homepage hero</h3><p>Update the opening message, section copy, and image.</p></div>
          <div className="admin-cms-grid">
            <label className="admin-question-field"><span>Eyebrow (English)</span><input className="admin-question-input" value={home.eyebrowEn} onChange={(event) => setHome({ ...home, eyebrowEn: event.target.value })} /></label>
            <label className="admin-question-field" dir="rtl"><span>بالائی عنوان (اردو)</span><input className="admin-question-input" value={home.eyebrowUr} onChange={(event) => setHome({ ...home, eyebrowUr: event.target.value })} /></label>
            <label className="admin-question-field"><span>Hero headline (English) *</span><textarea className="admin-question-input" rows={2} value={home.titleEn} onChange={(event) => setHome({ ...home, titleEn: event.target.value })} required /></label>
            <label className="admin-question-field" dir="rtl"><span>مرکزی سرخی (اردو) *</span><textarea className="admin-question-input" rows={2} value={home.titleUr} onChange={(event) => setHome({ ...home, titleUr: event.target.value })} required /></label>
            <label className="admin-question-field"><span>Description (English)</span><textarea className="admin-question-input" rows={4} value={home.descriptionEn} onChange={(event) => setHome({ ...home, descriptionEn: event.target.value })} /></label>
            <label className="admin-question-field" dir="rtl"><span>تفصیل (اردو)</span><textarea className="admin-question-input" rows={4} value={home.descriptionUr} onChange={(event) => setHome({ ...home, descriptionUr: event.target.value })} /></label>
            <label className="admin-question-field admin-cms-full"><span>Hero image URL or local path</span><input className="admin-question-input" type="text" value={home.imageUrl} onChange={(event) => setHome({ ...home, imageUrl: event.target.value })} placeholder="https://… or /image.jpg" /></label>
            <label className="admin-question-field"><span>Vision eyebrow (English)</span><input className="admin-question-input" value={home.visionEyebrowEn} onChange={(event) => setHome({ ...home, visionEyebrowEn: event.target.value })} /></label>
            <label className="admin-question-field" dir="rtl"><span>ویژن بالائی عنوان (اردو)</span><input className="admin-question-input" value={home.visionEyebrowUr} onChange={(event) => setHome({ ...home, visionEyebrowUr: event.target.value })} /></label>
            <label className="admin-question-field"><span>Vision title (English)</span><textarea className="admin-question-input" rows={2} value={home.visionTitleEn} onChange={(event) => setHome({ ...home, visionTitleEn: event.target.value })} /></label>
            <label className="admin-question-field" dir="rtl"><span>ویژن عنوان (اردو)</span><textarea className="admin-question-input" rows={2} value={home.visionTitleUr} onChange={(event) => setHome({ ...home, visionTitleUr: event.target.value })} /></label>
            <label className="admin-question-field"><span>Vision lead (English)</span><textarea className="admin-question-input" rows={3} value={home.visionLeadEn} onChange={(event) => setHome({ ...home, visionLeadEn: event.target.value })} /></label>
            <label className="admin-question-field" dir="rtl"><span>ویژن پیشکش (اردو)</span><textarea className="admin-question-input" rows={3} value={home.visionLeadUr} onChange={(event) => setHome({ ...home, visionLeadUr: event.target.value })} /></label>
            <label className="admin-question-field admin-cms-full"><span>Vision body (English)</span><textarea className="admin-question-input" rows={4} value={home.visionBodyEn} onChange={(event) => setHome({ ...home, visionBodyEn: event.target.value })} /></label>
            <label className="admin-question-field admin-cms-full" dir="rtl"><span>ویژن متن (اردو)</span><textarea className="admin-question-input" rows={4} value={home.visionBodyUr} onChange={(event) => setHome({ ...home, visionBodyUr: event.target.value })} /></label>
            <label className="admin-question-field"><span>About eyebrow (English)</span><input className="admin-question-input" value={home.aboutEyebrowEn} onChange={(event) => setHome({ ...home, aboutEyebrowEn: event.target.value })} /></label>
            <label className="admin-question-field" dir="rtl"><span>دربارہ عنوان (اردو)</span><input className="admin-question-input" value={home.aboutEyebrowUr} onChange={(event) => setHome({ ...home, aboutEyebrowUr: event.target.value })} /></label>
            <label className="admin-question-field"><span>About title (English)</span><input className="admin-question-input" value={home.aboutTitleEn} onChange={(event) => setHome({ ...home, aboutTitleEn: event.target.value })} /></label>
            <label className="admin-question-field" dir="rtl"><span>دربارہ عنوان (اردو)</span><input className="admin-question-input" value={home.aboutTitleUr} onChange={(event) => setHome({ ...home, aboutTitleUr: event.target.value })} /></label>
            <label className="admin-question-field admin-cms-full"><span>About description (English)</span><textarea className="admin-question-input" rows={3} value={home.aboutDescriptionEn} onChange={(event) => setHome({ ...home, aboutDescriptionEn: event.target.value })} /></label>
            <label className="admin-question-field admin-cms-full" dir="rtl"><span>دربارہ تفصیل (اردو)</span><textarea className="admin-question-input" rows={3} value={home.aboutDescriptionUr} onChange={(event) => setHome({ ...home, aboutDescriptionUr: event.target.value })} /></label>
            <label className="admin-question-field admin-cms-full"><span>Quote (English)</span><textarea className="admin-question-input" rows={2} value={home.quoteEn} onChange={(event) => setHome({ ...home, quoteEn: event.target.value })} /></label>
            <label className="admin-question-field admin-cms-full" dir="rtl"><span>اقتباس (اردو)</span><textarea className="admin-question-input" rows={2} value={home.quoteUr} onChange={(event) => setHome({ ...home, quoteUr: event.target.value })} /></label>
            {home.imageUrl && <div className="admin-cms-image-preview" role="img" aria-label="Homepage hero image preview" style={{ backgroundImage: `url(${JSON.stringify(home.imageUrl)})` }}><span>Homepage hero preview</span></div>}
          </div>
          <div className="admin-question-form-actions"><button className="button" type="submit" disabled={isSaving}>{isSaving ? 'Saving…' : 'Save homepage'}<Save size={15} /></button></div>
        </form>}
      </>}
    </section>
  );
}