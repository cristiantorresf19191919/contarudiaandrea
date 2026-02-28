'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';
import { staggerContainerSlow, cascadeCard } from '@/lib/animations';
import { posts } from '@/lib/posts';
import SectionHeader from './SectionHeader';

export default function BlogPreview() {
  const { lang, t } = useLanguage();
  const latestPosts = posts.slice(0, 3);

  return (
    <section className="section blog-preview-section">
      <div className="container">
        <SectionHeader
          tag={t('blog_preview_tag')}
          title={t('blog_preview_title')}
          desc={t('blog_preview_desc')}
        />
        <motion.div
          className="blog-preview-grid"
          variants={staggerContainerSlow}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {latestPosts.map((post) => (
            <motion.a
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="blog-preview-card"
              variants={cascadeCard}
              whileHover={{ y: -6 }}
            >
              <div className="blog-preview-emoji">{post.emoji}</div>
              <div className="blog-preview-meta">
                <span className="blog-preview-category">{post.category}</span>
                <span className="blog-preview-read">{post.readTime}</span>
              </div>
              <h3 className="blog-preview-title">
                {lang === 'es' ? post.title : post.titleEn}
              </h3>
              <p className="blog-preview-excerpt">
                {lang === 'es' ? post.excerpt : post.excerptEn}
              </p>
              <span className="blog-preview-link">
                {t('blog_preview_read')}
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </span>
            </motion.a>
          ))}
        </motion.div>
        <div className="blog-preview-all">
          <motion.a
            href="/blog"
            className="blog-preview-all-link"
            whileHover={{ scale: 1.03, x: 4 }}
          >
            {t('blog_preview_all')}
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </motion.a>
        </div>
      </div>
    </section>
  );
}
