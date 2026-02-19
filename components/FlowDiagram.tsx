'use client';

import { useEffect, useState, useRef, useCallback, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
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
  expand: (c = 'white') => <svg viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/></svg>,
  close: (c = 'white') => <svg viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  invoice: (c = 'white') => <svg viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/><line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="12" y2="17"/></svg>,
  code: (c = 'white') => <svg viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
  checkCircle: (c = 'white') => <svg viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
  key: (c = 'white') => <svg viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 11-7.778 7.778 5.5 5.5 0 017.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/></svg>,
  send: (c = 'white') => <svg viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>,
  archive: (c = 'white') => <svg viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="21 8 21 21 3 21 3 8"/><rect x="1" y="3" width="22" height="5"/><line x1="10" y1="12" x2="14" y2="12"/></svg>,
};

/* ====================================================================
   ANIMATED PARTICLES BACKGROUND
   ==================================================================== */
function ParticlesBackground() {
  return (
    <div className="fd-particles">
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="fd-particle"
          initial={{
            x: Math.random() * 100 + '%',
            y: Math.random() * 100 + '%',
            opacity: 0,
            scale: 0,
          }}
          animate={{
            opacity: [0, 0.6, 0],
            scale: [0, 1, 0],
            y: [Math.random() * 100 + '%', Math.random() * 100 + '%'],
          }}
          transition={{
            duration: 4 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

/* ====================================================================
   GLOW ARROW CONNECTOR
   ==================================================================== */
function Arrow({ delay = 0, vertical = false, color = '#ff4d5a' }: { delay?: number; vertical?: boolean; color?: string }) {
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
        style={{ filter: `drop-shadow(0 0 6px ${color}80)` }}
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
  const colors = ['#ff4d5a', '#e63946', '#c41e2a', '#a01722', '#e63946', '#ff4d5a'];
  const glows = ['#ff4d5a40', '#e6394640', '#c41e2a40', '#a0172240', '#e6394640', '#ff4d5a40'];
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
            whileHover={{ y: -8, boxShadow: `0 20px 50px ${glows[i]}` }}
          >
            <div className="fd-card-icon" style={{ background: `linear-gradient(135deg, ${colors[i]}, ${colors[i]}cc)`, boxShadow: `0 4px 20px ${glows[i]}` }}>
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
    { label: t('tax_iva'), sub: t('tax_iva_desc'), color: '#ff4d5a' },
    { label: t('tax_rete'), sub: t('tax_rete_desc'), color: '#e63946' },
    { label: t('tax_ica'), sub: t('tax_ica_desc'), color: '#c41e2a' },
    { label: t('tax_renta'), sub: t('tax_renta_desc'), color: '#a01722' },
    { label: t('tax_exo'), sub: t('tax_exo_desc'), color: '#d4374a' },
  ];
  const dests = [
    { label: t('tax_dian'), icon: I.gov, color: '#2563eb' },
    { label: t('tax_shd'), icon: I.gov, color: '#1d4ed8' },
    { label: t('tax_paz'), icon: I.shield, color: '#059669' },
  ];

  return (
    <div className="fd-tax-flow">
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
          <motion.div
            className="fd-hub-ring fd-hub-ring-2"
            animate={active ? { rotate: -360 } : {}}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          />
          <div className="fd-hub-core">
            <div className="fd-hub-icon">{I.building()}</div>
            <div className="fd-hub-label">{t('tax_company')}</div>
          </div>
        </motion.div>
      </div>

      <div className="fd-tax-arrows">
        {taxes.map((tax, i) => (
          <motion.div
            key={i}
            className="fd-tax-line"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={active ? { scaleX: 1, opacity: 1 } : {}}
            transition={{ delay: 0.3 + i * 0.08, duration: 0.4 }}
          >
            <svg viewBox="0 0 60 2" width="100%" height="2" preserveAspectRatio="none" style={{ filter: `drop-shadow(0 0 4px ${tax.color}60)` }}>
              <line x1="0" y1="1" x2="60" y2="1" stroke={tax.color} strokeWidth="2" strokeDasharray="4 3" />
            </svg>
          </motion.div>
        ))}
      </div>

      <div className="fd-tax-col fd-tax-col-taxes">
        {taxes.map((tax, i) => (
          <motion.div
            key={i}
            className="fd-tax-card"
            style={{ borderLeftColor: tax.color }}
            initial={{ opacity: 0, x: -20 }}
            animate={active ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.25 + i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ x: 4, boxShadow: `0 8px 30px ${tax.color}30` }}
          >
            <div className="fd-tax-card-icon" style={{ background: `linear-gradient(135deg, ${tax.color}, ${tax.color}bb)`, boxShadow: `0 2px 12px ${tax.color}40` }}>
              {I.percent()}
            </div>
            <div className="fd-tax-card-info">
              <div className="fd-tax-card-name">{tax.label}</div>
              <div className="fd-tax-card-freq">{tax.sub}</div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="fd-tax-arrows">
        {dests.map((dest, i) => (
          <motion.div
            key={i}
            className="fd-tax-line"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={active ? { scaleX: 1, opacity: 1 } : {}}
            transition={{ delay: 0.7 + i * 0.08, duration: 0.4 }}
          >
            <svg viewBox="0 0 60 2" width="100%" height="2" preserveAspectRatio="none" style={{ filter: `drop-shadow(0 0 4px ${dest.color}60)` }}>
              <line x1="0" y1="1" x2="60" y2="1" stroke={dest.color} strokeWidth="2" strokeDasharray="4 3" />
            </svg>
          </motion.div>
        ))}
      </div>

      <div className="fd-tax-col fd-tax-col-dests">
        {dests.map((dest, i) => (
          <motion.div
            key={i}
            className="fd-dest-card"
            style={{ background: `linear-gradient(135deg, ${dest.color}, ${dest.color}dd)`, boxShadow: `0 4px 25px ${dest.color}40` }}
            initial={{ opacity: 0, x: 20 }}
            animate={active ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.7 + i * 0.12, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ scale: 1.06, boxShadow: `0 12px 40px ${dest.color}60` }}
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
    { label: t('acc_register'), icon: I.edit, color: '#ff4d5a' },
    { label: t('acc_journal'), icon: I.book, color: '#e63946' },
    { label: t('acc_ledger'), icon: I.book, color: '#c41e2a' },
    { label: t('acc_trial'), icon: I.balance, color: '#a01722' },
    { label: t('acc_adjust'), icon: I.refresh, color: '#c41e2a' },
    { label: t('acc_statements'), icon: I.chart, color: '#e63946' },
    { label: t('acc_close'), icon: I.lock, color: '#ff4d5a' },
    { label: t('acc_analysis'), icon: I.rocket, color: '#059669' },
  ];

  const topRow = items.slice(0, 4);
  const bottomRow = items.slice(4).reverse();

  return (
    <div className="fd-cycle-flow">
      <div className="fd-cycle-row">
        {topRow.map((item, i) => (
          <div key={i} className="fd-cycle-item">
            <motion.div
              className="fd-cycle-card"
              style={{ borderColor: `${item.color}60` }}
              initial={{ opacity: 0, y: 30 }}
              animate={active ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -8, boxShadow: `0 16px 40px ${item.color}30`, borderColor: item.color }}
            >
              <div className="fd-cycle-card-icon" style={{ background: `linear-gradient(135deg, ${item.color}, ${item.color}cc)`, boxShadow: `0 4px 18px ${item.color}40` }}>
                {item.icon()}
              </div>
              <div className="fd-cycle-card-step" style={{ color: item.color }}>{i + 1}</div>
              <div className="fd-cycle-card-label">{item.label}</div>
            </motion.div>
            {i < 3 && <Arrow delay={i * 0.1 + 0.3} color={topRow[i + 1]?.color || '#ff4d5a'} />}
          </div>
        ))}
      </div>

      <div className="fd-cycle-turn fd-cycle-turn-right">
        <Arrow delay={0.6} vertical color="#c41e2a" />
      </div>

      <div className="fd-cycle-row">
        {bottomRow.map((item, i) => {
          const stepNum = 8 - i;
          return (
            <div key={i} className="fd-cycle-item">
              <motion.div
                className="fd-cycle-card"
                style={{ borderColor: `${item.color}60` }}
                initial={{ opacity: 0, y: -30 }}
                animate={active ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6 + i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -8, boxShadow: `0 16px 40px ${item.color}30`, borderColor: item.color }}
              >
                <div className="fd-cycle-card-icon" style={{ background: `linear-gradient(135deg, ${item.color}, ${item.color}cc)`, boxShadow: `0 4px 18px ${item.color}40` }}>
                  {item.icon()}
                </div>
                <div className="fd-cycle-card-step" style={{ color: item.color }}>{stepNum}</div>
                <div className="fd-cycle-card-label">{item.label}</div>
              </motion.div>
              {i < 3 && <Arrow delay={0.6 + i * 0.1 + 0.3} color={bottomRow[i + 1]?.color || '#ff4d5a'} />}
            </div>
          );
        })}
      </div>

      <div className="fd-cycle-turn fd-cycle-turn-left">
        <motion.div
          className="fd-cycle-loop"
          initial={{ opacity: 0 }}
          animate={active ? { opacity: 1 } : {}}
          transition={{ delay: 1.1, duration: 0.5 }}
        >
          <svg viewBox="0 0 40 60" width="40" height="60" fill="none" style={{ filter: 'drop-shadow(0 0 6px #ff4d5a60)' }}>
            <motion.path
              d="M20 58 L20 8 L20 2"
              stroke="#ff4d5a"
              strokeWidth="2"
              strokeDasharray="4 3"
              initial={{ pathLength: 0 }}
              animate={active ? { pathLength: 1 } : {}}
              transition={{ delay: 1.2, duration: 0.6 }}
            />
            <motion.path d="M15 6l5-6 5 6" fill="#ff4d5a" initial={{ opacity: 0 }} animate={active ? { opacity: 1 } : {}} transition={{ delay: 1.6 }} />
          </svg>
        </motion.div>
      </div>
    </div>
  );
}

/* ====================================================================
   ELECTRONIC INVOICING FLOW (Tab 4)
   ==================================================================== */
function InvoiceFlow({ active }: { active: boolean }) {
  const { t } = useLanguage();
  const steps = [
    { label: t('einv_step1'), icon: I.invoice, color: '#ff4d5a', desc: t('einv_company') },
    { label: t('einv_step2'), icon: I.code, color: '#e63946', desc: '' },
    { label: t('einv_step3'), icon: I.checkCircle, color: '#2563eb', desc: 'DIAN' },
    { label: t('einv_step4'), icon: I.key, color: '#059669', desc: '' },
    { label: t('einv_step5'), icon: I.send, color: '#8b5cf6', desc: '' },
    { label: t('einv_step6'), icon: I.archive, color: '#a01722', desc: '' },
  ];
  const badges = [
    { label: t('einv_badge_realtime'), color: '#2563eb' },
    { label: t('einv_badge_legal'), color: '#059669' },
    { label: t('einv_badge_auto'), color: '#8b5cf6' },
  ];

  return (
    <div className="fd-invoice-flow">
      {/* Badges row */}
      <div className="fd-invoice-badges">
        {badges.map((badge, i) => (
          <motion.span
            key={i}
            className="fd-invoice-badge"
            style={{ background: `${badge.color}20`, color: badge.color, borderColor: `${badge.color}40` }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={active ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: i * 0.1, duration: 0.4 }}
          >
            <span className="fd-invoice-badge-dot" style={{ background: badge.color }} />
            {badge.label}
          </motion.span>
        ))}
      </div>

      {/* Flow steps */}
      <div className="fd-invoice-steps">
        {steps.map((step, i) => (
          <div key={i} className="fd-invoice-item">
            <motion.div
              className="fd-invoice-card"
              initial={{ opacity: 0, y: 40, scale: 0.85 }}
              animate={active ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ delay: 0.2 + i * 0.12, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -10, boxShadow: `0 20px 50px ${step.color}35` }}
            >
              <motion.div
                className="fd-invoice-card-glow"
                style={{ background: `radial-gradient(circle, ${step.color}15 0%, transparent 70%)` }}
                animate={active ? { scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] } : {}}
                transition={{ duration: 3, repeat: Infinity, delay: i * 0.3 }}
              />
              <div className="fd-invoice-card-icon" style={{ background: `linear-gradient(135deg, ${step.color}, ${step.color}bb)`, boxShadow: `0 4px 20px ${step.color}50` }}>
                {step.icon()}
              </div>
              <div className="fd-invoice-card-num" style={{ color: step.color }}>{i + 1}</div>
              <div className="fd-invoice-card-label">{step.label}</div>
              {step.desc && <div className="fd-invoice-card-desc" style={{ color: `${step.color}cc` }}>{step.desc}</div>}
            </motion.div>
            {i < steps.length - 1 && (
              <motion.div
                className="fd-invoice-connector"
                initial={{ opacity: 0, scaleX: 0 }}
                animate={active ? { opacity: 1, scaleX: 1 } : {}}
                transition={{ delay: 0.3 + i * 0.12, duration: 0.5 }}
              >
                <svg viewBox="0 0 48 24" fill="none" width="48" height="24" style={{ filter: `drop-shadow(0 0 8px ${step.color}60)` }}>
                  <motion.line
                    x1="2" y1="12" x2="36" y2="12"
                    stroke={`url(#grad-${i})`}
                    strokeWidth="2"
                    strokeDasharray="6 4"
                    initial={{ pathLength: 0 }}
                    animate={active ? { pathLength: 1 } : {}}
                    transition={{ delay: 0.4 + i * 0.12, duration: 0.5 }}
                  />
                  <defs>
                    <linearGradient id={`grad-${i}`} x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor={step.color} />
                      <stop offset="100%" stopColor={steps[i + 1]?.color || step.color} />
                    </linearGradient>
                  </defs>
                  <motion.path
                    d="M34 7l8 5-8 5"
                    fill={steps[i + 1]?.color || step.color}
                    initial={{ opacity: 0 }}
                    animate={active ? { opacity: 1 } : {}}
                    transition={{ delay: 0.6 + i * 0.12 }}
                  />
                </svg>
              </motion.div>
            )}
          </div>
        ))}
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
   FULLSCREEN PORTAL
   ==================================================================== */
function FullscreenPortal({ children, onClose, tabs, activeTab, onTabChange, exitLabel }: {
  children: ReactNode;
  onClose: () => void;
  tabs: { key: string; label: string; icon: ReactNode }[];
  activeTab: string;
  onTabChange: (k: string) => void;
  exitLabel: string;
}) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
    };
  }, [onClose]);

  return createPortal(
    <motion.div
      className="fd-fullscreen-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="fd-fullscreen-header">
        <TabSelector tabs={tabs} active={activeTab} onChange={onTabChange} />
        <motion.button
          className="fd-fullscreen-close"
          onClick={onClose}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <span className="fd-fullscreen-close-icon">{I.close()}</span>
          <span>{exitLabel}</span>
        </motion.button>
      </div>
      <div className="fd-fullscreen-content">
        {children}
      </div>
    </motion.div>,
    document.body
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
  const [isFullscreen, setIsFullscreen] = useState(false);

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
    { key: 'invoice', label: t('flow_tab4'), icon: <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16"><path d="M4 2h9l5 5v11a2 2 0 01-2 2H4a2 2 0 01-2-2V4a2 2 0 012-2zm8 1v4h4M6 10h8M6 14h5"/></svg> },
  ];

  const diagramContent = (
    <AnimatePresence mode="wait">
      <motion.div
        key={activeTab}
        className="fd-diagram"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <ParticlesBackground />
        {activeTab === 'service' && <ServiceFlow active={activated} />}
        {activeTab === 'tax' && <TaxFlow active={activated} />}
        {activeTab === 'cycle' && <CycleFlow active={activated} />}
        {activeTab === 'invoice' && <InvoiceFlow active={activated} />}
      </motion.div>
    </AnimatePresence>
  );

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
          <div className="fd-toolbar">
            <TabSelector tabs={tabs} active={activeTab} onChange={handleTabChange} />
            <motion.button
              className="fd-fullscreen-btn"
              onClick={() => { setIsFullscreen(true); setTimeout(() => setActivated(true), 200); }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title={t('flow_fullscreen')}
            >
              <span className="fd-fullscreen-btn-icon">{I.expand()}</span>
              <span className="fd-fullscreen-btn-text">{t('flow_fullscreen')}</span>
            </motion.button>
          </div>
          {diagramContent}
        </motion.div>
      </div>

      <AnimatePresence>
        {isFullscreen && (
          <FullscreenPortal
            onClose={() => setIsFullscreen(false)}
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={handleTabChange}
            exitLabel={t('flow_exit_fullscreen')}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab + '-fs'}
                className="fd-diagram fd-diagram-fullscreen"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <ParticlesBackground />
                {activeTab === 'service' && <ServiceFlow active={true} />}
                {activeTab === 'tax' && <TaxFlow active={true} />}
                {activeTab === 'cycle' && <CycleFlow active={true} />}
                {activeTab === 'invoice' && <InvoiceFlow active={true} />}
              </motion.div>
            </AnimatePresence>
          </FullscreenPortal>
        )}
      </AnimatePresence>
    </section>
  );
}
