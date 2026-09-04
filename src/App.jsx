import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import DownloadSection from './components/DownloadSection';
import GettingStarted from './components/GettingStarted';
import Footer from './components/Footer';
import AuthPage from './components/AuthPage';

export default function App() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  return (
    <div className="min-h-screen overflow-x-clip bg-white text-slate-900 transition-colors duration-300 dark:bg-[#09090b] dark:text-zinc-400">
      <Navbar onLogin={() => setIsAuthOpen(true)} />
      <main>
        <Hero />
        <DownloadSection />
        <GettingStarted />
      </main>
      <Footer />
      <AuthPage isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </div>
  );
}
