'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { posts } from '@/lib/posts';
import { LanguageProvider, useLanguage } from '@/lib/LanguageContext';
import Logo from '@/components/Logo';

const cardVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  }),
};

function BlogContent() {
  const { lang, setLang, t } = useLanguage();

  return (
    <div className="blog-page">
      {/* Header */}
      <header className="blog-header">
        <div className="container">
          <div className="blog-header-inner">
            <Link href="/" className="blog-back-link">
              <Logo size={40} lColor="#FFFFFF" />
              <span>Andrea La Torre</span>
            </Link>
            <div className="lang-toggle">
              <button className={`lang-btn ${lang === 'es' ? 'active' : ''}`} onClick={() => setLang('es')}>ES</button>
              <button className={`lang-btn ${lang === 'en' ? 'active' : ''}`} onClick={() => setLang('en')}>EN</button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="blog-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="blog-hero-tag">
              {lang === 'es' ? 'Blog & Recursos' : 'Blog & Resources'}
            </span>
            <h1>
              {lang === 'es'
                ? 'Contabilidad Sin Aburrimiento'
                : 'Accounting Without Boredom'}
            </h1>
            <p>
              {lang === 'es'
                ? 'Impuestos, contabilidad y cumplimiento explicados con humor, sarcasmo y mucho caf\u00e9 colombiano. Porque aprender de impuestos no tiene que doler... tanto.'
                : 'Taxes, accounting and compliance explained with humor, sarcasm and lots of Colombian coffee. Because learning about taxes doesn\u2019t have to hurt... that much.'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Posts grid */}
      <section className="blog-grid-section">
        <div className="container">
          <div className="blog-grid">
            {posts.map((post, i) => (
              <motion.div
                key={post.slug}
                custom={i}
                variants={cardVariant}
                initial="hidden"
                animate="visible"
              >
                <Link href={`/blog/${post.slug}`} className="blog-card">
                  <div className="blog-card-emoji">{post.emoji}</div>
                  <div className="blog-card-meta">
                    <span className="blog-card-category">
                      {lang === 'es' ? post.category : post.categoryEn}
                    </span>
                    <span className="blog-card-date">{post.date}</span>
                  </div>
                  <h2 className="blog-card-title">
                    {lang === 'es' ? post.title : post.titleEn}
                  </h2>
                  <p className="blog-card-excerpt">
                    {lang === 'es' ? post.excerpt : post.excerptEn}
                  </p>
                  <div className="blog-card-footer">
                    <span className="blog-card-read">
                      {post.readTime} min {lang === 'es' ? 'de lectura' : 'read'}
                    </span>
                    <span className="blog-card-arrow">
                      {lang === 'es' ? 'Leer m\u00e1s' : 'Read more'} &rarr;
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="blog-cta">
        <div className="container">
          <motion.div
            className="blog-cta-inner"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2>{lang === 'es' ? '\u00bfTienes preguntas sobre tus impuestos?' : 'Have questions about your taxes?'}</h2>
            <p>{lang === 'es' ? 'La consulta inicial es GRATIS. Hablemos.' : 'The initial consultation is FREE. Let\u2019s talk.'}</p>
            <a
              href="https://wa.me/573022851810?text=Hola%20Andrea%2C%20le%u00ed%20tu%20blog%20y%20tengo%20preguntas%20sobre%20mis%20impuestos."
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              <span>{lang === 'es' ? 'Escr\u00edbeme por WhatsApp' : 'Message on WhatsApp'}</span>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="blog-footer">
        <div className="container">
          <p>&copy; 2026 Andrea La Torre. {lang === 'es' ? 'Todos los derechos reservados.' : 'All rights reserved.'}</p>
          <Link href="/">{lang === 'es' ? '\u2190 Volver al sitio principal' : '\u2190 Back to main site'}</Link>
        </div>
      </footer>
    </div>
  );
}

export default function BlogPage() {
  return (
    <LanguageProvider>
      <BlogContent />
    </LanguageProvider>
  );
}
