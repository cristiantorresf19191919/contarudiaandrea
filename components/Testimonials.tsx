'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';
import { staggerContainerSlow, cascadeCard } from '@/lib/animations';
import SectionHeader from './SectionHeader';

const starIcon = (
  <svg viewBox="0 0 20 20" fill="#F59E0B" width="18" height="18">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const quoteIcon = (
  <svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="rgba(196,30,42,0.15)" strokeWidth="1.5">
    <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
    <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
  </svg>
);

export default function Testimonials() {
  const { t } = useLanguage();

  const testimonials = [
    { name: t('test1_name'), role: t('test1_role'), text: t('test1_text'), rating: 5, initials: 'CR' },
    { name: t('test2_name'), role: t('test2_role'), text: t('test2_text'), rating: 5, initials: 'ML' },
    { name: t('test3_name'), role: t('test3_role'), text: t('test3_text'), rating: 5, initials: 'RV' },
  ];

  return (
    <section className="section testimonials-section" id="testimonials">
      <div className="container">
        <SectionHeader
          tag={t('testimonials_tag')}
          title={t('testimonials_title')}
          desc={t('testimonials_desc')}
        />
        <motion.div
          className="testimonials-grid"
          variants={staggerContainerSlow}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {testimonials.map((item, i) => (
            <motion.div key={i} className="testimonial-card" variants={cascadeCard}>
              <div className="testimonial-quote">{quoteIcon}</div>
              <div className="testimonial-stars">
                {Array.from({ length: item.rating }).map((_, j) => (
                  <span key={j}>{starIcon}</span>
                ))}
              </div>
              <p className="testimonial-text">{item.text}</p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">{item.initials}</div>
                <div>
                  <div className="testimonial-name">{item.name}</div>
                  <div className="testimonial-role">{item.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
