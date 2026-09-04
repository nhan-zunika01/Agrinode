import { ChevronDown, Github, Leaf, Mail, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import { useApp } from '../AppContext';

export default function Footer() {
  const { t } = useApp();
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <footer id="contact" className="border-t border-slate-200 bg-slate-50 px-6 pt-20 transition-colors duration-300 dark:border-white/[0.08] dark:bg-[#0c0c0e]">
      <div id="faq" className="mx-auto grid max-w-6xl gap-10 pb-20 lg:grid-cols-[0.85fr_1.15fr]">
        <div><p className="text-sm font-medium text-blue-600 dark:text-blue-300">{t.ui.faq}</p><h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 dark:text-zinc-100">{t.footer.title}</h2><p className="mt-4 max-w-md text-slate-600 dark:text-zinc-400">{t.footer.description}</p><a href="mailto:hello@agrinode.local" className="mt-7 inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm shadow-slate-200/50 transition-all duration-300 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 dark:border-white/10 dark:bg-transparent dark:text-zinc-200 dark:shadow-none dark:hover:bg-white/10 dark:hover:text-white"><Mail size={15} />{t.ui.contactProject}</a></div>
        <div className="divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white px-5 shadow-sm shadow-slate-200/50 sm:px-7 dark:divide-white/[0.08] dark:border-white/10 dark:bg-[#121214] dark:shadow-none">
          {t.footer.faqs.map(({ question, answer }, index) => {
            const isOpen = openFaq === index;
            return (
              <div key={question}>
                <button type="button" onClick={() => setOpenFaq(isOpen ? -1 : index)} className="flex w-full items-center justify-between gap-5 py-5 text-left text-sm font-medium text-slate-700 transition-colors duration-300 hover:text-slate-900 dark:text-zinc-200 dark:hover:text-white" aria-expanded={isOpen}>
                  {question}<ChevronDown size={17} className={`shrink-0 text-zinc-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                <div className={`grid transition-[grid-template-rows] duration-300 ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}><div className="overflow-hidden"><p className="pb-5 text-sm leading-relaxed text-slate-600 dark:text-zinc-400">{answer}</p></div></div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="mx-auto flex max-w-6xl flex-col gap-5 border-t border-slate-200 py-7 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between dark:border-white/[0.08]">
        <a href="#home" className="flex items-center gap-2 text-sm font-semibold text-slate-800 dark:text-zinc-200"><span className="flex h-7 w-7 items-center justify-center rounded-md bg-emerald-50 text-emerald-600 dark:bg-emerald-400/10 dark:text-emerald-300"><Leaf size={14} /></span>AgriNode</a>
        <p>{t.footer.copyright}</p>
        <div className="flex items-center gap-4"><a href="#home" aria-label={t.ui.security} className="transition-colors hover:text-slate-800 dark:hover:text-zinc-200"><ShieldCheck size={16} /></a><a href="#home" aria-label={t.ui.github} className="transition-colors hover:text-slate-800 dark:hover:text-zinc-200"><Github size={16} /></a></div>
      </div>
    </footer>
  );
}
