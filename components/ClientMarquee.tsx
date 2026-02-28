'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';
import { fadeUpBlur } from '@/lib/animations';

const certifications = [
  { icon: '🎓', key: 'marq_cpa' },
  { icon: '🛡️', key: 'marq_sagrilaft' },
  { icon: '📋', key: 'marq_dian' },
  { icon: '⚖️', key: 'marq_audit' },
  { icon: '🏢', key: 'marq_supersoc' },
  { icon: '💼', key: 'marq_ptee' },
  { icon: '📊', key: 'marq_niif' },
  { icon: '🔒', key: 'marq_compliance' },
];

export default function ClientMarquee() {
  const { t } = useLanguage();

  const items = certifications.map((cert) => ({
    ...cert,
    label: t(cert.key),
  }));

  // Duplicate for seamless loop
  const allItems = [...items, ...items];

  return (
    <motion.section
      className="marquee-section"
      variants={fadeUpBlur}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-30px' }}
    >
      <div className="marquee-label">{t('marq_title')}</div>
      <div className="marquee-track">
        <div className="marquee-inner">
          {allItems.map((item, i) => (
            <div key={i} className="marquee-item">
              <span className="marquee-icon">{item.icon}</span>
              <span className="marquee-text">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
