'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';
import { staggerContainer, scaleUp } from '@/lib/animations';
import SectionHeader from './SectionHeader';

const flowColors = ['#C41E2A', '#A01722', '#4A0E1B', '#2D2D2D', '#A01722', '#C41E2A'];

const stepItem = {
  hidden: { opacity: 0, y: 40, scale: 0.85 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const lineGrow = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function FlowDiagram() {
  const { t } = useLanguage();

  const steps = [
    t('flow_step1'),
    t('flow_step2'),
    t('flow_step3'),
    t('flow_step4'),
    t('flow_step5'),
    t('flow_step6'),
  ];

  return (
    <section className="section flow-section" id="flow">
      <div className="container">
        <SectionHeader
          tag={t('flow_tag')}
          title={t('flow_title')}
          desc={t('flow_desc')}
        />
        <motion.div
          className="flow-diagram"
          variants={scaleUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
        >
          <motion.div
            className="flow-steps"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {steps.map((step, i) => (
              <div className="flow-step-wrapper" key={i}>
                <motion.div
                  className="flow-step"
                  variants={stepItem}
                  style={{ background: flowColors[i] }}
                >
                  <div className="flow-step-number">{i + 1}</div>
                  <div className="flow-step-label">{step}</div>
                </motion.div>
                {i < steps.length - 1 && (
                  <motion.div
                    className="flow-connector"
                    variants={lineGrow}
                    style={{ originX: 0 }}
                  >
                    <svg viewBox="0 0 40 20" className="flow-arrow">
                      <path d="M0 10 L30 10 M25 4 L32 10 L25 16" fill="none" stroke="#C41E2A" strokeWidth="2" />
                    </svg>
                  </motion.div>
                )}
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
