'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';
import { fadeUp } from '@/lib/animations';
import Logo from './Logo';

const footerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18, delayChildren: 0.12 } },
};

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="footer">
      <div className="container">
        <motion.div
          className="footer-grid"
          variants={footerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-30px' }}
        >
          <motion.div className="footer-brand" variants={fadeUp}>
            <div className="footer-logo">
              <Logo size={40} lColor="#FFFFFF" />
              Andrea La Torre
            </div>
            <p>{t('footer_desc')}</p>
          </motion.div>
          <motion.div variants={fadeUp}>
            <h4>{t('footer_services')}</h4>
            <div className="footer-links">
              <a href="#services">{t('svc1_title')}</a>
              <a href="#services">{t('svc2_title')}</a>
              <a href="#services">{t('svc3_title')}</a>
              <a href="#services">{t('svc4_title')}</a>
              <a href="#services">{t('svc5_title')}</a>
            </div>
          </motion.div>
          <motion.div variants={fadeUp}>
            <h4>{t('footer_contact')}</h4>
            <div className="footer-links">
              <a href="tel:+573022851810">+57 302 285 1810</a>
              <a href="mailto:andrealato30@gmail.com">andrealato30@gmail.com</a>
              <a href="https://wa.me/573022851810" target="_blank" rel="noopener noreferrer">WhatsApp</a>
            </div>
          </motion.div>
        </motion.div>
        <div className="footer-bottom">
          <p>&copy; 2026 Andrea La Torre. {t('footer_rights')}</p>
        </div>
      </div>
    </footer>
  );
}
