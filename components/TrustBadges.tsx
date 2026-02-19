'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';

const badgeVariants = {
  hidden: { opacity: 0, y: 15, filter: 'blur(3px)' },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: i * 0.12 },
  }),
};

const icons = {
  cpa: (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  ),
  sagrilaft: (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  ),
  dian: (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 20h20M4 20V9l8-5 8 5v11" />
      <path d="M9 20v-5h6v5" />
    </svg>
  ),
  experience: (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
};

export default function TrustBadges() {
  const { t } = useLanguage();

  const badges = [
    { icon: icons.cpa, label: t('trust_cpa') },
    { icon: icons.sagrilaft, label: t('trust_sagrilaft') },
    { icon: icons.dian, label: t('trust_dian') },
    { icon: icons.experience, label: t('trust_experience') },
  ];

  return (
    <div className="trust-badges">
      <div className="container">
        <div className="trust-badges-grid">
          {badges.map((badge, i) => (
            <motion.div
              key={i}
              className="trust-badge"
              variants={badgeVariants}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="trust-badge-icon">{badge.icon}</div>
              <span className="trust-badge-label">{badge.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
