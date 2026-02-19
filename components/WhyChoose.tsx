'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';
import { staggerContainerSlow, cascadeCard, iconSpin } from '@/lib/animations';
import SectionHeader from './SectionHeader';

const whyIcons = [
  <svg key="1" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  <svg key="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  <svg key="3" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>,
];

export default function WhyChoose() {
  const { t } = useLanguage();

  const items = [
    { title: t('why1_title'), desc: t('why1_desc') },
    { title: t('why2_title'), desc: t('why2_desc') },
    { title: t('why3_title'), desc: t('why3_desc') },
  ];

  return (
    <section className="section why-section">
      <div className="container">
        <SectionHeader tag={t('why_tag')} title={t('why_title')} />
        <motion.div
          className="why-grid"
          variants={staggerContainerSlow}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
        >
          {items.map((item, i) => (
            <motion.div key={i} className="why-card" variants={cascadeCard}>
              <motion.div className="why-icon" variants={iconSpin}>
                {whyIcons[i]}
              </motion.div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
