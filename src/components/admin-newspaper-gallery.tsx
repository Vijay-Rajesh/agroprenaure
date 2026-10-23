'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { CalendarDays, Eye, EyeOff, LoaderCircle, Pencil, Plus, Save, Trash2, Upload, X } from 'lucide-react';

type NewspaperImage = {
  id: string;
  title_en: string;
  title_ur: string;
  is_published: boolean;
  sort_order: number;
  created_at: string;
};

export default function AdminNewspaperGallery() {
  const [images, setImages] = useState<NewspaperImage[]>([]);
  const [titleEn, setTitleEn] = useState('');
  const [titleUr, setTitleUr] = useState('');
  const [editingImage, setEditingImage] = useState<NewspaperImage | null>(null);
  const [editTitleEn, setEditTitleEn] = useState('');
  const [editTitleUr, setEditTitleUr] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [busyImageId, setBusyImageId] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  async function reload() {
    const response = await fetch('/api/admin/newspapers', { cache: 'no-store' });
    const result = await response.json() as { images?: NewspaperImage[]; error?: string };
    if (!response.ok) throw new Error(result.error ?? 'Newspaper images could not be loaded.');
    setImages(result.images ?? []);
  }

  useEffect(() => {
    const controller = new AbortController();
    fetch('/api/admin/newspapers', { cache: 'no-store', signal: controller.signal })
      .then(async (response) => {
        const result = await response.json() as { images?: NewspaperImage[]; error?: string };
        if (!response.ok) throw new Error(result.error ?? 'Newspaper images could not be loaded.');
        setImages(result.images ?? []);
      })
      .catch((loadError: unknown) => {
        if (loadError instanceof Error && loadError.name !== 'AbortError') setError(loadError.message);
      })
      .finally(() => {
        if (!controller.signal.aborted) setIsLoading(false);
      });
    return () => controller.abort();
  }, []);

  async function uploadImage(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!file || isSaving) return;
    setIsSaving(true);
    setError('');
    setNotice('');
    const formData = new FormData();
    formData.set('image', file);
    formData.set('title_en', titleEn);
    formData.set('title_ur', titleUr);
    try {
      const response = await fetch('/api/admin/newspapers', { method: 'POST', body: formData });
      const result = await response.json() as { error?: string };
      if (!response.ok) throw new Error(result.error ?? 'Newspaper image could not be uploaded.');
      setTitleEn('');
      setTitleUr('');
      setFile(null);
      const fileInput = document.querySelector<HTMLInputElement>('#newspaper-image-file');
      if (fileInput) fileInput.value = '';
      setNotice('Newspaper image uploaded.');
      await reload();
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : 'Newspaper image could not be uploaded.');
    } finally {
      setIsSaving(false);
    }
  }

  async function updateVisibility(image: NewspaperImage) {
    setBusyImageId(image.id);
    setError('');
    setNotice('');
    try {
      const response = await fetch(`/api/admin/newspapers/${image.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_published: !image.is_published }),
      });
      const result = await response.json() as { error?: string };
      if (!response.ok) throw new Error(result.error ?? 'Image visibility could not be changed.');
      setNotice(image.is_published ? 'Newspaper image unpublished.' : 'Newspaper image published.');
      await reload();
    } catch (updateError) {
      setError(updateError instanceof Error ? updateError.message : 'Image visibility could not be changed.');
    } finally {
      setBusyImageId(null);
    }
  }

  function beginEditing(image: NewspaperImage) {
    setEditingImage(image);
    setEditTitleEn(image.title_en);
    setEditTitleUr(image.title_ur);
    setError('');
    setNotice('');
  }

  async function updateImage(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!editingImage || isSaving) return;
    setIsSaving(true);
    setError('');
    setNotice('');
    try {
      const response = await fetch(`/api/admin/newspapers/${editingImage.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title_en: editTitleEn, title_ur: editTitleUr }),
      });
      const result = await response.json() as { error?: string };
      if (!response.ok) throw new Error(result.error ?? 'Newspaper image could not be updated.');
      setEditingImage(null);
      setNotice('Newspaper details updated.');
      await reload();
    } catch (updateError) {
      setError(updateError instanceof Error ? updateError.message : 'Newspaper image could not be updated.');
    } finally {
      setIsSaving(false);
    }
  }

  async function deleteImage(image: NewspaperImage) {
    if (!window.confirm(`Permanently remove "${image.title_en}" from the gallery?`)) return;
    setBusyImageId(image.id);
    setError('');
    setNotice('');
    try {
      const response = await fetch(`/api/admin/newspapers/${image.id}`, { method: 'DELETE' });
      const result = await response.json() as { error?: string };
      if (!response.ok) throw new Error(result.error ?? 'Newspaper image could not be removed.');
      setNotice('Newspaper image removed.');
      await reload();
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : 'Newspaper image could not be removed.');
    } finally {
      setBusyImageId(null);
    }
  }

  return (
    <section className="admin-cms-panel" aria-labelledby="newspaper-admin-title">
      <div className="admin-cms-list-heading">
        <div>
          <h3 id="newspaper-admin-title">Newspaper gallery</h3>
          <p>Manage newspaper coverage shown in the public gallery. The newest upload is displayed first.</p>
        </div>
        <span className="admin-question-type">{images.length} newspaper{images.length === 1 ? '' : 's'}</span>
      </div>

      {error && <p className="admin-error admin-page-error" role="alert">{error}</p>}
      {notice && <p className="admin-question-notice" role="status">{notice}</p>}

      <form className="admin-cms-form" onSubmit={uploadImage}>
        <div className="admin-question-editor-heading">
          <h4><Plus size={17} /> Add a newspaper page</h4>
        </div>
        <div className="admin-cms-grid">
          <label className="admin-question-field">
            <span>Title (English) *</span>
            <input className="admin-question-input" value={titleEn} onChange={(event) => setTitleEn(event.target.value)} maxLength={180} required />
          </label>
          <label className="admin-question-field" dir="rtl">
            <span>عنوان (اردو)</span>
            <input className="admin-question-input" value={titleUr} onChange={(event) => setTitleUr(event.target.value)} maxLength={180} />
          </label>
          <label className="admin-question-field admin-cms-full">
            <span>Newspaper image *</span>
            <input
              id="newspaper-image-file"
              className="admin-question-input"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={(event) => setFile(event.target.files?.[0] ?? null)}
              required
            />
            <small>Choose a clear newspaper scan (maximum 4 MB).</small>
          </label>
        </div>
        <div className="admin-question-form-actions">
          <button className="button" type="submit" disabled={isSaving || !file}>
            {isSaving ? <><LoaderCircle className="admin-toggle-spinner" size={15} />Uploading…</> : <><Upload size={15} />Upload newspaper</>}
          </button>
        </div>
      </form>

      {editingImage && (
        <form className="admin-cms-form newspaper-admin-edit-form" onSubmit={updateImage}>
          <div className="admin-question-editor-heading">
            <div>
              <h4><Pencil size={16} /> Edit newspaper details</h4>
              <p>Update the English and Urdu titles. The uploaded image will stay unchanged.</p>
            </div>
            <button className="admin-icon-button" type="button" aria-label="Cancel editing" onClick={() => setEditingImage(null)}><X size={16} /></button>
          </div>
          <div className="admin-cms-grid">
            <label className="admin-question-field">
              <span>Title (English) *</span>
              <input className="admin-question-input" value={editTitleEn} onChange={(event) => setEditTitleEn(event.target.value)} maxLength={180} required />
            </label>
            <label className="admin-question-field" dir="rtl">
              <span>عنوان (اردو)</span>
              <input className="admin-question-input" value={editTitleUr} onChange={(event) => setEditTitleUr(event.target.value)} maxLength={180} />
            </label>
          </div>
          <div className="admin-question-form-actions">
            <button className="button button-outline" type="button" disabled={isSaving} onClick={() => setEditingImage(null)}>Cancel</button>
            <button className="button" type="submit" disabled={isSaving}>
              {isSaving ? <><LoaderCircle className="admin-toggle-spinner" size={15} />Saving…</> : <><Save size={15} />Save changes</>}
            </button>
          </div>
        </form>
      )}

      {isLoading ? (
        <p className="admin-question-empty" role="status">Loading newspaper images…</p>
      ) : images.length ? (
        <div className="newspaper-admin-table-wrap">
          <table className="newspaper-admin-table">
            <thead>
              <tr><th scope="col">Newspaper</th><th scope="col">Titles</th><th scope="col">Uploaded</th><th scope="col">Status</th><th scope="col">Actions</th></tr>
            </thead>
            <tbody>
              {images.map((image, index) => (
                <tr key={image.id}>
                  <td data-label="Newspaper">
                    <div className="newspaper-admin-preview">
                      {image.is_published ? (
                        <Image
                          src={`/api/newspapers/${image.id}/image`}
                          alt=""
                          width={64}
                          height={78}
                          unoptimized
                          className="newspaper-admin-thumbnail"
                        />
                      ) : (
                        <span className="newspaper-admin-thumbnail newspaper-admin-draft-thumb">Draft</span>
                      )}
                      {index === 0 && <span className="newspaper-admin-latest">Latest</span>}
                    </div>
                  </td>
                  <td data-label="Titles">
                    <strong className="newspaper-admin-title">{image.title_en}</strong>
                    {image.title_ur && <span className="newspaper-admin-urdu" dir="rtl">{image.title_ur}</span>}
                  </td>
                  <td data-label="Uploaded">
                    <span className="newspaper-admin-date"><CalendarDays size={14} />{new Date(image.created_at).toLocaleDateString('en-PK', { dateStyle: 'medium' })}</span>
                  </td>
                  <td data-label="Status">
                    <span className={`newspaper-admin-status ${image.is_published ? 'is-published' : ''}`}>{image.is_published ? 'Published' : 'Unpublished'}</span>
                  </td>
                  <td data-label="Actions">
                    <div className="newspaper-admin-actions">
                      <button className="admin-icon-button" type="button" aria-label={`Edit ${image.title_en}`} onClick={() => beginEditing(image)}><Pencil size={15} /></button>
                      <button className="admin-icon-button" type="button" disabled={busyImageId === image.id} aria-label={image.is_published ? `Unpublish ${image.title_en}` : `Publish ${image.title_en}`} onClick={() => void updateVisibility(image)}>
                        {busyImageId === image.id ? <LoaderCircle className="admin-toggle-spinner" size={15} /> : image.is_published ? <EyeOff size={15} /> : <Eye size={15} />}
                      </button>
                      <button className="admin-icon-button newspaper-admin-delete" type="button" disabled={busyImageId === image.id} aria-label={`Remove ${image.title_en}`} onClick={() => void deleteImage(image)}><Trash2 size={15} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="admin-question-empty">No newspaper images yet. Upload a scan to add the first gallery item.</p>
      )}
    </section>
  );
}
