'use client';

import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useState } from 'react';

export default function BackToTop() {
  const { scrollYProgress } = useScroll();
  const [show, setShow] = useState(false);

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    setShow(latest > 0.15);
  });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.button
      className="back-to-top"
      onClick={scrollToTop}
      initial={{ opacity: 0, scale: 0.6 }}
      animate={show ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.6 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.12, y: -3 }}
      whileTap={{ scale: 0.92 }}
      aria-label="Back to top"
    >
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="18 15 12 9 6 15" />
      </svg>
      <svg className="back-to-top-ring" viewBox="0 0 48 48">
        <motion.circle
          cx="24"
          cy="24"
          r="21"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray="132"
          style={{
            strokeDashoffset: scrollYProgress.get() ? 132 - 132 * scrollYProgress.get() : 132,
            rotate: '-90deg',
            transformOrigin: 'center',
          }}
        />
      </svg>
    </motion.button>
  );
}
