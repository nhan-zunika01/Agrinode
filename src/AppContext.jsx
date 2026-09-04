import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { translations } from './i18n/translations';

const AppContext = createContext(null);

const getInitialTheme = () => {
  const saved = window.localStorage.getItem('agrinode-theme');
  return saved === 'dark' ? 'dark' : 'light'; // light is the default
};

const getInitialLanguage = () => {
  const saved = window.localStorage.getItem('agrinode-lang');
  return saved && translations[saved] ? saved : 'en';
};

export function AppProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme);
  const [language, setLanguage] = useState(getInitialLanguage);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
    root.style.colorScheme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#09090b' : '#ffffff');
    window.localStorage.setItem('agrinode-theme', theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.lang = language;
    window.localStorage.setItem('agrinode-lang', language);
  }, [language]);

  const value = useMemo(
    () => ({
      theme,
      toggleTheme: () => setTheme((current) => (current === 'dark' ? 'light' : 'dark')),
      language,
      setLanguage,
      t: translations[language] ?? translations.en,
    }),
    [theme, language],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}
