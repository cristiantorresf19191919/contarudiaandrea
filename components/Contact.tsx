'use client';

import { motion } from 'framer-motion';
import { FormEvent, useState } from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { slideLeft, slideRight, slideInItem, fadeUp } from '@/lib/animations';
import SectionHeader from './SectionHeader';

const contactItemContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
};

const formFieldContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

export default function Contact() {
  const { lang, t } = useLanguage();
  const [name, setName] = useState('');
  const [service, setService] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    let waText: string;
    if (lang === 'es') {
      waText = `Hola Andrea, soy ${name}. Estoy interesado(a) en el servicio de *${service}*.`;
      if (message) waText += `\n\nDetalle: ${message}`;
      waText += '\n\n\u00bfPodr\u00edamos agendar una consulta?';
    } else {
      waText = `Hello Andrea, my name is ${name}. I am interested in the *${service}* service.`;
      if (message) waText += `\n\nDetails: ${message}`;
      waText += '\n\nCould we schedule a consultation?';
    }
    window.open(`https://wa.me/573022851810?text=${encodeURIComponent(waText)}`, '_blank');
  };

  const serviceOptions = [
    { value: 'Contabilidad', label: t('form_opt1') },
    { value: 'Auditor\u00eda', label: t('form_opt2') },
    { value: 'Impuestos', label: t('form_opt3') },
    { value: 'Declaraci\u00f3n de Renta', label: t('form_opt4') },
    { value: 'SAGRILAFT', label: t('form_opt5') },
    { value: '\u00c9tica y Transparencia', label: t('form_opt6') },
  ];

  return (
    <section className="section contact" id="contact">
      <div className="container">
        <SectionHeader
          tag={t('contact_tag')}
          title={t('contact_title')}
          desc={t('contact_desc')}
        />
        <div className="contact-grid">
          <motion.div
            className="contact-info"
            variants={slideLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
          >
            <h3>{t('contact_info_title')}</h3>
            <p>{t('contact_info_desc')}</p>
            <motion.div
              className="contact-details"
              variants={contactItemContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div className="contact-item" variants={slideInItem}>
                <div className="contact-item-icon">
                  <svg viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>
                </div>
                <div className="contact-item-text">
                  <div className="label">{t('contact_phone_label')}</div>
                  <div className="value">+57 302 285 1810</div>
                </div>
              </motion.div>
              <motion.div className="contact-item" variants={slideInItem}>
                <div className="contact-item-icon">
                  <svg viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                </div>
                <div className="contact-item-text">
                  <div className="label">{t('contact_email_label')}</div>
                  <div className="value">andrealato30@gmail.com</div>
                </div>
              </motion.div>
              <motion.div className="contact-item" variants={slideInItem}>
                <div className="contact-item-icon">
                  <svg viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                </div>
                <div className="contact-item-text">
                  <div className="label">{t('contact_location_label')}</div>
                  <div className="value">{t('contact_location_value')}</div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div
            className="contact-form-wrapper"
            variants={slideRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
          >
            <motion.h4
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              {t('form_title')}
            </motion.h4>
            <motion.form
              onSubmit={handleSubmit}
              variants={formFieldContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div className="form-group" variants={fadeUp}>
                <label>{t('form_name')}</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t('form_placeholder_name')}
                />
              </motion.div>
              <motion.div className="form-group" variants={fadeUp}>
                <label>{t('form_service')}</label>
                <select
                  required
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                >
                  <option value="">{t('form_select_placeholder')}</option>
                  {serviceOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </motion.div>
              <motion.div className="form-group" variants={fadeUp}>
                <label>{t('form_message')}</label>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={t('form_placeholder_msg')}
                />
              </motion.div>
              <motion.button
                type="submit"
                className="btn-submit"
                variants={fadeUp}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                {t('form_submit')}
              </motion.button>
            </motion.form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
