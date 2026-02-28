'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';
import { staggerContainerSlow, fadeUpBlur } from '@/lib/animations';
import SectionHeader from './SectionHeader';

const timelineItemVariant = {
  hidden: { opacity: 0, y: 30, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const dotVariant = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 200,
      damping: 15,
      delay: 0.2,
    },
  },
};

export default function ResultsTimeline() {
  const { t } = useLanguage();

  const milestones = [
    {
      year: t('tl_year1'),
      title: t('tl_title1'),
      desc: t('tl_desc1'),
      icon: (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"/></svg>
      ),
    },
    {
      year: t('tl_year2'),
      title: t('tl_title2'),
      desc: t('tl_desc2'),
      icon: (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/><path d="M9 15l2 2 4-4"/></svg>
      ),
    },
    {
      year: t('tl_year3'),
      title: t('tl_title3'),
      desc: t('tl_desc3'),
      icon: (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/><path d="M11 8v6M8 11h6"/></svg>
      ),
    },
    {
      year: t('tl_year4'),
      title: t('tl_title4'),
      desc: t('tl_desc4'),
      icon: (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>
      ),
    },
    {
      year: t('tl_year5'),
      title: t('tl_title5'),
      desc: t('tl_desc5'),
      icon: (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
      ),
    },
  ];

  return (
    <section className="section timeline-section">
      <div className="container">
        <SectionHeader
          tag={t('tl_tag')}
          title={t('tl_title')}
          desc={t('tl_desc')}
        />
        <motion.div
          className="timeline"
          variants={staggerContainerSlow}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          <div className="timeline-line" />
          {milestones.map((m, i) => (
            <motion.div
              key={i}
              className={`timeline-item ${i % 2 === 0 ? 'timeline-left' : 'timeline-right'}`}
              variants={timelineItemVariant}
            >
              <motion.div className="timeline-dot" variants={dotVariant}>
                {m.icon}
              </motion.div>
              <div className="timeline-card">
                <div className="timeline-year">{m.year}</div>
                <h3 className="timeline-card-title">{m.title}</h3>
                <p className="timeline-card-desc">{m.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
