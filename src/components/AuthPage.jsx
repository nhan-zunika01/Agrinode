import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Check, Leaf, LockKeyhole, Mail, ShieldCheck, UserRound, X } from 'lucide-react';
import { useApp } from '../AppContext';

const emptyForm = {
  username: '',
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

function GoogleIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5">
      <path fill="#4285F4" d="M21.35 12.23c0-.71-.06-1.4-.18-2.05H12v3.88h5.24a4.48 4.48 0 0 1-1.94 2.94v2.44h3.14c1.84-1.7 2.91-4.2 2.91-7.21Z" />
      <path fill="#34A853" d="M12 21.75c2.63 0 4.84-.87 6.45-2.36l-3.14-2.44c-.87.58-1.98.92-3.31.92-2.54 0-4.7-1.72-5.47-4.03H3.29v2.52A9.74 9.74 0 0 0 12 21.75Z" />
      <path fill="#FBBC05" d="M6.53 13.84A5.85 5.85 0 0 1 6.22 12c0-.64.11-1.26.31-1.84V7.64H3.29A9.74 9.74 0 0 0 2.25 12c0 1.57.38 3.05 1.04 4.36l3.24-2.52Z" />
      <path fill="#EA4335" d="M12 6.13c1.43 0 2.7.49 3.71 1.46l2.78-2.78C16.84 3.23 14.63 2.25 12 2.25a9.74 9.74 0 0 0-8.71 5.39l3.24 2.52c.77-2.31 2.93-4.03 5.47-4.03Z" />
    </svg>
  );
}

function Field({ id, label, type = 'text', value, onChange, icon: Icon, error }) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-600 dark:text-zinc-400">
        {label}
      </label>
      <div className="group relative">
        <Icon aria-hidden="true" size={17} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-blue-400 dark:text-zinc-500" />
        <input
          id={id}
          name={id}
          type={type}
          value={value}
          onChange={onChange}
          required
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`h-14 w-full rounded-xl border bg-white pl-11 pr-4 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:bg-white focus:ring-4 dark:bg-[#121214] dark:text-zinc-100 dark:placeholder:text-zinc-600 dark:focus:bg-[#151519] ${error
            ? 'border-rose-400/60 focus:border-rose-400/80 focus:ring-rose-400/10'
            : 'border-white/10 focus:border-blue-400/60 focus:ring-blue-400/10'}`}
          placeholder={label}
        />
      </div>
      {error && <p id={`${id}-error`} className="text-xs font-medium text-rose-600 dark:text-rose-300">{error}</p>}
    </div>
  );
}

function TurnstilePlaceholder({ label, verified, onVerify }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-3.5 shadow-sm shadow-slate-200/60 dark:border-white/10 dark:bg-[#121214] dark:shadow-inner dark:shadow-white/[0.02]">
      {/* TODO: Replace this placeholder with <Turnstile sitekey={SITE_KEY} onVerify={onVerify} /> once the SiteKey is available. */}
      <button
        type="button"
        onClick={onVerify}
        aria-pressed={verified}
        className="flex w-full items-center gap-3 text-left"
      >
        <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md border transition-colors ${verified ? 'border-emerald-400/50 bg-emerald-50 text-emerald-600 dark:bg-emerald-400/15 dark:text-emerald-300' : 'border-slate-300 bg-white text-transparent dark:border-white/20 dark:bg-white/[0.03]'}`}>
          <Check size={16} strokeWidth={2.5} />
        </span>
        <span className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span className="text-sm font-medium text-slate-700 dark:text-zinc-200">{label}</span>
          <span className="text-[11px] text-slate-500 dark:text-zinc-500">Cloudflare Turnstile</span>
        </span>
        <ShieldCheck aria-hidden="true" size={22} className={verified ? 'text-emerald-500 dark:text-emerald-400' : 'text-slate-400 dark:text-zinc-600'} />
      </button>
    </div>
  );
}

export default function AuthPage({ isOpen = true, initialMode = 'login', onClose, onSubmit, onGoogleSignIn }) {
  const { t } = useApp();
  const [mode, setMode] = useState(initialMode === 'register' ? 'register' : 'login');
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [status, setStatus] = useState('');
  const isRegister = mode === 'register';

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose?.();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const switchMode = (nextMode) => {
    if (nextMode === mode) return;
    setMode(nextMode);
    setForm(emptyForm);
    setErrors({});
    setStatus('');
    setCaptchaVerified(false);
  };

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: '' }));
    setStatus('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = {};

    if (isRegister && form.password !== form.confirmPassword) {
      nextErrors.confirmPassword = t.auth.passMismatch;
    }

    if (!captchaVerified) {
      setStatus(t.auth.captcha);
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0 || !captchaVerified) return;

    onSubmit?.({ mode, ...form });
    setStatus(isRegister ? t.auth.register : t.auth.login);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[70] flex min-h-screen items-center justify-center overflow-y-auto bg-slate-900/25 px-4 py-6 backdrop-blur-xl sm:px-6 dark:bg-[#09090b]/85"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        role="presentation"
        onMouseDown={(event) => {
          if (event.target === event.currentTarget) onClose?.();
        }}
      >
        <motion.section
          role="dialog"
          aria-modal="true"
          aria-labelledby="auth-title"
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.98 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="relative my-auto w-full max-w-2xl overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white/95 shadow-2xl shadow-slate-900/20 dark:border-white/[0.13] dark:bg-[#0f0f12]/95 dark:shadow-black/60"
        >
          <div className="pointer-events-none absolute -left-20 -top-24 h-64 w-64 rounded-full bg-blue-500/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -right-10 h-56 w-56 rounded-full bg-emerald-400/10 blur-3xl" />
          <div className="pointer-events-none absolute inset-0 rounded-[1.75rem] ring-1 ring-inset ring-slate-900/[0.04] dark:ring-white/[0.04]" />

          <div className="relative p-6 sm:p-9">
            <div className="mb-8 flex items-start justify-between gap-4">
              <div>
                <div className="mb-5 flex items-center gap-2.5 text-sm font-semibold tracking-tight text-slate-900 dark:text-zinc-100">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-emerald-300/20 bg-emerald-400/10 text-emerald-300 shadow-lg shadow-emerald-500/10">
                    <Leaf size={18} />
                  </span>
                  AgriNode
                </div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-blue-400">Local-first access</p>
                <h1 id="auth-title" className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
                  {isRegister ? t.auth.register : t.auth.login}
                </h1>
                <p className="mt-2 max-w-md text-sm leading-6 text-slate-500 dark:text-zinc-500">
                  {isRegister ? t.auth.noAccount : t.auth.hasAccount}
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition-colors hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 dark:border-white/10 dark:text-zinc-500 dark:hover:border-white/20 dark:hover:bg-white/[0.06] dark:hover:text-white"
                aria-label="Close authentication dialog"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mb-7 grid grid-cols-2 rounded-xl border border-slate-200 bg-slate-50 p-1 dark:border-white/10 dark:bg-white/[0.025]">
              {[
                ['login', t.auth.login],
                ['register', t.auth.register],
              ].map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => switchMode(value)}
                  className={`relative rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors ${mode === value ? 'text-slate-900 dark:text-white' : 'text-slate-500 hover:text-slate-900 dark:text-zinc-500 dark:hover:text-zinc-300'}`}
                  aria-pressed={mode === value}
                >
                  {mode === value && (
                    <motion.span layoutId="auth-mode-pill" className="absolute inset-0 -z-0 rounded-lg bg-slate-200 ring-1 ring-inset ring-slate-300 dark:bg-white/10 dark:ring-white/10" transition={{ type: 'spring', stiffness: 420, damping: 32 }} />
                  )}
                  <span className="relative z-10">{label}</span>
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => onGoogleSignIn?.()}
              className="flex h-14 w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm font-semibold text-slate-700 shadow-sm shadow-slate-200/50 transition-all hover:border-slate-300 hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-blue-400/10 dark:border-white/10 dark:bg-white/[0.045] dark:text-zinc-100 dark:hover:border-white/20 dark:hover:bg-white/[0.08]"
            >
              <GoogleIcon />
              {t.auth.googleBtn}
            </button>

            <div className="my-7 flex items-center gap-4" aria-hidden="true">
              <span className="h-px flex-1 bg-slate-200 dark:bg-white/10" />
              <span className="text-[11px] font-semibold tracking-[0.22em] text-slate-500 dark:text-zinc-600">{t.auth.or}</span>
              <span className="h-px flex-1 bg-slate-200 dark:bg-white/10" />
            </div>

            <AnimatePresence mode="wait" initial={false}>
              <motion.form
                key={mode}
                onSubmit={handleSubmit}
                initial={{ opacity: 0, x: mode === 'register' ? 18 : -18 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: mode === 'register' ? -18 : 18 }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
                className="space-y-5"
              >
                {isRegister && (
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field id="username" label={t.auth.username} value={form.username} onChange={updateField} icon={UserRound} error={errors.username} />
                    <Field id="fullName" label={t.auth.fullName} value={form.fullName} onChange={updateField} icon={UserRound} error={errors.fullName} />
                  </div>
                )}

                <Field id="email" label={t.auth.email} type="email" value={form.email} onChange={updateField} icon={Mail} error={errors.email} />

                <div className={isRegister ? 'grid gap-5 sm:grid-cols-2' : ''}>
                  <Field id="password" label={t.auth.password} type="password" value={form.password} onChange={updateField} icon={LockKeyhole} error={errors.password} />
                  {isRegister && (
                    <div className="mt-5 sm:mt-0">
                      <Field id="confirmPassword" label={t.auth.confirmPassword} type="password" value={form.confirmPassword} onChange={updateField} icon={LockKeyhole} error={errors.confirmPassword} />
                    </div>
                  )}
                </div>

                <div className="space-y-2 pt-1">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-600 dark:text-zinc-400">{t.auth.captcha}</p>
                  <TurnstilePlaceholder label={t.auth.captcha} verified={captchaVerified} onVerify={() => { setCaptchaVerified((verified) => !verified); setStatus(''); }} />
                </div>

                <AnimatePresence initial={false}>
                  {status && (
                    <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} role="status" className={`text-sm ${status === t.auth.captcha ? 'text-amber-300' : 'text-emerald-300'}`}>
                      {status}
                    </motion.p>
                  )}
                </AnimatePresence>

                <button
                  type="submit"
                  className="group flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-blue-500 px-5 text-sm font-bold text-white shadow-xl shadow-blue-500/20 transition-all hover:bg-blue-400 hover:shadow-blue-400/25 focus:outline-none focus:ring-4 focus:ring-blue-400/20"
                >
                  {isRegister ? t.auth.register : t.auth.login}
                  <ArrowRight size={17} className="transition-transform duration-200 group-hover:translate-x-0.5" />
                </button>
              </motion.form>
            </AnimatePresence>

            <p className="mt-7 text-center text-xs leading-5 text-slate-500 dark:text-zinc-600">
              AgriNode keeps your farm data local, secure, and under your control.
            </p>
          </div>
        </motion.section>
      </motion.div>
    </AnimatePresence>
  );
}
