import Navbar from './components/Navbar';
import Hero from './components/Hero';
import DownloadSection from './components/DownloadSection';
import GettingStarted from './components/GettingStarted';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen overflow-x-clip bg-white text-zinc-900 transition-colors duration-300 dark:bg-[#09090b] dark:text-zinc-400">
      <Navbar />
      <main>
        <Hero />
        <DownloadSection />
        <GettingStarted />
      </main>
      <Footer />
    </div>
  );
}
