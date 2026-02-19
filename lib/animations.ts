import { Variants, Transition } from 'framer-motion';

export const spring: Transition = {
  type: 'spring',
  stiffness: 100,
  damping: 20,
  mass: 0.8,
};

export const springBouncy: Transition = {
  type: 'spring',
  stiffness: 200,
  damping: 15,
  mass: 0.6,
};

export const smoothEase: Transition = {
  duration: 0.8,
  ease: [0.16, 1, 0.3, 1],
};

// Stagger container
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

export const staggerContainerSlow: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

// Fade up with blur
export const fadeUpBlur: Variants = {
  hidden: {
    opacity: 0,
    y: 60,
    scale: 0.97,
    filter: 'blur(4px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

// Fade up simple
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

// Slide from left
export const slideLeft: Variants = {
  hidden: { opacity: 0, x: -80, rotate: -2, filter: 'blur(3px)' },
  visible: {
    opacity: 1,
    x: 0,
    rotate: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
};

// Slide from right
export const slideRight: Variants = {
  hidden: { opacity: 0, x: 80, rotate: 2, filter: 'blur(3px)' },
  visible: {
    opacity: 1,
    x: 0,
    rotate: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
};

// Scale up with blur
export const scaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.8, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
  },
};

// Card cascade item
export const cascadeCard: Variants = {
  hidden: {
    opacity: 0,
    y: 50,
    scale: 0.95,
    filter: 'blur(3px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

// 3D flip up (for stat cards)
export const flipUp: Variants = {
  hidden: {
    opacity: 0,
    rotateX: 15,
    y: 30,
    transformPerspective: 600,
  },
  visible: {
    opacity: 1,
    rotateX: 0,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

// Icon bounce
export const iconBounce: Variants = {
  hidden: { scale: 0, rotate: -20 },
  visible: {
    scale: 1,
    rotate: 0,
    transition: { type: 'spring', stiffness: 200, damping: 12 },
  },
};

// Icon spin
export const iconSpin: Variants = {
  hidden: { scale: 0, rotate: -180, opacity: 0 },
  visible: {
    scale: 1,
    rotate: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 200, damping: 12 },
  },
};

// Pop effect (CTA)
export const popIn: Variants = {
  hidden: { opacity: 0, scale: 0.9, y: 40, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
};

// Slide in item (for lists)
export const slideInItem: Variants = {
  hidden: { opacity: 0, x: -25 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

// Line grow
export const lineGrow: Variants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.4 },
  },
};

// Hero entrance
export const heroChild: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.97, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
};

export const heroVisual: Variants = {
  hidden: { opacity: 0, scale: 0.7, rotate: -5, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    filter: 'blur(0px)',
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 },
  },
};
