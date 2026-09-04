import { useState } from 'react';
import { ArrowRight, CheckCircle2, LoaderCircle } from 'lucide-react';
import { useApp } from '../AppContext';

const initialForm = { email: '', full_name: '' };

export default function WaitlistForm() {
  const { t } = useApp();
  const copy = t.waitlist;
  const [form, setForm] = useState(initialForm);
  const [state, setState] = useState('idle');
  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setError('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setState('loading');
    setError('');

    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          email: form.email.trim(),
          full_name: form.full_name.trim(),
        }),
      });

      const payload = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(payload.error || copy.error);
      }

      setForm(initialForm);
      setState('success');
    } catch (submitError) {
      setState('error');
      setError(submitError.message || copy.error);
    }
  };

  if (state === 'success') {
    return (
      <div className="flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-left shadow-sm shadow-emerald-100 dark:border-emerald-400/20 dark:bg-emerald-400/10 dark:shadow-none" role="status">
        <CheckCircle2 className="shrink-0 text-emerald-600 dark:text-emerald-300" size={22} />
        <div>
          <p className="text-sm font-semibold text-emerald-900 dark:text-emerald-100">{copy.success}</p>
          <p className="mt-1 text-xs text-emerald-700 dark:text-emerald-200/80">{copy.successDetail}</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-md shadow-slate-200/60 sm:p-5 dark:border-white/10 dark:bg-[#121214] dark:shadow-none">
      <div className="mb-4">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600 dark:text-blue-300">{copy.eyebrow}</p>
        <p className="mt-2 text-sm font-semibold text-slate-900 dark:text-zinc-100">{copy.title}</p>
        <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-zinc-400">{copy.description}</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-[1fr_1fr_auto] sm:items-end">
        <label className="block">
          <span className="mb-1.5 block text-xs font-medium text-slate-700 dark:text-zinc-300">{copy.fullName}</span>
          <input
            name="full_name"
            type="text"
            value={form.full_name}
            onChange={handleChange}
            placeholder={copy.fullName}
            autoComplete="name"
            required
            className="h-11 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm text-slate-900 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-500/10 dark:border-white/10 dark:bg-white/[0.04] dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:bg-white/[0.07]"
          />
        </label>

        <label className="block">
          <span className="mb-1.5 block text-xs font-medium text-slate-700 dark:text-zinc-300">{copy.email}</span>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder={copy.email}
            autoComplete="email"
            required
            className="h-11 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm text-slate-900 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-500/10 dark:border-white/10 dark:bg-white/[0.04] dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:bg-white/[0.07]"
          />
        </label>

        <button
          type="submit"
          disabled={state === 'loading'}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 text-sm font-semibold text-white shadow-sm shadow-blue-600/20 transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500/20 disabled:cursor-wait disabled:opacity-70"
        >
          {state === 'loading' ? <LoaderCircle size={16} className="animate-spin" /> : <>{copy.submit}<ArrowRight size={16} /></>}
          <span className="sr-only">{state === 'loading' ? copy.submitting : copy.submit}</span>
        </button>
      </div>

      {state === 'error' && <p className="mt-3 text-xs font-medium text-rose-600 dark:text-rose-300" role="alert">{error}</p>}
    </form>
  );
}
