'use client';

import { useCallback, useEffect, useState, memo } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  ReactFlow,
  Background,
  type Node,
  type Edge,
  type NodeProps,
  Position,
  BaseEdge,
  getSmoothStepPath,
  type EdgeProps,
  useReactFlow,
  ReactFlowProvider,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useLanguage } from '@/lib/LanguageContext';
import { scaleUp } from '@/lib/animations';
import SectionHeader from './SectionHeader';

const flowColors = ['#C41E2A', '#A01722', '#4A0E1B', '#2D2D2D', '#A01722', '#C41E2A'];
const flowIcons = [
  // Chat bubble - consultation
  <svg key="i1" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>,
  // Search - diagnosis
  <svg key="i2" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>,
  // File - proposal
  <svg key="i3" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/><path d="M9 15l2 2 4-4"/></svg>,
  // Play - execution
  <svg key="i4" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="10,8 16,12 10,16" fill="white" stroke="none"/></svg>,
  // Refresh - monitoring
  <svg key="i5" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"/></svg>,
  // Star - results
  <svg key="i6" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
];

/* ========== CUSTOM ANIMATED NODE ========== */
const CustomNode = memo(function CustomNode({ data }: NodeProps) {
  const { color, label, step, icon, isActive, delay } = data as {
    color: string;
    label: string;
    step: number;
    icon: React.ReactNode;
    isActive: boolean;
    delay: number;
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.3, y: 30 }}
      animate={
        isActive
          ? { opacity: 1, scale: 1, y: 0 }
          : { opacity: 0, scale: 0.3, y: 30 }
      }
      transition={{
        type: 'spring',
        stiffness: 180,
        damping: 18,
        delay: delay,
      }}
      className="flow-node"
      style={
        {
          '--node-color': color,
        } as React.CSSProperties
      }
    >
      <motion.div
        className="flow-node-glow"
        animate={
          isActive
            ? {
                boxShadow: [
                  `0 0 0px ${color}00`,
                  `0 8px 32px ${color}40`,
                  `0 4px 20px ${color}25`,
                ],
              }
            : {}
        }
        transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse', delay: delay + 0.5 }}
      />
      <div className="flow-node-inner" style={{ background: color }}>
        <motion.div
          className="flow-node-icon-ring"
          animate={isActive ? { rotate: 360 } : {}}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear', delay }}
        >
          <div className="flow-node-icon-ring-track" />
        </motion.div>
        <div className="flow-node-icon">{icon}</div>
        <div className="flow-node-step">{step}</div>
        <div className="flow-node-label">{label}</div>
      </div>
      <motion.div
        className="flow-node-pulse"
        style={{ borderColor: color }}
        animate={isActive ? { scale: [1, 1.4, 1], opacity: [0.4, 0, 0.4] } : {}}
        transition={{ duration: 2.5, repeat: Infinity, delay: delay + 0.3 }}
      />
    </motion.div>
  );
});

/* ========== ANIMATED EDGE ========== */
function AnimatedEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
}: EdgeProps) {
  const { isActive, delay } = (data || {}) as { isActive: boolean; delay: number };
  const [edgePath] = getSmoothStepPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    borderRadius: 20,
  });

  return (
    <>
      <BaseEdge
        id={id}
        path={edgePath}
        style={{
          stroke: '#E0E0E0',
          strokeWidth: 3,
          opacity: 0.3,
        }}
      />
      <motion.path
        d={edgePath}
        fill="none"
        stroke="#C41E2A"
        strokeWidth={3}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={
          isActive
            ? { pathLength: 1, opacity: 1 }
            : { pathLength: 0, opacity: 0 }
        }
        transition={{
          pathLength: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: delay },
          opacity: { duration: 0.2, delay: delay },
        }}
      />
      {isActive && (
        <motion.circle
          r={4}
          fill="#C41E2A"
          filter="drop-shadow(0 0 6px #C41E2A)"
          initial={{ offsetDistance: '0%', opacity: 0 }}
          animate={{ offsetDistance: '100%', opacity: [0, 1, 1, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: delay + 0.6,
            ease: 'linear',
          }}
          style={{
            offsetPath: `path("${edgePath}")`,
          }}
        />
      )}
    </>
  );
}

const nodeTypes = { custom: CustomNode };
const edgeTypes = { animated: AnimatedEdge };

/* ========== FLOW INNER (needs ReactFlowProvider above) ========== */
function FlowInner() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, margin: '-100px' });
  const [activated, setActivated] = useState(false);

  useEffect(() => {
    if (inView && !activated) {
      setActivated(true);
    }
  }, [inView, activated]);

  const steps = [
    t('flow_step1'),
    t('flow_step2'),
    t('flow_step3'),
    t('flow_step4'),
    t('flow_step5'),
    t('flow_step6'),
  ];

  const nodes: Node[] = steps.map((label, i) => ({
    id: `${i + 1}`,
    type: 'custom',
    position: { x: i * 210, y: 0 },
    data: {
      color: flowColors[i],
      label,
      step: i + 1,
      icon: flowIcons[i],
      isActive: activated,
      delay: i * 0.15,
    },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  }));

  const edges: Edge[] = steps.slice(0, -1).map((_, i) => ({
    id: `e${i + 1}-${i + 2}`,
    source: `${i + 1}`,
    target: `${i + 2}`,
    type: 'animated',
    data: {
      isActive: activated,
      delay: i * 0.15 + 0.3,
    },
  }));

  return (
    <div ref={containerRef}>
      <motion.div
        className="flow-diagram-rf"
        variants={scaleUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          fitView
          fitViewOptions={{ padding: 0.3 }}
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
          <Background color="rgba(196,30,42,0.04)" gap={24} size={1.5} />
        </ReactFlow>
      </motion.div>
    </div>
  );
}

/* ========== MAIN EXPORT ========== */
export default function FlowDiagram() {
  const { t } = useLanguage();

  return (
    <section className="section flow-section" id="flow">
      <div className="container">
        <SectionHeader
          tag={t('flow_tag')}
          title={t('flow_title')}
          desc={t('flow_desc')}
        />
        <ReactFlowProvider>
          <FlowInner />
        </ReactFlowProvider>
      </div>
    </section>
  );
}
