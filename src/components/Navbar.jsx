import { useEffect, useRef, useState } from 'react';
import { Check, ChevronDown, Globe2, Leaf, Moon, Sun, UserRound } from 'lucide-react';
import { useApp } from '../AppContext';

const languages = [
  { code: 'en', label: 'English' },
  { code: 'vi', label: 'Tiếng Việt' },
  { code: 'zh', label: '简体中文' },
  { code: 'ja', label: '日本語' },
  { code: 'fr', label: 'Français' },
  { code: 'ru', label: 'Русский' },
];

export default function Navbar() {
  const { language, setLanguage, theme, toggleTheme, t } = useApp();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isChangingLang, setIsChangingLang] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dropdownRef = useRef(null);
  const languageTimerRef = useRef(null);
  const activeLanguage = languages.find((option) => option.code === language) ?? languages[0];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => () => window.clearTimeout(languageTimerRef.current), []);

  const chooseLanguage = (nextLanguage) => {
    setIsMenuOpen(false);
    if (nextLanguage === language || isChangingLang) return;

    setIsChangingLang(true);
    languageTimerRef.current = window.setTimeout(() => {
      setLanguage(nextLanguage);
      setIsChangingLang(false);
    }, 1500);
  };

  return (
    <>
      {isChangingLang && (
        <div
          className="fixed left-0 top-0 z-[100] h-[2px] w-full animate-[pulse_1s_ease-in-out_infinite] bg-blue-500"
          role="status"
          aria-label={t.ui.changingLanguage}
        />
      )}
      <header className="sticky top-0 z-50 flex w-full items-center justify-between border-b border-zinc-200/80 bg-white/80 px-6 py-4 backdrop-blur-md transition-colors duration-300 dark:border-white/10 dark:bg-[#09090b]/80">
        <a href="#home" className="group flex items-center gap-2 text-lg font-semibold tracking-tight text-zinc-950 dark:text-zinc-100">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 transition-all duration-300 group-hover:bg-emerald-100 dark:bg-emerald-400/10 dark:text-emerald-300 dark:group-hover:bg-emerald-400/20">
            <Leaf size={17} strokeWidth={2.2} />
          </span>
          AgriNode
        </a>

        <nav className="hidden items-center gap-7 text-sm text-zinc-600 md:flex dark:text-zinc-400" aria-label="Primary navigation">
          {[
            ['home', '#home'],
            ['download', '#download'],
            ['contact', '#contact'],
            ['faq', '#faq'],
            ['docs', '#getting-started'],
          ].map(([key, href]) => (
            <a key={key} href={href} className="transition-colors duration-300 hover:text-zinc-950 dark:hover:text-zinc-100">
              {t.nav[key]}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={toggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-600 transition-all duration-300 hover:border-zinc-300 hover:bg-zinc-100 hover:text-zinc-950 dark:border-white/10 dark:bg-white/[0.04] dark:text-zinc-300 dark:hover:border-white/20 dark:hover:bg-white/10 dark:hover:text-white"
            aria-label={theme === 'dark' ? t.ui.switchToLight : t.ui.switchToDark}
            title={theme === 'dark' ? t.ui.switchToLight : t.ui.switchToDark}
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setIsMenuOpen((open) => !open)}
              className="flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-sm text-zinc-600 transition-all duration-300 hover:bg-zinc-100 hover:text-zinc-950 sm:px-3 dark:text-zinc-300 dark:hover:bg-white/10 dark:hover:text-zinc-100"
              aria-haspopup="listbox"
              aria-expanded={isMenuOpen}
            >
              <Globe2 size={16} />
              <span className="hidden sm:inline">{activeLanguage.label}</span>
              <ChevronDown size={14} className={`transition-transform duration-300 ${isMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-44 overflow-hidden rounded-xl border border-zinc-200 bg-white p-1.5 shadow-2xl shadow-zinc-200/70 dark:border-white/10 dark:bg-[#161619] dark:shadow-black/50">
                {languages.map((option) => (
                  <button
                    key={option.code}
                    type="button"
                    role="option"
                    aria-selected={language === option.code}
                    onClick={() => chooseLanguage(option.code)}
                    className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm text-zinc-600 transition-all duration-300 hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-400 dark:hover:bg-white/10 dark:hover:text-zinc-100"
                  >
                    {option.label}
                    {language === option.code && <Check size={14} className="text-blue-500 dark:text-blue-400" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => setIsLoggedIn((loggedIn) => !loggedIn)}
            className={isLoggedIn
              ? 'flex h-9 w-9 items-center justify-center rounded-full bg-blue-500 text-sm font-bold text-white transition-all duration-300 hover:bg-blue-400 hover:shadow-lg hover:shadow-blue-500/20'
              : 'rounded-lg bg-zinc-900 px-4 py-2 text-sm font-semibold text-white transition-all duration-300 hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-100'}
            aria-label={`${t.nav.login} (demo)`}
          >
            {isLoggedIn ? 'A' : <span className="flex items-center gap-1.5"><UserRound size={15} />{t.nav.login}</span>}
          </button>
        </div>
      </header>
    </>
  );
}
