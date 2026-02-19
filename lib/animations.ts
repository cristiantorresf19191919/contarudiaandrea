import { Variants, Transition } from 'framer-motion';

/* ========== TRANSITIONS ========== */
export const spring: Transition = {
  type: 'spring',
  stiffness: 80,
  damping: 22,
  mass: 1,
};

export const springBouncy: Transition = {
  type: 'spring',
  stiffness: 150,
  damping: 18,
  mass: 0.7,
};

export const smoothEase: Transition = {
  duration: 1,
  ease: [0.22, 1, 0.36, 1],
};

// Cinematic ease – slow in, smooth out
const cinema: [number, number, number, number] = [0.22, 1, 0.36, 1];
const gentle: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

/* ========== STAGGER CONTAINERS ========== */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

export const staggerContainerSlow: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.15,
    },
  },
};

export const staggerContainerElegant: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.2,
    },
  },
};

/* ========== REVEAL ANIMATIONS ========== */

// Elegant fade up with subtle blur dissolution
export const fadeUpBlur: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
    filter: 'blur(8px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 1, ease: cinema },
  },
};

// Simple fade up
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: cinema },
  },
};

// Curtain reveal from left with elegant motion
export const slideLeft: Variants = {
  hidden: { opacity: 0, x: -60, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: { duration: 1.1, ease: cinema },
  },
};

// Curtain reveal from right
export const slideRight: Variants = {
  hidden: { opacity: 0, x: 60, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: { duration: 1.1, ease: cinema },
  },
};

// Scale up with cinematic blur
export const scaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.85, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 1.2, ease: cinema },
  },
};

/* ========== CARD ANIMATIONS ========== */

// Sophisticated card reveal with 3D perspective
export const cascadeCard: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.96,
    filter: 'blur(4px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.85, ease: cinema },
  },
};

// 3D flip up (for stat cards) – refined with perspective
export const flipUp: Variants = {
  hidden: {
    opacity: 0,
    rotateX: 12,
    y: 24,
    transformPerspective: 800,
    filter: 'blur(2px)',
  },
  visible: {
    opacity: 1,
    rotateX: 0,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.9, ease: cinema },
  },
};

/* ========== ICON ANIMATIONS ========== */

// Elegant icon entrance – gentle spring
export const iconBounce: Variants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 120,
      damping: 14,
      mass: 0.8,
    },
  },
};

// Icon reveal with rotation
export const iconSpin: Variants = {
  hidden: { scale: 0, rotate: -90, opacity: 0 },
  visible: {
    scale: 1,
    rotate: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 14,
      mass: 0.9,
    },
  },
};

/* ========== SPECIAL ANIMATIONS ========== */

// Pop in – for CTA and emphasis elements
export const popIn: Variants = {
  hidden: { opacity: 0, scale: 0.92, y: 30, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 1.1, ease: cinema },
  },
};

// Slide in item (for lists)
export const slideInItem: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, ease: cinema },
  },
};

// Line grow – elegant underline reveal
export const lineGrow: Variants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.8, ease: cinema, delay: 0.5 },
  },
};

/* ========== HERO ANIMATIONS ========== */

// Hero child entrance – dramatic with blur dissolution
export const heroChild: Variants = {
  hidden: { opacity: 0, y: 35, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 1.1, ease: cinema },
  },
};

// Hero visual – cinematic scale reveal
export const heroVisual: Variants = {
  hidden: { opacity: 0, scale: 0.75, filter: 'blur(12px)' },
  visible: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 1.5, ease: cinema, delay: 0.4 },
  },
};

/* ========== NEW ELEGANT ANIMATIONS ========== */

// Smooth text reveal from below (for headings)
export const textReveal: Variants = {
  hidden: { opacity: 0, y: 20, filter: 'blur(3px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: gentle },
  },
};

// Subtle float in from right with no rotation
export const gentleSlideRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 1, ease: cinema },
  },
};

// Expand and reveal for containers
export const expandReveal: Variants = {
  hidden: { opacity: 0, scaleY: 0.95, transformOrigin: 'top' },
  visible: {
    opacity: 1,
    scaleY: 1,
    transition: { duration: 0.7, ease: cinema },
  },
};
