'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';
import { staggerContainerSlow, cascadeCard, iconBounce } from '@/lib/animations';
import SectionHeader from './SectionHeader';

export default function PricingSection() {
  const { t } = useLanguage();

  const plans = [
    {
      key: 'basic',
      icon: (
        <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/><path d="M8 13h8M8 17h5"/></svg>
      ),
      features: ['pricing_basic_f1', 'pricing_basic_f2', 'pricing_basic_f3', 'pricing_basic_f4'],
      highlighted: false,
    },
    {
      key: 'professional',
      icon: (
        <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
      ),
      features: ['pricing_pro_f1', 'pricing_pro_f2', 'pricing_pro_f3', 'pricing_pro_f4', 'pricing_pro_f5'],
      highlighted: true,
    },
    {
      key: 'enterprise',
      icon: (
        <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>
      ),
      features: ['pricing_ent_f1', 'pricing_ent_f2', 'pricing_ent_f3', 'pricing_ent_f4', 'pricing_ent_f5', 'pricing_ent_f6'],
      highlighted: false,
    },
  ];

  const waBase = 'https://wa.me/573022851810?text=';

  return (
    <section className="section pricing-section" id="pricing">
      <div className="container">
        <SectionHeader
          tag={t('pricing_tag')}
          title={t('pricing_title')}
          desc={t('pricing_desc')}
        />
        <motion.div
          className="pricing-grid"
          variants={staggerContainerSlow}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {plans.map((plan) => (
            <motion.div
              key={plan.key}
              className={`pricing-card ${plan.highlighted ? 'pricing-card-featured' : ''}`}
              variants={cascadeCard}
            >
              {plan.highlighted && (
                <div className="pricing-badge">{t('pricing_popular')}</div>
              )}
              <motion.div className="pricing-icon" variants={iconBounce}>
                {plan.icon}
              </motion.div>
              <h3 className="pricing-plan-name">{t(`pricing_${plan.key}_name`)}</h3>
              <div className="pricing-price">
                <span className="pricing-from">{t('pricing_from')}</span>
                <span className="pricing-amount">{t(`pricing_${plan.key}_price`)}</span>
                <span className="pricing-period">/{t('pricing_month')}</span>
              </div>
              <p className="pricing-plan-desc">{t(`pricing_${plan.key}_desc`)}</p>
              <ul className="pricing-features">
                {plan.features.map((fKey) => (
                  <li key={fKey}>
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke={plan.highlighted ? '#C41E2A' : '#25D366'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    <span>{t(fKey)}</span>
                  </li>
                ))}
              </ul>
              <motion.a
                href={`${waBase}${encodeURIComponent(t(`pricing_${plan.key}_wa`))}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`pricing-cta ${plan.highlighted ? 'pricing-cta-primary' : 'pricing-cta-outline'}`}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                {t('pricing_cta')}
              </motion.a>
            </motion.div>
          ))}
        </motion.div>
        <p className="pricing-note">{t('pricing_note')}</p>
      </div>
    </section>
  );
}
