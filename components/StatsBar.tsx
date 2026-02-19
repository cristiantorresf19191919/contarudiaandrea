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
