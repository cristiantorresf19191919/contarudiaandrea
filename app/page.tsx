'use client';

import { LanguageProvider } from '@/lib/LanguageContext';
import Navbar from '@/components/Navbar';
import ScrollProgress from '@/components/ScrollProgress';
import Hero from '@/components/Hero';
import StatsBar from '@/components/StatsBar';
import ClientMarquee from '@/components/ClientMarquee';
import TrustBadges from '@/components/TrustBadges';
import Services from '@/components/Services';
import RiskQuiz from '@/components/RiskQuiz';
import TaxCalculator from '@/components/TaxCalculator';
import FlowDiagram from '@/components/FlowDiagram';
import PricingSection from '@/components/PricingSection';
import Testimonials from '@/components/Testimonials';
import ResultsTimeline from '@/components/ResultsTimeline';
import About from '@/components/About';
import WhyChoose from '@/components/WhyChoose';
import FAQ from '@/components/FAQ';
import BlogPreview from '@/components/BlogPreview';
import CTA from '@/components/CTA';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import SocialProofToast from '@/components/SocialProofToast';
import BackToTop from '@/components/BackToTop';
import MobileCTA from '@/components/MobileCTA';

export default function Home() {
  return (
    <LanguageProvider>
      <ScrollProgress />
      <Navbar />
      <Hero />
      <StatsBar />
      <ClientMarquee />
      <TrustBadges />
      <Services />
      <RiskQuiz />
      <TaxCalculator />
      <FlowDiagram />
      <PricingSection />
      <Testimonials />
      <ResultsTimeline />
      <About />
      <WhyChoose />
      <FAQ />
      <BlogPreview />
      <CTA />
      <Contact />
      <Footer />
      <WhatsAppButton />
      <SocialProofToast />
      <BackToTop />
      <MobileCTA />
    </LanguageProvider>
  );
}
