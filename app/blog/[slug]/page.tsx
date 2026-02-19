'use client';

import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { getPostBySlug, posts } from '@/lib/posts';
import { LanguageProvider, useLanguage } from '@/lib/LanguageContext';
import Logo from '@/components/Logo';

function PostContent() {
  const params = useParams();
  const slug = params?.slug as string;
  const post = getPostBySlug(slug);
  const { lang, setLang } = useLanguage();

  if (!post) {
    return (
      <div className="blog-page">
        <div className="container" style={{ padding: '120px 24px', textAlign: 'center' }}>
          <h1>{lang === 'es' ? 'Art\u00edculo no encontrado' : 'Article not found'}</h1>
          <Link href="/blog" className="btn btn-primary" style={{ marginTop: 24 }}>
            {lang === 'es' ? '\u2190 Volver al blog' : '\u2190 Back to blog'}
          </Link>
        </div>
      </div>
    );
  }

  const title = lang === 'es' ? post.title : post.titleEn;
  const content = lang === 'es' ? post.content : post.contentEn;
  const category = lang === 'es' ? post.category : post.categoryEn;

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
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <Link href="/blog" className="blog-nav-link">Blog</Link>
              <div className="lang-toggle">
                <button className={`lang-btn ${lang === 'es' ? 'active' : ''}`} onClick={() => setLang('es')}>ES</button>
                <button className={`lang-btn ${lang === 'en' ? 'active' : ''}`} onClick={() => setLang('en')}>EN</button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Article */}
      <article className="blog-article">
        <div className="container">
          <motion.div
            className="blog-article-header"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link href="/blog" className="blog-breadcrumb">
              &larr; {lang === 'es' ? 'Todos los art\u00edculos' : 'All articles'}
            </Link>
            <div className="blog-article-meta">
              <span className="blog-card-category">{category}</span>
              <span>{post.date}</span>
              <span>{post.readTime} min {lang === 'es' ? 'de lectura' : 'read'}</span>
            </div>
            <h1 className="blog-article-title">
              <span className="blog-article-emoji">{post.emoji}</span> {title}
            </h1>
            <div className="blog-article-author">
              <div className="blog-author-avatar">AL</div>
              <div>
                <div className="blog-author-name">Andrea La Torre</div>
                <div className="blog-author-role">
                  {lang === 'es' ? 'Contadora P\u00fablica | Auditora | Oficial SAGRILAFT' : 'CPA | Auditor | SAGRILAFT Officer'}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="blog-article-body"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            {content.map((paragraph, i) => {
              if (paragraph.includes('\n')) {
                const lines = paragraph.split('\n');
                return (
                  <div key={i} className="blog-paragraph">
                    {lines.map((line, j) => {
                      if (line.startsWith('\u2022')) {
                        return <li key={j}>{line.replace('\u2022 ', '')}</li>;
                      }
                      if (j === 0 && !line.startsWith('\u2022')) {
                        return <h3 key={j}>{line}</h3>;
                      }
                      return <p key={j}>{line}</p>;
                    })}
                  </div>
                );
              }
              return <p key={i}>{paragraph}</p>;
            })}
          </motion.div>

          {/* Share + CTA */}
          <motion.div
            className="blog-article-cta"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="blog-article-cta-box">
              <h3>{lang === 'es' ? '\u00bfEste art\u00edculo te fue \u00fatil?' : 'Was this article helpful?'}</h3>
              <p>
                {lang === 'es'
                  ? 'Si tienes dudas sobre tu situaci\u00f3n contable o tributaria, agenda una consulta GRATIS. Sin compromiso, sin letra peque\u00f1a.'
                  : 'If you have questions about your accounting or tax situation, schedule a FREE consultation. No obligation, no fine print.'}
              </p>
              <a
                href="https://wa.me/573022851810?text=Hola%20Andrea%2C%20le%u00ed%20tu%20blog%20y%20tengo%20preguntas."
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                <span>{lang === 'es' ? 'Consulta GRATIS por WhatsApp' : 'FREE Consultation on WhatsApp'}</span>
              </a>
            </div>
          </motion.div>

          {/* Related posts */}
          <div className="blog-related">
            <h3>{lang === 'es' ? 'M\u00e1s Art\u00edculos' : 'More Articles'}</h3>
            <div className="blog-related-grid">
              {posts.filter((p) => p.slug !== slug).slice(0, 3).map((p) => (
                <Link key={p.slug} href={`/blog/${p.slug}`} className="blog-related-card">
                  <span className="blog-related-emoji">{p.emoji}</span>
                  <span className="blog-related-title">{lang === 'es' ? p.title : p.titleEn}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </article>

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

export default function PostPage() {
  return (
    <LanguageProvider>
      <PostContent />
    </LanguageProvider>
  );
}
