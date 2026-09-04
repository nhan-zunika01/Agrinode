import { ArrowUpRight, CircuitBoard, Database, SlidersHorizontal, Smartphone } from 'lucide-react';
import { useApp } from '../AppContext';

const stepMeta = [
  { number: '01', icon: CircuitBoard, key: 's1' },
  { number: '02', icon: Database, key: 's2' },
  { number: '03', icon: Smartphone, key: 's3' },
  { number: '04', icon: SlidersHorizontal, key: 's4' },
];

export default function GettingStarted() {
  const { t } = useApp();

  return (
    <section id="getting-started" className="bg-white px-6 py-24 transition-colors duration-300 sm:py-32 dark:bg-[#09090b]">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl"><p className="text-sm font-medium text-emerald-600 dark:text-emerald-300">{t.steps.eyebrow}</p><h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-zinc-100">{t.steps.title}</h2><p className="mt-4 text-slate-600 dark:text-zinc-400">{t.steps.description}</p></div>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stepMeta.map(({ number, icon: Icon, key }) => {
            const step = t.steps[key];
            return (
              <article key={number} className="group relative flex min-h-[288px] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/60 transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-md hover:shadow-slate-200/70 dark:border-white/10 dark:bg-[#121214] dark:shadow-none dark:hover:border-white/30 dark:hover:bg-white/[0.03] dark:hover:shadow-none">
                <span className="absolute right-5 top-4 text-5xl font-bold tracking-tighter text-slate-900/[0.06] dark:text-white/[0.035]">{number}</span>
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-800 dark:bg-white/[0.05] dark:text-zinc-100"><Icon size={19} /></span>
                <p className="mt-7 text-xs font-semibold tracking-wider text-slate-500 dark:text-zinc-600">{t.ui.step} {number}</p>
                <h3 className="mt-2 text-lg font-semibold text-slate-900 dark:text-zinc-100">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-zinc-400">{step.desc}</p>
                <a href="#contact" className="mt-auto inline-flex items-center gap-1 pt-6 text-sm font-medium text-slate-700 transition-all duration-300 group-hover:gap-2 group-hover:text-slate-900 dark:text-zinc-300 dark:group-hover:text-white">{step.link} <ArrowUpRight size={14} /></a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
