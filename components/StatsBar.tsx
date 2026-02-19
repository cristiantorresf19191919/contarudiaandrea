'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { staggerContainerSlow, flipUp } from '@/lib/animations';

function AnimatedCounter({ target, inView }: { target: number; inView: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let current = 0;
    const increment = target / 60;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      setCount(Math.floor(current));
    }, 25);
    return () => clearInterval(timer);
  }, [inView, target]);

  return <>{count}+</>;
}

const statIcons = [
  <svg key="1" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  <svg key="2" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>,
  <svg key="3" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/><path d="M9 15l2 2 4-4"/></svg>,
  <svg key="4" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
];

export default function StatsBar() {
  const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  const stats = [
    { count: 15, label: t('stat1_label') },
    { count: 500, label: t('stat2_label') },
    { count: 100, label: t('stat3_label') },
    { count: 6, label: t('stat4_label') },
  ];

  return (
    <motion.div
      className="stats-bar"
      ref={ref}
      variants={staggerContainerSlow}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
    >
      <div className="container stats-grid">
        {stats.map((stat, i) => (
          <motion.div key={i} className="stat-card" variants={flipUp}>
            <div className="stat-icon">{statIcons[i]}</div>
            <div className="stat-number">
              <AnimatedCounter target={stat.count} inView={inView} />
            </div>
            <div className="stat-label">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
