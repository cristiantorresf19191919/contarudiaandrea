'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useMemo } from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { fadeUpBlur, staggerContainerElegant } from '@/lib/animations';
import SectionHeader from './SectionHeader';

type RegimeType = 'simplified' | 'ordinary' | 'simple';

interface TaxResult {
  estimatedTax: number;
  potentialSavings: number;
  effectiveRate: number;
  recommendations: string[];
}

function formatCOP(value: number): string {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

function calculateTax(
  income: number,
  expenses: number,
  regime: RegimeType,
  isCompany: boolean,
  lang: string
): TaxResult {
  const UVT_2024 = 47065;
  const netIncome = Math.max(income - expenses, 0);
  let estimatedTax = 0;
  let potentialSavings = 0;
  const recommendations: string[] = [];

  if (isCompany) {
    // Corporate tax rate 35%
    const baseTax = netIncome * 0.35;
    if (regime === 'simple') {
      // Simple regime: lower rates for small businesses
      const simpleRate = income <= 300000000 ? 0.056 : income <= 800000000 ? 0.098 : 0.14;
      estimatedTax = income * simpleRate;
      potentialSavings = baseTax - estimatedTax;
    } else {
      estimatedTax = baseTax;
      if (income <= 800000000) {
        const simpleRate = income <= 300000000 ? 0.056 : 0.098;
        potentialSavings = baseTax - income * simpleRate;
        recommendations.push(
          lang === 'es'
            ? 'Su empresa podría beneficiarse del Régimen Simple de Tributación'
            : 'Your company could benefit from the Simple Tax Regime'
        );
      }
    }
    if (expenses / income < 0.3) {
      recommendations.push(
        lang === 'es'
          ? 'Sus deducciones son bajas. Podríamos optimizar su carga tributaria'
          : 'Your deductions are low. We could optimize your tax burden'
      );
    }
  } else {
    // Natural person progressive rates
    const uvtIncome = netIncome / UVT_2024;
    if (uvtIncome <= 1090) {
      estimatedTax = 0;
    } else if (uvtIncome <= 1700) {
      estimatedTax = (uvtIncome - 1090) * 0.19 * UVT_2024;
    } else if (uvtIncome <= 4100) {
      estimatedTax = ((1700 - 1090) * 0.19 + (uvtIncome - 1700) * 0.28) * UVT_2024;
    } else if (uvtIncome <= 8670) {
      estimatedTax =
        ((1700 - 1090) * 0.19 + (4100 - 1700) * 0.28 + (uvtIncome - 4100) * 0.33) * UVT_2024;
    } else {
      estimatedTax =
        ((1700 - 1090) * 0.19 +
          (4100 - 1700) * 0.28 +
          (8670 - 4100) * 0.33 +
          (uvtIncome - 8670) * 0.35) *
        UVT_2024;
    }
    // Potential savings with better deduction planning
    const additionalDeductions = Math.min(income * 0.15, 72 * UVT_2024);
    const optimizedNet = Math.max(netIncome - additionalDeductions, 0);
    const optimizedUvt = optimizedNet / UVT_2024;
    let optimizedTax = 0;
    if (optimizedUvt <= 1090) {
      optimizedTax = 0;
    } else if (optimizedUvt <= 1700) {
      optimizedTax = (optimizedUvt - 1090) * 0.19 * UVT_2024;
    } else if (optimizedUvt <= 4100) {
      optimizedTax = ((1700 - 1090) * 0.19 + (optimizedUvt - 1700) * 0.28) * UVT_2024;
    } else {
      optimizedTax =
        ((1700 - 1090) * 0.19 + (4100 - 1700) * 0.28 + (optimizedUvt - 4100) * 0.33) * UVT_2024;
    }
    potentialSavings = Math.max(estimatedTax - optimizedTax, 0);

    if (potentialSavings > 0) {
      recommendations.push(
        lang === 'es'
          ? 'Existen deducciones adicionales que podrían reducir significativamente su impuesto'
          : 'There are additional deductions that could significantly reduce your tax'
      );
    }
    if (income > 1400 * UVT_2024) {
      recommendations.push(
        lang === 'es'
          ? 'Su nivel de ingresos requiere planeación tributaria profesional'
          : 'Your income level requires professional tax planning'
      );
    }
  }

  if (recommendations.length === 0) {
    recommendations.push(
      lang === 'es'
        ? 'Contáctenos para una evaluación personalizada de su situación tributaria'
        : 'Contact us for a personalized assessment of your tax situation'
    );
  }

  const effectiveRate = income > 0 ? (estimatedTax / income) * 100 : 0;

  return {
    estimatedTax: Math.round(estimatedTax),
    potentialSavings: Math.round(potentialSavings),
    effectiveRate: Math.round(effectiveRate * 10) / 10,
    recommendations,
  };
}

export default function TaxCalculator() {
  const { lang, t } = useLanguage();
  const [income, setIncome] = useState('');
  const [expenses, setExpenses] = useState('');
  const [regime, setRegime] = useState<RegimeType>('ordinary');
  const [isCompany, setIsCompany] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const incomeNum = parseInt(income.replace(/\D/g, '')) || 0;
  const expensesNum = parseInt(expenses.replace(/\D/g, '')) || 0;

  const result = useMemo(
    () => calculateTax(incomeNum, expensesNum, regime, isCompany, lang),
    [incomeNum, expensesNum, regime, isCompany, lang]
  );

  const handleIncomeChange = (val: string) => {
    const raw = val.replace(/\D/g, '');
    if (raw) {
      setIncome(new Intl.NumberFormat('es-CO').format(parseInt(raw)));
    } else {
      setIncome('');
    }
  };

  const handleExpensesChange = (val: string) => {
    const raw = val.replace(/\D/g, '');
    if (raw) {
      setExpenses(new Intl.NumberFormat('es-CO').format(parseInt(raw)));
    } else {
      setExpenses('');
    }
  };

  const handleCalculate = () => {
    if (incomeNum > 0) setShowResults(true);
  };

  const waUrl = `https://wa.me/573022851810?text=${encodeURIComponent(
    lang === 'es'
      ? `Hola Andrea, usé la calculadora tributaria y mis ingresos anuales son ${formatCOP(incomeNum)}. Me gustaría una consulta para optimizar mi situación tributaria.`
      : `Hello Andrea, I used the tax calculator and my annual income is ${formatCOP(incomeNum)}. I would like a consultation to optimize my tax situation.`
  )}`;

  return (
    <section className="section calc-section" id="calculator">
      <div className="container">
        <SectionHeader
          tag={t('calc_tag')}
          title={t('calc_title')}
          desc={t('calc_desc')}
        />
        <motion.div
          className="calc-wrapper"
          variants={fadeUpBlur}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          <div className="calc-grid">
            <div className="calc-form">
              <div className="calc-toggle-group">
                <button
                  className={`calc-toggle ${!isCompany ? 'calc-toggle-active' : ''}`}
                  onClick={() => { setIsCompany(false); setShowResults(false); }}
                >
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                  {t('calc_person')}
                </button>
                <button
                  className={`calc-toggle ${isCompany ? 'calc-toggle-active' : ''}`}
                  onClick={() => { setIsCompany(true); setShowResults(false); }}
                >
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/></svg>
                  {t('calc_company')}
                </button>
              </div>

              <div className="calc-field">
                <label>{t('calc_income')}</label>
                <div className="calc-input-wrapper">
                  <span className="calc-currency">$</span>
                  <input
                    type="text"
                    value={income}
                    onChange={(e) => handleIncomeChange(e.target.value)}
                    placeholder="0"
                    inputMode="numeric"
                  />
                  <span className="calc-suffix">COP</span>
                </div>
              </div>

              <div className="calc-field">
                <label>{t('calc_expenses')}</label>
                <div className="calc-input-wrapper">
                  <span className="calc-currency">$</span>
                  <input
                    type="text"
                    value={expenses}
                    onChange={(e) => handleExpensesChange(e.target.value)}
                    placeholder="0"
                    inputMode="numeric"
                  />
                  <span className="calc-suffix">COP</span>
                </div>
              </div>

              {isCompany && (
                <div className="calc-field">
                  <label>{t('calc_regime')}</label>
                  <div className="calc-regime-options">
                    {(['ordinary', 'simple'] as RegimeType[]).map((r) => (
                      <button
                        key={r}
                        className={`calc-regime-btn ${regime === r ? 'calc-regime-active' : ''}`}
                        onClick={() => { setRegime(r); setShowResults(false); }}
                      >
                        {t(`calc_regime_${r}`)}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <motion.button
                className="calc-submit"
                onClick={handleCalculate}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                disabled={incomeNum === 0}
              >
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="10" x2="12" y2="10"/><line x1="8" y1="14" x2="16" y2="14"/><line x1="8" y1="18" x2="12" y2="18"/></svg>
                {t('calc_calculate')}
              </motion.button>
            </div>

            <AnimatePresence mode="wait">
              {showResults && incomeNum > 0 && (
                <motion.div
                  className="calc-results"
                  initial={{ opacity: 0, x: 30, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, x: -20, filter: 'blur(4px)' }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                  <motion.div
                    className="calc-results-grid"
                    variants={staggerContainerElegant}
                    initial="hidden"
                    animate="visible"
                  >
                    <motion.div className="calc-result-card" variants={fadeUpBlur}>
                      <div className="calc-result-icon">
                        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="18" rx="2"/><path d="M12 8v8M8 12h8"/></svg>
                      </div>
                      <div className="calc-result-label">{t('calc_estimated_tax')}</div>
                      <div className="calc-result-value">{formatCOP(result.estimatedTax)}</div>
                      <div className="calc-result-rate">{t('calc_effective_rate')}: {result.effectiveRate}%</div>
                    </motion.div>

                    {result.potentialSavings > 0 && (
                      <motion.div className="calc-result-card calc-result-savings" variants={fadeUpBlur}>
                        <div className="calc-result-icon calc-savings-icon">
                          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
                        </div>
                        <div className="calc-result-label">{t('calc_potential_savings')}</div>
                        <div className="calc-result-value calc-savings-value">{formatCOP(result.potentialSavings)}</div>
                        <div className="calc-savings-badge">{t('calc_savings_badge')}</div>
                      </motion.div>
                    )}
                  </motion.div>

                  <motion.div
                    className="calc-recommendations"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <h4>{t('calc_recommendations')}</h4>
                    <ul>
                      {result.recommendations.map((rec, i) => (
                        <li key={i}>
                          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#C41E2A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>

                  <motion.a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="calc-cta"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.6 }}
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    {t('calc_consult_cta')}
                  </motion.a>

                  <p className="calc-disclaimer">{t('calc_disclaimer')}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
