import { useState } from 'react';
import { motion } from 'framer-motion';
import { Apple, Box, CheckCircle2, Download, Monitor, Server, Smartphone, Terminal } from 'lucide-react';
import { useApp } from '../AppContext';

const cardClass = 'rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm shadow-zinc-200/50 transition-all duration-300 hover:-translate-y-1 hover:border-zinc-300 hover:shadow-xl hover:shadow-zinc-200/50 sm:p-8 dark:border-white/10 dark:bg-[#121214] dark:shadow-none dark:hover:border-white/30 dark:hover:bg-white/[0.03] dark:hover:shadow-none';
const buttonClass = 'inline-flex items-center justify-center rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-xs font-medium text-zinc-700 transition-all duration-300 hover:border-zinc-300 hover:bg-zinc-100 hover:text-zinc-950 dark:border-white/10 dark:bg-white/[0.04] dark:text-zinc-200 dark:hover:bg-white/10 dark:hover:text-white';

function PlatformCard({ icon: Icon, eyebrow, title, description, children, size }) {
  return (
    <article className={`${cardClass} flex min-h-[280px] flex-col`}>
      <div className="mb-8 flex items-start justify-between">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-zinc-200 bg-zinc-50 text-zinc-800 dark:border-white/10 dark:bg-white/[0.04] dark:text-zinc-100"><Icon size={20} /></span>
        <span className="rounded-full bg-zinc-100 px-2.5 py-1 text-[11px] text-zinc-500 dark:bg-white/[0.05]">{size}</span>
      </div>
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-blue-600 dark:text-blue-300">{eyebrow}</p>
      <h3 className="mt-2 text-xl font-semibold text-zinc-950 dark:text-zinc-100">{title}</h3>
      <p className="mt-3 max-w-xs text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{description}</p>
      <div className="mt-auto flex flex-wrap gap-2 pt-7">{children}</div>
    </article>
  );
}

function ClientGrid() {
  const { t } = useApp();

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="grid gap-4 lg:grid-cols-3"
    >
      <PlatformCard icon={Monitor} eyebrow={t.ui.desktopApp} title="Windows" size="124 MB" description={t.ui.completeControl}>
        <button className={buttonClass}>{t.download.btn} amd64</button><button className={buttonClass}>{t.download.btn} x86</button><button className={buttonClass}>{t.download.btn} arm64</button>
      </PlatformCard>
      <PlatformCard icon={Apple} eyebrow={t.ui.desktopApp} title="macOS" size="98 MB" description={t.ui.nativeOptimization}>
        <button className={`${buttonClass} gap-1.5`}><Download size={13} />{t.ui.downloadUniversal}</button>
      </PlatformCard>
      <PlatformCard icon={Smartphone} eyebrow={t.ui.mobileApp} title="Mobile" size="45 MB" description={t.ui.remoteMonitoring}>
        <button className={buttonClass}>.APK</button><button className={buttonClass}>App Store</button>
      </PlatformCard>
    </motion.div>
  );
}

function ServerGrid() {
  const { t } = useApp();

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="grid gap-4 lg:grid-cols-2"
    >
      <PlatformCard icon={Server} eyebrow={t.ui.localInfrastructure} title="Windows Server" size="One-click setup" description={t.ui.packagedServer}>
        <button className={`${buttonClass} gap-1.5`}><Download size={13} />{t.ui.downloadServer}</button>
      </PlatformCard>
      <article className={`${cardClass} flex min-h-[280px] flex-col`}>
        <div className="mb-8 flex items-start justify-between"><span className="flex h-11 w-11 items-center justify-center rounded-xl border border-zinc-200 bg-zinc-50 text-zinc-800 dark:border-white/10 dark:bg-white/[0.04] dark:text-zinc-100"><Box size={20} /></span><span className="rounded-full bg-zinc-100 px-2.5 py-1 text-[11px] text-zinc-500 dark:bg-white/[0.05]">Docker</span></div>
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-blue-600 dark:text-blue-300">{t.ui.selfHosted}</p>
        <h3 className="mt-2 text-xl font-semibold text-zinc-950 dark:text-zinc-100">Linux (Docker)</h3>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{t.ui.optimalDeployment}</p>
        <div className="mt-auto flex items-center gap-2 overflow-x-auto rounded-lg border border-zinc-200 bg-zinc-50 p-3 font-mono text-xs text-emerald-700 dark:border-white/[0.08] dark:bg-black/30 dark:text-emerald-300"><Terminal size={14} className="shrink-0 text-zinc-400 dark:text-zinc-500" /><code>docker-compose -f agrinode-server.yml up -d</code></div>
      </article>
    </motion.div>
  );
}

export default function DownloadSection() {
  const { t } = useApp();
  const [activeTab, setActiveTab] = useState('client');

  return (
    <section id="download" className="relative border-y border-zinc-200 bg-zinc-50 px-6 py-24 transition-colors duration-300 sm:py-32 dark:border-white/[0.06] dark:bg-[#0c0c0e]">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div><p className="text-sm font-medium text-blue-600 dark:text-blue-300">{t.download.eyebrow}</p><h2 className="mt-3 text-3xl font-bold tracking-tight text-zinc-950 sm:text-4xl dark:text-zinc-100">{t.download.title}</h2><p className="mt-4 max-w-2xl text-zinc-600 dark:text-zinc-400">{t.download.description}</p></div>
          <div className="relative flex rounded-xl border border-zinc-200 bg-white p-1 shadow-sm shadow-zinc-200/50 dark:border-white/10 dark:bg-black/20 dark:shadow-none" role="tablist" aria-label={t.download.title}>
            {[
              ['client', t.download.tabClient],
              ['server', t.download.tabServer],
            ].map(([id, label]) => (
              <button key={id} type="button" role="tab" aria-selected={activeTab === id} onClick={() => setActiveTab(id)} className={`relative z-10 rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-300 ${activeTab === id ? 'text-zinc-950 dark:text-zinc-100' : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300'}`}>
                {activeTab === id && <motion.div layoutId="active-tab" className="absolute inset-0 -z-10 rounded-lg bg-zinc-100 dark:bg-white/[0.12]" transition={{ type: 'spring', bounce: 0.18, duration: 0.45 }} />}
                {label}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-12">{activeTab === 'client' ? <ClientGrid /> : <ServerGrid />}</div>
        <div className="mt-6 flex items-center gap-2 text-xs text-zinc-500"><CheckCircle2 size={14} className="text-emerald-500 dark:text-emerald-400" /> {t.download.releaseNote}</div>
      </div>
    </section>
  );
}
