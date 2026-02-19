'use client';

import { useEffect, useState, memo, useRef, useCallback } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  ReactFlow,
  Background,
  type Node,
  type Edge,
  type NodeProps,
  Position,
  BaseEdge,
  getBezierPath,
  getSmoothStepPath,
  type EdgeProps,
  ReactFlowProvider,
  BackgroundVariant,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useLanguage } from '@/lib/LanguageContext';
import { scaleUp } from '@/lib/animations';
import SectionHeader from './SectionHeader';

/* ====================================================================
   ICONS (inline SVGs)
   ==================================================================== */
const Icons = {
  chat: <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>,
  search: <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>,
  file: <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/><path d="M9 15l2 2 4-4"/></svg>,
  play: <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="10,8 16,12 10,16" fill="white" stroke="none"/></svg>,
  refresh: <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"/></svg>,
  star: <svg viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  building: <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v18M3 9h18M3 15h18M15 3v18"/></svg>,
  percent: <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="5" x2="5" y2="19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></svg>,
  calendar: <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  shield: <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>,
  gov: <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 20h20M4 20V9l8-5 8 5v11"/><path d="M9 20v-5h6v5"/><path d="M8 9h1M15 9h1"/><path d="M8 13h1M15 13h1"/></svg>,
  check: <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
  edit: <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
  book: <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg>,
  balance: <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="3" x2="12" y2="21"/><polyline points="4 9 12 5 20 9"/><path d="M4 9c0 3 3.5 5 8 5s8-2 8-5"/><line x1="4" y1="15" x2="20" y2="15"/></svg>,
  chart: <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
  lock: <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>,
  rocket: <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z"/><path d="M12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>,
};

/* ====================================================================
   CUSTOM NODE TYPES
   ==================================================================== */

/* --- Process Node (main service flow) --- */
const ProcessNode = memo(function ProcessNode({ data }: NodeProps) {
  const d = data as { color: string; label: string; step: number; icon: React.ReactNode; isActive: boolean; delay: number; subtitle?: string };
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.3, y: 30 }}
      animate={d.isActive ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.3, y: 30 }}
      transition={{ type: 'spring', stiffness: 180, damping: 18, delay: d.delay }}
      className="rf-process-node"
    >
      <motion.div
        className="rf-process-glow"
        animate={d.isActive ? { boxShadow: [`0 0 0px ${d.color}00`, `0 8px 32px ${d.color}40`, `0 4px 20px ${d.color}25`] } : {}}
        transition={{ duration: 2.5, repeat: Infinity, repeatType: 'reverse', delay: d.delay + 0.5 }}
      />
      <div className="rf-process-inner" style={{ background: d.color }}>
        <motion.div
          className="rf-process-ring"
          animate={d.isActive ? { rotate: 360 } : {}}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />
        <div className="rf-process-icon">{d.icon}</div>
        <div className="rf-process-step">{d.step}</div>
        <div className="rf-process-label">{d.label}</div>
      </div>
      <motion.div
        className="rf-process-pulse"
        style={{ borderColor: d.color }}
        animate={d.isActive ? { scale: [1, 1.35, 1], opacity: [0.3, 0, 0.3] } : {}}
        transition={{ duration: 2.5, repeat: Infinity, delay: d.delay + 0.3 }}
      />
    </motion.div>
  );
});

/* --- Hub Node (central company node) --- */
const HubNode = memo(function HubNode({ data }: NodeProps) {
  const d = data as { label: string; icon: React.ReactNode; isActive: boolean; delay: number };
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={d.isActive ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, delay: d.delay }}
      className="rf-hub-node"
    >
      <motion.div
        className="rf-hub-ring-outer"
        animate={d.isActive ? { rotate: 360 } : {}}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="rf-hub-ring-inner"
        animate={d.isActive ? { rotate: -360 } : {}}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      />
      <div className="rf-hub-core">
        <div className="rf-hub-icon">{d.icon}</div>
        <div className="rf-hub-label">{d.label}</div>
      </div>
      <motion.div
        className="rf-hub-pulse"
        animate={d.isActive ? { scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] } : {}}
        transition={{ duration: 3, repeat: Infinity }}
      />
    </motion.div>
  );
});

/* --- Tax Node (obligation cards) --- */
const TaxNode = memo(function TaxNode({ data }: NodeProps) {
  const d = data as { color: string; label: string; subtitle: string; icon: React.ReactNode; isActive: boolean; delay: number; freq?: string };
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, y: 20 }}
      animate={d.isActive ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.5, y: 20 }}
      transition={{ type: 'spring', stiffness: 200, damping: 18, delay: d.delay }}
      className="rf-tax-node"
    >
      <div className="rf-tax-inner" style={{ background: d.color }}>
        <div className="rf-tax-icon">{d.icon}</div>
        <div className="rf-tax-label">{d.label}</div>
        <div className="rf-tax-sub">{d.subtitle}</div>
      </div>
      {d.freq && <div className="rf-tax-badge" style={{ background: d.color }}>{d.freq}</div>}
    </motion.div>
  );
});

/* --- Destination Node (DIAN etc.) --- */
const DestNode = memo(function DestNode({ data }: NodeProps) {
  const d = data as { color: string; label: string; icon: React.ReactNode; isActive: boolean; delay: number };
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={d.isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
      transition={{ type: 'spring', stiffness: 150, damping: 18, delay: d.delay }}
      className="rf-dest-node"
    >
      <div className="rf-dest-inner" style={{ background: d.color }}>
        <div className="rf-dest-icon">{d.icon}</div>
        <div className="rf-dest-label">{d.label}</div>
      </div>
      <motion.div
        className="rf-dest-glow"
        style={{ background: d.color }}
        animate={d.isActive ? { opacity: [0.1, 0.3, 0.1] } : {}}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </motion.div>
  );
});

/* --- Cycle Node (accounting cycle) --- */
const CycleNode = memo(function CycleNode({ data }: NodeProps) {
  const d = data as { color: string; label: string; icon: React.ReactNode; isActive: boolean; delay: number; step: number };
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.4 }}
      animate={d.isActive ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.4 }}
      transition={{ type: 'spring', stiffness: 180, damping: 16, delay: d.delay }}
      className="rf-cycle-node"
    >
      <motion.div
        className="rf-cycle-inner"
        style={{ borderColor: d.color }}
        whileHover={{ scale: 1.08, boxShadow: `0 8px 30px ${d.color}30` }}
      >
        <div className="rf-cycle-icon-wrap" style={{ background: d.color }}>
          <div className="rf-cycle-icon">{d.icon}</div>
        </div>
        <div className="rf-cycle-step" style={{ color: d.color }}>{d.step}</div>
        <div className="rf-cycle-label">{d.label}</div>
      </motion.div>
    </motion.div>
  );
});

/* ====================================================================
   ANIMATED EDGES
   ==================================================================== */
function AnimatedSmoothEdge({ id, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, data }: EdgeProps) {
  const d = (data || {}) as { isActive: boolean; delay: number; color?: string };
  const [edgePath] = getSmoothStepPath({ sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, borderRadius: 16 });
  return (
    <>
      <BaseEdge id={id} path={edgePath} style={{ stroke: '#E0E0E0', strokeWidth: 2.5, opacity: 0.25 }} />
      <motion.path
        d={edgePath} fill="none" stroke={d.color || '#C41E2A'} strokeWidth={2.5}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={d.isActive ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
        transition={{ pathLength: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: d.delay }, opacity: { duration: 0.2, delay: d.delay } }}
      />
      {d.isActive && (
        <motion.circle r={3.5} fill={d.color || '#C41E2A'} filter={`drop-shadow(0 0 5px ${d.color || '#C41E2A'})`}
          initial={{ offsetDistance: '0%', opacity: 0 }}
          animate={{ offsetDistance: '100%', opacity: [0, 1, 1, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, delay: d.delay + 0.5, ease: 'linear' }}
          style={{ offsetPath: `path("${edgePath}")` }}
        />
      )}
    </>
  );
}

function AnimatedBezierEdge({ id, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, data }: EdgeProps) {
  const d = (data || {}) as { isActive: boolean; delay: number; color?: string };
  const [edgePath] = getBezierPath({ sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition });
  return (
    <>
      <BaseEdge id={id} path={edgePath} style={{ stroke: '#E0E0E0', strokeWidth: 2, opacity: 0.2 }} />
      <motion.path
        d={edgePath} fill="none" stroke={d.color || '#C41E2A'} strokeWidth={2} strokeDasharray="6 3"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={d.isActive ? { pathLength: 1, opacity: 0.8 } : { pathLength: 0, opacity: 0 }}
        transition={{ pathLength: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: d.delay }, opacity: { duration: 0.2, delay: d.delay } }}
      />
      {d.isActive && (
        <motion.circle r={3} fill={d.color || '#C41E2A'} filter={`drop-shadow(0 0 4px ${d.color || '#C41E2A'})`}
          initial={{ offsetDistance: '0%', opacity: 0 }}
          animate={{ offsetDistance: '100%', opacity: [0, 1, 1, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: d.delay + 0.4, ease: 'linear' }}
          style={{ offsetPath: `path("${edgePath}")` }}
        />
      )}
    </>
  );
}

const nodeTypes = { process: ProcessNode, hub: HubNode, tax: TaxNode, dest: DestNode, cycle: CycleNode };
const edgeTypes = { animatedSmooth: AnimatedSmoothEdge, animatedBezier: AnimatedBezierEdge };

/* ====================================================================
   DIAGRAM DATA BUILDERS
   ==================================================================== */
function buildServiceFlow(t: (k: string) => string, active: boolean) {
  const colors = ['#C41E2A', '#A01722', '#4A0E1B', '#2D2D2D', '#A01722', '#C41E2A'];
  const icons = [Icons.chat, Icons.search, Icons.file, Icons.play, Icons.refresh, Icons.star];
  const steps = [t('flow_step1'), t('flow_step2'), t('flow_step3'), t('flow_step4'), t('flow_step5'), t('flow_step6')];

  const nodes: Node[] = steps.map((label, i) => ({
    id: `s${i}`, type: 'process', position: { x: i * 210, y: 10 },
    data: { color: colors[i], label, step: i + 1, icon: icons[i], isActive: active, delay: i * 0.12 },
    sourcePosition: Position.Right, targetPosition: Position.Left,
  }));
  const edges: Edge[] = steps.slice(0, -1).map((_, i) => ({
    id: `se${i}`, source: `s${i}`, target: `s${i + 1}`, type: 'animatedSmooth',
    data: { isActive: active, delay: i * 0.12 + 0.2 },
  }));
  return { nodes, edges };
}

function buildTaxFlow(t: (k: string) => string, active: boolean) {
  const taxes = [
    { id: 'iva', label: t('tax_iva'), sub: t('tax_iva_desc'), color: '#C41E2A', freq: 'Bim/Cuatr', y: -110 },
    { id: 'rete', label: t('tax_rete'), sub: t('tax_rete_desc'), color: '#A01722', freq: 'Mensual', y: -20 },
    { id: 'ica', label: t('tax_ica'), sub: t('tax_ica_desc'), color: '#4A0E1B', freq: 'Bim', y: 70 },
    { id: 'renta', label: t('tax_renta'), sub: t('tax_renta_desc'), color: '#2D2D2D', freq: 'Anual', y: 160 },
    { id: 'exo', label: t('tax_exo'), sub: t('tax_exo_desc'), color: '#6B2130', freq: 'Anual', y: 250 },
  ];

  const nodes: Node[] = [
    {
      id: 'company', type: 'hub', position: { x: 0, y: 50 },
      data: { label: t('tax_company'), icon: Icons.building, isActive: active, delay: 0 },
      sourcePosition: Position.Right, targetPosition: Position.Left,
    },
    ...taxes.map((tx, i) => ({
      id: tx.id, type: 'tax' as const, position: { x: 320, y: tx.y },
      data: { color: tx.color, label: tx.label, subtitle: tx.sub, icon: Icons.percent, isActive: active, delay: 0.15 + i * 0.1, freq: tx.freq },
      sourcePosition: Position.Right, targetPosition: Position.Left,
    })),
    {
      id: 'dian', type: 'dest', position: { x: 630, y: -30 },
      data: { color: '#1a5276', label: t('tax_dian'), icon: Icons.gov, isActive: active, delay: 0.8 },
      sourcePosition: Position.Right, targetPosition: Position.Left,
    },
    {
      id: 'shd', type: 'dest', position: { x: 630, y: 80 },
      data: { color: '#1a5276', label: t('tax_shd'), icon: Icons.gov, isActive: active, delay: 0.85 },
      sourcePosition: Position.Right, targetPosition: Position.Left,
    },
    {
      id: 'paz', type: 'dest', position: { x: 630, y: 190 },
      data: { color: '#0e6655', label: t('tax_paz'), icon: Icons.shield, isActive: active, delay: 0.9 },
      sourcePosition: Position.Right, targetPosition: Position.Left,
    },
  ];

  const edges: Edge[] = [
    ...taxes.map((tx, i) => ({
      id: `ec-${tx.id}`, source: 'company', target: tx.id, type: 'animatedBezier' as const,
      data: { isActive: active, delay: 0.25 + i * 0.1, color: tx.color },
    })),
    { id: 'eiva-dian', source: 'iva', target: 'dian', type: 'animatedBezier', data: { isActive: active, delay: 0.7, color: '#1a5276' } },
    { id: 'erete-dian', source: 'rete', target: 'dian', type: 'animatedBezier', data: { isActive: active, delay: 0.72, color: '#1a5276' } },
    { id: 'eica-shd', source: 'ica', target: 'shd', type: 'animatedBezier', data: { isActive: active, delay: 0.75, color: '#1a5276' } },
    { id: 'erenta-dian', source: 'renta', target: 'dian', type: 'animatedBezier', data: { isActive: active, delay: 0.78, color: '#1a5276' } },
    { id: 'eexo-dian', source: 'exo', target: 'dian', type: 'animatedBezier', data: { isActive: active, delay: 0.8, color: '#1a5276' } },
    { id: 'edian-paz', source: 'dian', target: 'paz', type: 'animatedBezier', data: { isActive: active, delay: 0.9, color: '#0e6655' } },
    { id: 'eshd-paz', source: 'shd', target: 'paz', type: 'animatedBezier', data: { isActive: active, delay: 0.92, color: '#0e6655' } },
  ];
  return { nodes, edges };
}

function buildAccountingCycle(t: (k: string) => string, active: boolean) {
  const items = [
    { label: t('acc_register'), icon: Icons.edit, color: '#C41E2A' },
    { label: t('acc_journal'), icon: Icons.book, color: '#A01722' },
    { label: t('acc_ledger'), icon: Icons.book, color: '#4A0E1B' },
    { label: t('acc_trial'), icon: Icons.balance, color: '#2D2D2D' },
    { label: t('acc_adjust'), icon: Icons.refresh, color: '#4A0E1B' },
    { label: t('acc_statements'), icon: Icons.chart, color: '#A01722' },
    { label: t('acc_close'), icon: Icons.lock, color: '#C41E2A' },
    { label: t('acc_analysis'), icon: Icons.rocket, color: '#0e6655' },
  ];

  // Two rows: top 4, bottom 4 (reversed for flow)
  const nodes: Node[] = items.map((item, i) => {
    const row = i < 4 ? 0 : 1;
    const col = row === 0 ? i : 7 - i;
    return {
      id: `c${i}`, type: 'cycle', position: { x: col * 230, y: row * 180 },
      data: { color: item.color, label: item.label, icon: item.icon, isActive: active, delay: i * 0.1, step: i + 1 },
      sourcePosition: row === 0 ? Position.Right : Position.Left,
      targetPosition: row === 0 ? Position.Left : Position.Right,
    };
  });

  const edges: Edge[] = [
    { id: 'ce01', source: 'c0', target: 'c1', type: 'animatedSmooth', data: { isActive: active, delay: 0.15, color: '#A01722' } },
    { id: 'ce12', source: 'c1', target: 'c2', type: 'animatedSmooth', data: { isActive: active, delay: 0.25, color: '#4A0E1B' } },
    { id: 'ce23', source: 'c2', target: 'c3', type: 'animatedSmooth', data: { isActive: active, delay: 0.35, color: '#2D2D2D' } },
    { id: 'ce34', source: 'c3', target: 'c4', type: 'animatedBezier', data: { isActive: active, delay: 0.45, color: '#4A0E1B' } },
    { id: 'ce45', source: 'c4', target: 'c5', type: 'animatedSmooth', data: { isActive: active, delay: 0.55, color: '#A01722' } },
    { id: 'ce56', source: 'c5', target: 'c6', type: 'animatedSmooth', data: { isActive: active, delay: 0.65, color: '#C41E2A' } },
    { id: 'ce67', source: 'c6', target: 'c7', type: 'animatedSmooth', data: { isActive: active, delay: 0.75, color: '#0e6655' } },
    { id: 'ce70', source: 'c7', target: 'c0', type: 'animatedBezier', data: { isActive: active, delay: 0.85, color: '#C41E2A' } },
  ];

  return { nodes, edges };
}

/* ====================================================================
   TAB SELECTOR
   ==================================================================== */
function TabSelector({ tabs, active, onChange }: { tabs: { key: string; label: string; icon: React.ReactNode }[]; active: string; onChange: (k: string) => void }) {
  return (
    <div className="rf-tabs">
      {tabs.map((tab) => (
        <motion.button
          key={tab.key}
          className={`rf-tab ${active === tab.key ? 'rf-tab-active' : ''}`}
          onClick={() => onChange(tab.key)}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <span className="rf-tab-icon">{tab.icon}</span>
          <span>{tab.label}</span>
          {active === tab.key && (
            <motion.div className="rf-tab-indicator" layoutId="tabIndicator" transition={{ type: 'spring', stiffness: 400, damping: 30 }} />
          )}
        </motion.button>
      ))}
    </div>
  );
}

/* ====================================================================
   FLOW INNER
   ==================================================================== */
function FlowInner() {
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

  let flow: { nodes: Node[]; edges: Edge[] };
  let fitPadding = 0.25;
  if (activeTab === 'tax') {
    flow = buildTaxFlow(t, activated);
    fitPadding = 0.15;
  } else if (activeTab === 'cycle') {
    flow = buildAccountingCycle(t, activated);
    fitPadding = 0.2;
  } else {
    flow = buildServiceFlow(t, activated);
    fitPadding = 0.25;
  }

  return (
    <div ref={containerRef}>
      <TabSelector tabs={tabs} active={activeTab} onChange={handleTabChange} />
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          className="rf-diagram"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <ReactFlow
            nodes={flow.nodes}
            edges={flow.edges}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            fitView
            fitViewOptions={{ padding: fitPadding }}
            panOnDrag={false}
            zoomOnScroll={false}
            zoomOnPinch={false}
            zoomOnDoubleClick={false}
            preventScrolling={false}
            nodesDraggable={false}
            nodesConnectable={false}
            elementsSelectable={false}
            proOptions={{ hideAttribution: true }}
          >
            <Background variant={BackgroundVariant.Dots} color="rgba(196,30,42,0.06)" gap={20} size={1.5} />
          </ReactFlow>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ====================================================================
   EXPORT
   ==================================================================== */
export default function FlowDiagram() {
  const { t } = useLanguage();
  return (
    <section className="section flow-section" id="flow">
      <div className="container">
        <SectionHeader tag={t('flow_tag')} title={t('flow_title')} desc={t('flow_desc')} />
        <motion.div variants={scaleUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }}>
          <ReactFlowProvider>
            <FlowInner />
          </ReactFlowProvider>
        </motion.div>
      </div>
    </section>
  );
}
