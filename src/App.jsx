import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Hero from './sections/Hero.jsx';
import BuildStory from './sections/BuildStory.jsx';
import Materials from './sections/Materials.jsx';
import Portfolio from './sections/Portfolio.jsx';
import Process from './sections/Process.jsx';
import About from './sections/About.jsx';
import CTASection from './sections/CTASection.jsx';

export default function App() {
  return (
    <div className="relative min-h-screen bg-ink-950 text-stone-100">
      <Navbar />
      <main>
        <Hero />
        <BuildStory />
        <Materials />
        <Portfolio />
        <Process />
        <About />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
