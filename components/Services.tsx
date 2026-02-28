'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';
import { staggerContainerSlow, cascadeCard, iconBounce } from '@/lib/animations';
import SectionHeader from './SectionHeader';

const serviceIcons = [
  <svg key="1" viewBox="0 0 24 24"><path d="M4 2h16a2 2 0 012 2v16a2 2 0 01-2 2H4a2 2 0 01-2-2V4a2 2 0 012-2z"/><path d="M8 6h8M8 10h8M8 14h5"/></svg>,
  <svg key="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/><path d="M11 8v6M8 11h6"/></svg>,
  <svg key="3" viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="18" rx="2"/><path d="M12 8v8M8 12h8"/></svg>,
  <svg key="4" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/><path d="M9 15l2 2 4-4"/></svg>,
  <svg key="5" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>,
  <svg key="6" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>,
];

export default function Services() {
  const { t } = useLanguage();

  const services = [
    { title: t('svc1_title'), desc: t('svc1_desc'), waKey: 'svc1_title' },
    { title: t('svc2_title'), desc: t('svc2_desc'), waKey: 'svc2_title' },
    { title: t('svc3_title'), desc: t('svc3_desc'), waKey: 'svc3_title' },
    { title: t('svc4_title'), desc: t('svc4_desc'), waKey: 'svc4_title' },
    { title: t('svc5_title'), desc: t('svc5_desc'), waKey: 'svc5_title' },
    { title: t('svc6_title'), desc: t('svc6_desc'), waKey: 'svc6_title' },
  ];

  return (
    <section className="section services" id="services">
      <div className="container">
        <SectionHeader
          tag={t('services_tag')}
          title={t('services_title')}
          desc={t('services_desc')}
        />
        <motion.div
          className="services-grid"
          variants={staggerContainerSlow}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
        >
          {services.map((svc, i) => {
            const waMsg = t('svc_wa_template').replace('{service}', svc.title);
            const waUrl = `https://wa.me/573022851810?text=${encodeURIComponent(waMsg)}`;
            return (
              <motion.div key={i} className="service-card" variants={cascadeCard}>
                <motion.div className="service-icon" variants={iconBounce}>
                  {serviceIcons[i]}
                </motion.div>
                <h3>{svc.title}</h3>
                <p>{svc.desc}</p>
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="service-link"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  {t('svc_link')}{' '}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
