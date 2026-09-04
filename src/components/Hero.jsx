import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Activity, ArrowDown, Droplets, Gauge, MoreHorizontal, Sprout, Wifi } from 'lucide-react';
import { useApp } from '../AppContext';
import WaitlistForm from './WaitlistForm';

function SensorRow({ icon: Icon, label, value, detail, color }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-3 shadow-sm shadow-slate-200/50 dark:border-white/[0.07] dark:bg-white/[0.025]">
      <div className="flex items-center gap-2.5">
        <span className={`flex h-8 w-8 items-center justify-center rounded-lg ${color}`}><Icon size={15} /></span>
        <div>
          <p className="text-xs font-medium text-slate-700 dark:text-zinc-200">{label}</p>
          <p className="mt-0.5 text-[10px] text-slate-500 dark:text-zinc-500">{detail}</p>
        </div>
      </div>
      <span className="text-sm font-semibold text-slate-900 dark:text-zinc-100">{value}</span>
    </div>
  );
}

export default function Hero() {
  const { t } = useApp();
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const textOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const textScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);
  const dashboardY = useTransform(scrollYProgress, [0, 0.75], [200, -150]);

  const scrollToDownload = () => {
    document.getElementById('download')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const sidebarItems = [t.ui.overview, t.ui.edgeNodes, t.ui.irrigation, t.ui.automation];

  return (
    <section id="home" ref={sectionRef} className="relative h-[150vh] bg-white transition-colors duration-300 dark:bg-[#09090b]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[80vh] bg-[radial-gradient(circle_at_50%_15%,rgba(37,99,235,0.11),transparent_52%)] dark:bg-[radial-gradient(circle_at_50%_15%,rgba(37,99,235,0.16),transparent_52%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-full opacity-70 [mask-image:linear-gradient(to_bottom,black,transparent_72%)] grid-fade dark:opacity-40" />

      <div className="sticky top-[20vh] z-10 mx-auto max-w-6xl px-6">
        <motion.div style={{ opacity: textOpacity, scale: textScale }} className="mx-auto max-w-4xl text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700 dark:border-emerald-400/15 dark:bg-emerald-400/[0.07] dark:text-emerald-200">
            <span className="relative flex h-1.5 w-1.5"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75 dark:bg-emerald-300" /><span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500 dark:bg-emerald-300" /></span>
            {t.ui.heroBadge}
          </div>
          <h1 className="text-5xl font-bold tracking-tight text-slate-900 sm:text-6xl lg:text-7xl dark:text-zinc-100">
            {t.hero.title}
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-slate-600 sm:text-xl dark:text-zinc-400">
            {t.hero.subtitle}
          </p>
          <button
            type="button"
            onClick={scrollToDownload}
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-xl hover:shadow-slate-900/10 dark:bg-white dark:text-black dark:hover:bg-white/90 dark:hover:shadow-white/10"
          >
            {t.hero.btn} <ArrowDown size={16} />
          </button>
          <p className="mt-4 text-xs font-medium tracking-wide text-slate-500">{t.hero.note}</p>
          <div className="mx-auto mt-8 max-w-4xl">
            <WaitlistForm />
          </div>
        </motion.div>

        <motion.div style={{ y: dashboardY }} className="relative mx-auto mt-8 max-w-5xl sm:mt-10">
          <div className="absolute -inset-8 -z-10 rounded-[2.25rem] bg-blue-500/10 blur-3xl dark:bg-blue-500/15" />
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md shadow-slate-200/70 ring-1 ring-slate-900/[0.03] dark:border-white/10 dark:bg-[#111114] dark:shadow-glow dark:ring-white/[0.03]">
            <div className="flex h-11 items-center justify-between border-b border-slate-200 bg-slate-50 px-4 dark:border-white/[0.08] dark:bg-[#151518]">
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-300/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
              </div>
              <div className="rounded-md border border-slate-200 bg-slate-100 px-12 py-1 text-[10px] text-slate-500 dark:border-white/[0.06] dark:bg-black/20">{t.ui.dashboardUrl}</div>
              <MoreHorizontal size={17} className="text-slate-400 dark:text-zinc-600" />
            </div>

            <div className="grid grid-cols-12 gap-3 p-3 sm:gap-4 sm:p-5">
              <aside className="col-span-3 hidden rounded-xl border border-slate-200 bg-slate-50 p-3 shadow-sm shadow-slate-200/50 sm:block dark:border-white/[0.06] dark:bg-black/10">
                <div className="mb-6 flex items-center gap-2 text-xs font-semibold text-slate-900 dark:text-zinc-100"><Sprout size={15} className="text-emerald-500 dark:text-emerald-300" /> {t.ui.field}</div>
                {sidebarItems.map((item, index) => (
                  <div key={item} className={`mb-1 rounded-lg px-2 py-2 text-[11px] ${index === 0 ? 'bg-slate-200 text-slate-900 dark:bg-white/[0.09] dark:text-white' : 'text-slate-500'}`}>{item}</div>
                ))}
                <div className="mt-9 rounded-lg border border-emerald-200 bg-emerald-50 p-2.5 dark:border-emerald-400/10 dark:bg-emerald-400/[0.05]">
                  <div className="flex items-center gap-1.5 text-[10px] text-emerald-600 dark:text-emerald-300"><Wifi size={11} /> {t.ui.nodesOnline}</div>
                </div>
              </aside>
              <div className="col-span-12 space-y-3 sm:col-span-9 sm:space-y-4">
                <div className="flex items-center justify-between">
                  <div><p className="text-xs text-slate-500">{t.ui.goodMorning}</p><h2 className="mt-1 text-sm font-semibold text-slate-900 sm:text-base dark:text-zinc-100">{t.ui.fieldOverview}</h2></div>
                  <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-2 py-1 text-[10px] text-emerald-600 dark:border-emerald-400/15 dark:bg-emerald-400/[0.06] dark:text-emerald-300">{t.ui.systemHealthy}</div>
                </div>
                <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
                  <SensorRow icon={Droplets} label={t.ui.soilMoisture} value="63%" detail={t.ui.idealRange} color="bg-blue-100 text-blue-600 dark:bg-blue-400/10 dark:text-blue-300" />
                  <SensorRow icon={Gauge} label={t.ui.airQuality} value="Good" detail={t.ui.clean} color="bg-violet-100 text-violet-600 dark:bg-violet-400/10 dark:text-violet-300" />
                  <SensorRow icon={Activity} label={t.ui.pumpStatus} value={t.ui.standby} detail={t.ui.nextRule} color="bg-amber-100 text-amber-600 dark:bg-amber-400/10 dark:text-amber-300" />
                </div>
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 shadow-sm shadow-slate-200/50 sm:p-4 dark:border-white/[0.07] dark:bg-white/[0.025]">
                  <div className="mb-4 flex items-center justify-between"><div><p className="text-xs font-medium text-slate-700 dark:text-zinc-200">{t.ui.moistureTrend}</p><p className="mt-1 text-[10px] text-slate-500">{t.ui.lastHours}</p></div><span className="text-[10px] text-emerald-600 dark:text-emerald-300">+4.8%</span></div>
                  <div className="relative h-24 overflow-hidden sm:h-28">
                    <div className="absolute inset-x-0 top-1/4 border-t border-dashed border-slate-200 dark:border-white/[0.08]" /><div className="absolute inset-x-0 top-2/4 border-t border-dashed border-slate-200 dark:border-white/[0.08]" /><div className="absolute inset-x-0 top-3/4 border-t border-dashed border-slate-200 dark:border-white/[0.08]" />
                    <svg viewBox="0 0 640 120" preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible">
                      <defs><linearGradient id="chartFill" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#60a5fa" stopOpacity=".28" /><stop offset="100%" stopColor="#60a5fa" stopOpacity="0" /></linearGradient></defs>
                      <path d="M0,83 C35,74 65,86 95,73 S150,66 180,72 S220,83 250,68 S302,42 338,55 S380,75 414,60 S466,28 502,44 S550,64 580,39 S620,31 640,20 L640,120 L0,120 Z" fill="url(#chartFill)" />
                      <path d="M0,83 C35,74 65,86 95,73 S150,66 180,72 S220,83 250,68 S302,42 338,55 S380,75 414,60 S466,28 502,44 S550,64 580,39 S620,31 640,20" fill="none" stroke="#60a5fa" strokeLinecap="round" strokeWidth="2" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
