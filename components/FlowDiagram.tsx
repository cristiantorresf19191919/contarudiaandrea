'use client';

import { useEffect, useState, useRef, useCallback, type ReactNode } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';
import { scaleUp } from '@/lib/animations';
import SectionHeader from './SectionHeader';

/* ====================================================================
   ICONS
   ==================================================================== */
const I = {
  chat: (c = 'white') => <svg viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>,
  search: (c = 'white') => <svg viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>,
  file: (c = 'white') => <svg viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/><path d="M9 15l2 2 4-4"/></svg>,
  play: (c = 'white') => <svg viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="10,8 16,12 10,16" fill={c} stroke="none"/></svg>,
  refresh: (c = 'white') => <svg viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"/></svg>,
  star: (c = 'white') => <svg viewBox="0 0 24 24" fill={c} stroke={c} strokeWidth="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  building: (c = 'white') => <svg viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v18M3 9h18M3 15h18M15 3v18"/></svg>,
  percent: (c = 'white') => <svg viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="5" x2="5" y2="19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></svg>,
  shield: (c = 'white') => <svg viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>,
  gov: (c = 'white') => <svg viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 20h20M4 20V9l8-5 8 5v11"/><path d="M9 20v-5h6v5"/></svg>,
  edit: (c = 'white') => <svg viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
  book: (c = 'white') => <svg viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg>,
  balance: (c = 'white') => <svg viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="3" x2="12" y2="21"/><polyline points="4 9 12 5 20 9"/><path d="M4 9c0 3 3.5 5 8 5s8-2 8-5"/></svg>,
  chart: (c = 'white') => <svg viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
  lock: (c = 'white') => <svg viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>,
  rocket: (c = 'white') => <svg viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z"/><path d="M12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z"/></svg>,
};

/* ====================================================================
   ARROW CONNECTOR
   ==================================================================== */
function Arrow({ delay = 0, vertical = false, color = '#C41E2A' }: { delay?: number; vertical?: boolean; color?: string }) {
  return (
    <motion.div
      className={`fd-arrow ${vertical ? 'fd-arrow-vert' : ''}`}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <svg
        viewBox={vertical ? '0 0 24 40' : '0 0 40 24'}
        fill="none"
        width={vertical ? 24 : 40}
        height={vertical ? 40 : 24}
      >
        {vertical ? (
          <>
            <motion.line x1="12" y1="2" x2="12" y2="32" stroke={color} strokeWidth="2" strokeDasharray="4 3" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: delay + 0.1, duration: 0.5 }} />
            <motion.path d="M7 28l5 8 5-8" fill={color} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: delay + 0.4 }} />
          </>
        ) : (
          <>
            <motion.line x1="2" y1="12" x2="32" y2="12" stroke={color} strokeWidth="2" strokeDasharray="4 3" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: delay + 0.1, duration: 0.5 }} />
            <motion.path d="M28 7l8 5-8 5" fill={color} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: delay + 0.4 }} />
          </>
        )}
      </svg>
    </motion.div>
  );
}

/* ====================================================================
   SERVICE FLOW (Tab 1)
   ==================================================================== */
function ServiceFlow({ active }: { active: boolean }) {
  const { t } = useLanguage();
  const colors = ['#C41E2A', '#A01722', '#4A0E1B', '#2D2D2D', '#A01722', '#C41E2A'];
  const icons = [I.chat, I.search, I.file, I.play, I.refresh, I.star];
  const steps = [t('flow_step1'), t('flow_step2'), t('flow_step3'), t('flow_step4'), t('flow_step5'), t('flow_step6')];

  return (
    <div className="fd-service-flow">
      {steps.map((label, i) => (
        <div key={i} className="fd-service-item">
          <motion.div
            className="fd-card"
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={active ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ delay: i * 0.12, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -6, boxShadow: '0 16px 40px rgba(0,0,0,0.12)' }}
          >
            <div className="fd-card-icon" style={{ background: colors[i] }}>
              {icons[i]()}
            </div>
            <div className="fd-card-step" style={{ color: colors[i] }}>{i + 1}</div>
            <div className="fd-card-label">{label}</div>
          </motion.div>
          {i < steps.length - 1 && <Arrow delay={i * 0.12 + 0.3} color={colors[i + 1]} />}
        </div>
      ))}
    </div>
  );
}

/* ====================================================================
   TAX OBLIGATIONS (Tab 2)
   ==================================================================== */
function TaxFlow({ active }: { active: boolean }) {
  const { t } = useLanguage();
  const taxes = [
    { label: t('tax_iva'), sub: t('tax_iva_desc'), color: '#C41E2A' },
    { label: t('tax_rete'), sub: t('tax_rete_desc'), color: '#A01722' },
    { label: t('tax_ica'), sub: t('tax_ica_desc'), color: '#4A0E1B' },
    { label: t('tax_renta'), sub: t('tax_renta_desc'), color: '#2D2D2D' },
    { label: t('tax_exo'), sub: t('tax_exo_desc'), color: '#6B2130' },
  ];
  const dests = [
    { label: t('tax_dian'), icon: I.gov, color: '#1a5276' },
    { label: t('tax_shd'), icon: I.gov, color: '#1a5276' },
    { label: t('tax_paz'), icon: I.shield, color: '#0e6655' },
  ];

  return (
    <div className="fd-tax-flow">
      {/* Left: Company Hub */}
      <div className="fd-tax-col fd-tax-col-hub">
        <motion.div
          className="fd-hub"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={active ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.1, type: 'spring', stiffness: 150, damping: 15 }}
        >
          <motion.div
            className="fd-hub-ring"
            animate={active ? { rotate: 360 } : {}}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          />
          <div className="fd-hub-core">
            <div className="fd-hub-icon">{I.building()}</div>
            <div className="fd-hub-label">{t('tax_company')}</div>
          </div>
        </motion.div>
      </div>

      {/* Arrows: Hub → Taxes */}
      <div className="fd-tax-arrows">
        {taxes.map((_, i) => (
          <motion.div
            key={i}
            className="fd-tax-line"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={active ? { scaleX: 1, opacity: 1 } : {}}
            transition={{ delay: 0.3 + i * 0.08, duration: 0.4 }}
          >
            <svg viewBox="0 0 60 2" width="100%" height="2" preserveAspectRatio="none">
              <line x1="0" y1="1" x2="60" y2="1" stroke={taxes[i].color} strokeWidth="2" strokeDasharray="4 3" />
            </svg>
          </motion.div>
        ))}
      </div>

      {/* Center: Tax Types */}
      <div className="fd-tax-col fd-tax-col-taxes">
        {taxes.map((tax, i) => (
          <motion.div
            key={i}
            className="fd-tax-card"
            style={{ borderLeftColor: tax.color }}
            initial={{ opacity: 0, x: -20 }}
            animate={active ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.25 + i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ x: 4, boxShadow: '0 8px 30px rgba(0,0,0,0.1)' }}
          >
            <div className="fd-tax-card-icon" style={{ background: tax.color }}>
              {I.percent()}
            </div>
            <div className="fd-tax-card-info">
              <div className="fd-tax-card-name">{tax.label}</div>
              <div className="fd-tax-card-freq">{tax.sub}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Arrows: Taxes → Destinations */}
      <div className="fd-tax-arrows">
        {dests.map((_, i) => (
          <motion.div
            key={i}
            className="fd-tax-line"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={active ? { scaleX: 1, opacity: 1 } : {}}
            transition={{ delay: 0.7 + i * 0.08, duration: 0.4 }}
          >
            <svg viewBox="0 0 60 2" width="100%" height="2" preserveAspectRatio="none">
              <line x1="0" y1="1" x2="60" y2="1" stroke={dests[i].color} strokeWidth="2" strokeDasharray="4 3" />
            </svg>
          </motion.div>
        ))}
      </div>

      {/* Right: Destinations */}
      <div className="fd-tax-col fd-tax-col-dests">
        {dests.map((dest, i) => (
          <motion.div
            key={i}
            className="fd-dest-card"
            style={{ background: dest.color }}
            initial={{ opacity: 0, x: 20 }}
            animate={active ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.7 + i * 0.12, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ scale: 1.04, boxShadow: `0 12px 35px ${dest.color}40` }}
          >
            <div className="fd-dest-icon">{dest.icon()}</div>
            <div className="fd-dest-label">{dest.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ====================================================================
   ACCOUNTING CYCLE (Tab 3)
   ==================================================================== */
function CycleFlow({ active }: { active: boolean }) {
  const { t } = useLanguage();
  const items = [
    { label: t('acc_register'), icon: I.edit, color: '#C41E2A' },
    { label: t('acc_journal'), icon: I.book, color: '#A01722' },
    { label: t('acc_ledger'), icon: I.book, color: '#4A0E1B' },
    { label: t('acc_trial'), icon: I.balance, color: '#2D2D2D' },
    { label: t('acc_adjust'), icon: I.refresh, color: '#4A0E1B' },
    { label: t('acc_statements'), icon: I.chart, color: '#A01722' },
    { label: t('acc_close'), icon: I.lock, color: '#C41E2A' },
    { label: t('acc_analysis'), icon: I.rocket, color: '#0e6655' },
  ];

  const topRow = items.slice(0, 4);
  const bottomRow = items.slice(4).reverse(); // 8,7,6,5

  return (
    <div className="fd-cycle-flow">
      {/* Top row: 1 → 2 → 3 → 4 */}
      <div className="fd-cycle-row">
        {topRow.map((item, i) => (
          <div key={i} className="fd-cycle-item">
            <motion.div
              className="fd-cycle-card"
              style={{ borderColor: item.color }}
              initial={{ opacity: 0, y: 30 }}
              animate={active ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6, boxShadow: `0 12px 35px ${item.color}20` }}
            >
              <div className="fd-cycle-card-icon" style={{ background: item.color }}>
                {item.icon()}
              </div>
              <div className="fd-cycle-card-step" style={{ color: item.color }}>{i + 1}</div>
              <div className="fd-cycle-card-label">{item.label}</div>
            </motion.div>
            {i < 3 && <Arrow delay={i * 0.1 + 0.3} color={topRow[i + 1]?.color || '#C41E2A'} />}
          </div>
        ))}
      </div>

      {/* Turn arrow: 4 → 5 (right side, going down) */}
      <div className="fd-cycle-turn fd-cycle-turn-right">
        <Arrow delay={0.6} vertical color="#4A0E1B" />
      </div>

      {/* Bottom row: 8 ← 7 ← 6 ← 5 (displayed as 5 → 6 → 7 → 8 visually reversed) */}
      <div className="fd-cycle-row">
        {bottomRow.map((item, i) => {
          const stepNum = 8 - i; // 8, 7, 6, 5
          return (
            <div key={i} className="fd-cycle-item">
              <motion.div
                className="fd-cycle-card"
                style={{ borderColor: item.color }}
                initial={{ opacity: 0, y: -30 }}
                animate={active ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6 + i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -6, boxShadow: `0 12px 35px ${item.color}20` }}
              >
                <div className="fd-cycle-card-icon" style={{ background: item.color }}>
                  {item.icon()}
                </div>
                <div className="fd-cycle-card-step" style={{ color: item.color }}>{stepNum}</div>
                <div className="fd-cycle-card-label">{item.label}</div>
              </motion.div>
              {i < 3 && <Arrow delay={0.6 + i * 0.1 + 0.3} color={bottomRow[i + 1]?.color || '#C41E2A'} />}
            </div>
          );
        })}
      </div>

      {/* Turn arrow: 8 → 1 (left side, going up) */}
      <div className="fd-cycle-turn fd-cycle-turn-left">
        <motion.div
          className="fd-cycle-loop"
          initial={{ opacity: 0 }}
          animate={active ? { opacity: 1 } : {}}
          transition={{ delay: 1.1, duration: 0.5 }}
        >
          <svg viewBox="0 0 40 60" width="40" height="60" fill="none">
            <motion.path
              d="M20 58 L20 8 L20 2"
              stroke="#C41E2A"
              strokeWidth="2"
              strokeDasharray="4 3"
              initial={{ pathLength: 0 }}
              animate={active ? { pathLength: 1 } : {}}
              transition={{ delay: 1.2, duration: 0.6 }}
            />
            <motion.path d="M15 6l5-6 5 6" fill="#C41E2A" initial={{ opacity: 0 }} animate={active ? { opacity: 1 } : {}} transition={{ delay: 1.6 }} />
          </svg>
        </motion.div>
      </div>
    </div>
  );
}

/* ====================================================================
   TAB SELECTOR
   ==================================================================== */
function TabSelector({ tabs, active, onChange }: { tabs: { key: string; label: string; icon: ReactNode }[]; active: string; onChange: (k: string) => void }) {
  return (
    <div className="fd-tabs">
      {tabs.map((tab) => (
        <motion.button
          key={tab.key}
          className={`fd-tab ${active === tab.key ? 'fd-tab-active' : ''}`}
          onClick={() => onChange(tab.key)}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <span className="fd-tab-icon">{tab.icon}</span>
          <span>{tab.label}</span>
          {active === tab.key && (
            <motion.div className="fd-tab-indicator" layoutId="fdTabIndicator" transition={{ type: 'spring', stiffness: 400, damping: 30 }} />
          )}
        </motion.button>
      ))}
    </div>
  );
}

/* ====================================================================
   MAIN COMPONENT
   ==================================================================== */
export default function FlowDiagram() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, margin: '-80px' });
  const [activated, setActivated] = useState(false);
  const [activeTab, setActiveTab] = useState('service');

  useEffect(() => {
    if (inView && !activated) setActivated(true);
  }, [inView, activated]);

  const handleTabChange = useCallback((key: string) => {
    setActivated(false);
    setActiveTab(key);
    setTimeout(() => setActivated(true), 100);
  }, []);

  const tabs = [
    { key: 'service', label: t('flow_tab1'), icon: <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16"><path d="M10 2a8 8 0 100 16 8 8 0 000-16zM8 12l-2-2 1.4-1.4L8 9.2l3.6-3.6L13 7l-5 5z"/></svg> },
    { key: 'tax', label: t('flow_tab2'), icon: <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16"><path d="M4 4h12v2H4V4zm0 4h12v2H4V8zm0 4h8v2H4v-2z"/></svg> },
    { key: 'cycle', label: t('flow_tab3'), icon: <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16"><path d="M10 3a7 7 0 107 7h-3a4 4 0 11-4-4V3z"/></svg> },
  ];

  return (
    <section className="section flow-section" id="flow">
      <div className="container">
        <SectionHeader tag={t('flow_tag')} title={t('flow_title')} desc={t('flow_desc')} />
        <motion.div
          ref={containerRef}
          variants={scaleUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
        >
          <TabSelector tabs={tabs} active={activeTab} onChange={handleTabChange} />
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              className="fd-diagram"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              {activeTab === 'service' && <ServiceFlow active={activated} />}
              {activeTab === 'tax' && <TaxFlow active={activated} />}
              {activeTab === 'cycle' && <CycleFlow active={activated} />}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
