'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';
import { staggerContainer, cascadeCard, iconBounce } from '@/lib/animations';
import SectionHeader from './SectionHeader';

const serviceIcons = [
  <svg key="1" viewBox="0 0 24 24"><path d="M4 2h16a2 2 0 012 2v16a2 2 0 01-2 2H4a2 2 0 01-2-2V4a2 2 0 012-2z"/><path d="M8 6h8M8 10h8M8 14h5"/></svg>,
  <svg key="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/><path d="M11 8v6M8 11h6"/></svg>,
  <svg key="3" viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="18" rx="2"/><path d="M12 8v8M8 12h8"/></svg>,
  <svg key="4" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/><path d="M9 15l2 2 4-4"/></svg>,
  <svg key="5" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>,
  <svg key="6" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>,
];

export default function Services() {
  const { t } = useLanguage();

  const services = [
    { title: t('svc1_title'), desc: t('svc1_desc') },
    { title: t('svc2_title'), desc: t('svc2_desc') },
    { title: t('svc3_title'), desc: t('svc3_desc') },
    { title: t('svc4_title'), desc: t('svc4_desc') },
    { title: t('svc5_title'), desc: t('svc5_desc') },
    { title: t('svc6_title'), desc: t('svc6_desc') },
  ];

  return (
    <section className="section services" id="services">
      <div className="container">
        <SectionHeader
          tag={t('services_tag')}
          title={t('services_title')}
          desc={t('services_desc')}
        />
        <motion.div
          className="services-grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-30px' }}
        >
          {services.map((svc, i) => (
            <motion.div key={i} className="service-card" variants={cascadeCard}>
              <motion.div className="service-icon" variants={iconBounce}>
                {serviceIcons[i]}
              </motion.div>
              <h3>{svc.title}</h3>
              <p>{svc.desc}</p>
              <a href="#contact" className="service-link">
                {t('svc_link')}{' '}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
