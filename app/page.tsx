'use client';

import { LanguageProvider } from '@/lib/LanguageContext';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import StatsBar from '@/components/StatsBar';
import Services from '@/components/Services';
import FlowDiagram from '@/components/FlowDiagram';
import About from '@/components/About';
import WhyChoose from '@/components/WhyChoose';
import CTA from '@/components/CTA';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';

export default function Home() {
  return (
    <LanguageProvider>
      <Navbar />
      <Hero />
      <StatsBar />
      <Services />
      <FlowDiagram />
      <About />
      <WhyChoose />
      <CTA />
      <Contact />
      <Footer />
      <WhatsAppButton />
    </LanguageProvider>
  );
}
