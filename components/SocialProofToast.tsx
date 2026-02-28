'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';

interface ToastData {
  name: string;
  action: string;
  time: string;
  city: string;
}

export default function SocialProofToast() {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);
  const [currentToast, setCurrentToast] = useState(0);

  const toasts: ToastData[] = [
    { name: t('toast_name1'), action: t('toast_action1'), time: t('toast_time1'), city: 'Bogotá' },
    { name: t('toast_name2'), action: t('toast_action2'), time: t('toast_time2'), city: 'Medellín' },
    { name: t('toast_name3'), action: t('toast_action3'), time: t('toast_time3'), city: 'Cali' },
    { name: t('toast_name4'), action: t('toast_action4'), time: t('toast_time4'), city: 'Barranquilla' },
    { name: t('toast_name5'), action: t('toast_action5'), time: t('toast_time5'), city: 'Cartagena' },
  ];

  const showNextToast = useCallback(() => {
    setCurrentToast((prev) => (prev + 1) % toasts.length);
    setVisible(true);
    setTimeout(() => setVisible(false), 4000);
  }, [toasts.length]);

  useEffect(() => {
    const initialDelay = setTimeout(() => {
      showNextToast();
    }, 8000);

    const interval = setInterval(() => {
      showNextToast();
    }, 15000);

    return () => {
      clearTimeout(initialDelay);
      clearInterval(interval);
    };
  }, [showNextToast]);

  const toast = toasts[currentToast];

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="social-toast"
          initial={{ opacity: 0, x: -60, y: 0, filter: 'blur(6px)' }}
          animate={{ opacity: 1, x: 0, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, x: -40, filter: 'blur(4px)' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <button
            className="social-toast-close"
            onClick={() => setVisible(false)}
            aria-label="Close"
          >
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
          <div className="social-toast-avatar">
            {toast.name.charAt(0)}
          </div>
          <div className="social-toast-content">
            <div className="social-toast-name">{toast.name}</div>
            <div className="social-toast-action">{toast.action}</div>
            <div className="social-toast-meta">
              <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              {toast.city} &middot; {toast.time}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
