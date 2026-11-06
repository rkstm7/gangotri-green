import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import LegacySection from './components/LegacySection';
import WhySection from './components/WhySection';
import ProjectsSection from './components/ProjectsSection';
import ProjectVideoSection from './components/ProjectVideoSection';
import TestimonialsSection from './components/TestimonialsSection';
import LuxurySection from './components/LuxurySection';
import ContactSection from './components/ContactSection';
import FooterSection from './components/FooterSection';
import WhatsAppButton from './components/WhatsAppButton';
import NotFoundPage from './components/NotFoundPage';
import WelcomeScreen from './components/WelcomeScreen';

/* ── Main landing page ── */
const HomePage = () => {
  const [showWelcome, setShowWelcome] = useState(true);

  const handleEnter = () => {
    setShowWelcome(false);
  };

  return (
    <>
      {showWelcome && <WelcomeScreen onEnter={handleEnter} />}
      <div style={{ minHeight: '100vh', background: 'white' }}>
        <div style={{ position: 'relative' }}>
          <Navbar />
          <HeroSection />
        </div>
        <AboutSection />
        <LegacySection />
        <WhySection />
        <ProjectVideoSection />
        <ProjectsSection />
        <TestimonialsSection />
        <LuxurySection />
        <ContactSection />
        <FooterSection />
        <WhatsAppButton />
      </div>
    </>
  );
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      {/* Catch all unknown routes → 404 page */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
