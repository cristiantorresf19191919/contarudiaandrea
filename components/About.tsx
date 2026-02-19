'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';
import { slideLeft, slideRight, slideInItem } from '@/lib/animations';
import Logo from './Logo';

const listContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14, delayChildren: 0.35 } },
};

export default function About() {
  const { t } = useLanguage();

  const credentials = [
    t('about_li1'),
    t('about_li2'),
    t('about_li3'),
    t('about_li4'),
  ];

  return (
    <section className="section about" id="about">
      <div className="container">
        <div className="about-grid">
          <motion.div
            className="about-image"
            variants={slideLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
          >
            <div className="about-image-card">
              <Logo size={140} lColor="#FFFFFF" />
              <h3>Andrea La Torre</h3>
              <p>{t('about_card_subtitle')}</p>
            </div>
            <motion.div
              className="about-experience"
              initial={{ opacity: 0, scale: 0.6, filter: 'blur(4px)' }}
              whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{
                type: 'spring',
                stiffness: 120,
                damping: 18,
                delay: 0.6,
              }}
            >
              <div className="number">15+</div>
              <div className="label">{t('about_exp_label')}</div>
            </motion.div>
          </motion.div>

          <motion.div
            className="about-content"
            variants={slideRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
          >
            <div className="section-tag">{t('about_tag')}</div>
            <h3>{t('about_title')}</h3>
            <p>{t('about_p1')}</p>
            <p>{t('about_p2')}</p>
            <motion.ul
              className="about-list"
              variants={listContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {credentials.map((item, i) => (
                <motion.li key={i} variants={slideInItem}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="#C41E2A" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                  <span>{item}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
