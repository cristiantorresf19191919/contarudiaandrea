'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { fadeUpBlur, popIn } from '@/lib/animations';
import SectionHeader from './SectionHeader';

interface Question {
  key: string;
  options: { label: string; score: number }[];
}

const riskLevels = [
  { min: 0, max: 3, key: 'low', color: '#25D366', icon: '✓' },
  { min: 4, max: 7, key: 'medium', color: '#F59E0B', icon: '⚠' },
  { min: 8, max: 12, key: 'high', color: '#EF4444', icon: '✕' },
  { min: 13, max: 20, key: 'critical', color: '#DC2626', icon: '🚨' },
];

export default function RiskQuiz() {
  const { t } = useLanguage();
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [started, setStarted] = useState(false);

  const questions: Question[] = [
    {
      key: 'quiz_q1',
      options: [
        { label: t('quiz_q1_a'), score: 0 },
        { label: t('quiz_q1_b'), score: 1 },
        { label: t('quiz_q1_c'), score: 3 },
        { label: t('quiz_q1_d'), score: 4 },
      ],
    },
    {
      key: 'quiz_q2',
      options: [
        { label: t('quiz_q2_a'), score: 0 },
        { label: t('quiz_q2_b'), score: 2 },
        { label: t('quiz_q2_c'), score: 4 },
      ],
    },
    {
      key: 'quiz_q3',
      options: [
        { label: t('quiz_q3_a'), score: 0 },
        { label: t('quiz_q3_b'), score: 1 },
        { label: t('quiz_q3_c'), score: 3 },
      ],
    },
    {
      key: 'quiz_q4',
      options: [
        { label: t('quiz_q4_a'), score: 0 },
        { label: t('quiz_q4_b'), score: 2 },
        { label: t('quiz_q4_c'), score: 4 },
      ],
    },
    {
      key: 'quiz_q5',
      options: [
        { label: t('quiz_q5_a'), score: 0 },
        { label: t('quiz_q5_b'), score: 2 },
        { label: t('quiz_q5_c'), score: 3 },
      ],
    },
  ];

  const totalScore = answers.reduce((a, b) => a + b, 0);
  const riskLevel = riskLevels.find((l) => totalScore >= l.min && totalScore <= l.max) || riskLevels[3];
  const progress = ((currentQ) / questions.length) * 100;

  const handleAnswer = (score: number) => {
    const newAnswers = [...answers, score];
    setAnswers(newAnswers);
    if (currentQ + 1 < questions.length) {
      setCurrentQ(currentQ + 1);
    } else {
      setShowResults(true);
    }
  };

  const restart = () => {
    setCurrentQ(0);
    setAnswers([]);
    setShowResults(false);
    setStarted(false);
  };

  const waUrl = `https://wa.me/573022851810?text=${encodeURIComponent(
    t('quiz_wa_msg').replace('{level}', t(`quiz_result_${riskLevel.key}`))
  )}`;

  return (
    <section className="section quiz-section" id="quiz">
      <div className="container">
        <SectionHeader
          tag={t('quiz_tag')}
          title={t('quiz_title')}
          desc={t('quiz_desc')}
        />
        <motion.div
          className="quiz-wrapper"
          variants={fadeUpBlur}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          <AnimatePresence mode="wait">
            {!started ? (
              <motion.div
                key="intro"
                className="quiz-intro"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="quiz-intro-icon">
                  <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M12 8v4M12 16h.01"/></svg>
                </div>
                <h3>{t('quiz_intro_title')}</h3>
                <p>{t('quiz_intro_desc')}</p>
                <ul className="quiz-intro-points">
                  <li>
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#C41E2A" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                    {t('quiz_intro_p1')}
                  </li>
                  <li>
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#C41E2A" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                    {t('quiz_intro_p2')}
                  </li>
                  <li>
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#C41E2A" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                    {t('quiz_intro_p3')}
                  </li>
                </ul>
                <motion.button
                  className="quiz-start-btn"
                  onClick={() => setStarted(true)}
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {t('quiz_start')}
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </motion.button>
              </motion.div>
            ) : !showResults ? (
              <motion.div
                key={`q-${currentQ}`}
                className="quiz-question-card"
                initial={{ opacity: 0, x: 40, filter: 'blur(6px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, x: -40, filter: 'blur(4px)' }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="quiz-progress">
                  <div className="quiz-progress-label">
                    {t('quiz_question')} {currentQ + 1}/{questions.length}
                  </div>
                  <div className="quiz-progress-bar">
                    <motion.div
                      className="quiz-progress-fill"
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </div>
                </div>
                <h3 className="quiz-q-text">{t(questions[currentQ].key)}</h3>
                <div className="quiz-options">
                  {questions[currentQ].options.map((opt, i) => (
                    <motion.button
                      key={i}
                      className="quiz-option"
                      onClick={() => handleAnswer(opt.score)}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.08, duration: 0.4 }}
                      whileHover={{ scale: 1.02, x: 6 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="quiz-option-letter">{String.fromCharCode(65 + i)}</span>
                      <span>{opt.label}</span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="results"
                className="quiz-results"
                variants={popIn}
                initial="hidden"
                animate="visible"
              >
                <motion.div
                  className="quiz-score-ring"
                  style={{ borderColor: riskLevel.color }}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 100, damping: 15, delay: 0.2 }}
                >
                  <span className="quiz-score-icon">{riskLevel.icon}</span>
                </motion.div>
                <motion.div
                  className="quiz-result-badge"
                  style={{ background: riskLevel.color }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  {t(`quiz_result_${riskLevel.key}`)}
                </motion.div>
                <h3>{t(`quiz_result_${riskLevel.key}_title`)}</h3>
                <p>{t(`quiz_result_${riskLevel.key}_desc`)}</p>

                <div className="quiz-result-actions">
                  <motion.a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="quiz-cta-primary"
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    {t('quiz_cta_consult')}
                  </motion.a>
                  <button className="quiz-cta-secondary" onClick={restart}>
                    {t('quiz_restart')}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
