'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { heroChild, heroVisual } from '@/lib/animations';
import Logo from './Logo';

const heroContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18, delayChildren: 0.2 } },
};

const credentialItem = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function Hero() {
  const { t } = useLanguage();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const geo1Y = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const geo1X = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const geo2Y = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const geo3Y = useTransform(scrollYProgress, [0, 1], [0, 40]);

  return (
    <section className="hero" id="hero" ref={ref}>
      {/* Parallax geometric shapes */}
      <motion.div
        className="hero-geo hero-geo-1"
        style={{ y: geo1Y, x: geo1X }}
        initial={{ opacity: 0, scale: 0.3 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
      />
      <motion.div
        className="hero-geo hero-geo-2"
        style={{ y: geo2Y }}
        initial={{ opacity: 0, scale: 0.3 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.8 }}
      />
      <motion.div
        className="hero-geo hero-geo-3"
        style={{ y: geo3Y }}
        initial={{ opacity: 0, scale: 0.3 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 1.1 }}
      />

      <div className="container hero-grid">
        <motion.div
          className="hero-content"
          variants={heroContainer}
          initial="hidden"
          animate="visible"
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
              visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
            }}
          >
            <motion.span variants={credentialItem}>{t('hero_cred1')}</motion.span>
            <motion.span variants={credentialItem}>{t('hero_cred2')}</motion.span>
            <motion.span variants={credentialItem}>{t('hero_cred3')}</motion.span>
          </motion.div>
          <motion.div className="hero-buttons" variants={heroChild}>
            <a href="#services" className="btn btn-primary">
              {t('hero_cta1')}
            </a>
            <a href="#contact" className="btn btn-outline">
              {t('hero_cta2')}
            </a>
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
