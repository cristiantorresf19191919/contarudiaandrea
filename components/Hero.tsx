'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { heroChild, heroVisual } from '@/lib/animations';
import Logo from './Logo';

const heroContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2, delayChildren: 0.3 } },
};

const credentialItem = {
  hidden: { opacity: 0, x: -15, filter: 'blur(3px)' },
  visible: {
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Hero() {
  const { t } = useLanguage();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const geo1Y = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const geo1X = useTransform(scrollYProgress, [0, 1], [0, 30]);
  const geo2Y = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const geo3Y = useTransform(scrollYProgress, [0, 1], [0, 25]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const waUrl = `https://wa.me/573022851810?text=${encodeURIComponent(t('wa_message'))}`;

  return (
    <section className="hero" id="hero" ref={ref}>
      {/* Parallax geometric shapes */}
      <motion.div
        className="hero-geo hero-geo-1"
        style={{ y: geo1Y, x: geo1X }}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
      />
      <motion.div
        className="hero-geo hero-geo-2"
        style={{ y: geo2Y }}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, ease: [0.22, 1, 0.36, 1], delay: 0.9 }}
      />
      <motion.div
        className="hero-geo hero-geo-3"
        style={{ y: geo3Y }}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, ease: [0.22, 1, 0.36, 1], delay: 1.2 }}
      />

      <div className="container hero-grid">
        <motion.div
          className="hero-content"
          variants={heroContainer}
          initial="hidden"
          animate="visible"
          style={{ y: contentY, opacity: contentOpacity }}
        >
          <motion.div className="hero-badge" variants={heroChild}>
            {t('hero_badge')}
          </motion.div>
          <motion.h1 variants={heroChild}>
            <span className="highlight">Andrea</span>
            <br />
            La Torre
          </motion.h1>
          <motion.p className="hero-subtitle" variants={heroChild}>
            {t('hero_subtitle')}
          </motion.p>
          <motion.div
            className="hero-credentials"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.15, delayChildren: 0.15 } },
            }}
          >
            <motion.span variants={credentialItem}>{t('hero_cred1')}</motion.span>
            <motion.span variants={credentialItem}>{t('hero_cred2')}</motion.span>
            <motion.span variants={credentialItem}>{t('hero_cred3')}</motion.span>
          </motion.div>

          {/* Single dominant CTA */}
          <motion.div className="hero-buttons" variants={heroChild}>
            <a href={waUrl} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp btn-hero-primary">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              {t('hero_cta_free')}
            </a>
            <a href="#services" className="btn btn-outline">
              {t('hero_cta1')}
            </a>
          </motion.div>

          {/* Availability counter + guarantee */}
          <motion.div className="hero-social-row" variants={heroChild}>
            <div className="hero-availability">
              <span className="hero-avail-dot" />
              {t('hero_availability')}
            </div>
            <div className="hero-divider" />
            <div className="hero-guarantee-inline">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              {t('hero_guarantee')}
            </div>
          </motion.div>

          {/* Cumulative savings ticker */}
          <motion.div className="hero-savings-ticker" variants={heroChild}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
            {t('hero_savings')}
          </motion.div>
        </motion.div>

        <motion.div
          className="hero-visual"
          variants={heroVisual}
          initial="hidden"
          animate="visible"
        >
          <div className="hero-logo-wrapper">
            <div className="hero-logo-ring" />
            <div className="hero-logo-ring" />
            <div className="hero-logo-ring" />
            <div className="hero-logo-center">
              <Logo size={120} lColor="#FFFFFF" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
