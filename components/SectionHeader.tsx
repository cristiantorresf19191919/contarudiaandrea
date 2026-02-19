'use client';

import { motion } from 'framer-motion';
import { staggerContainerElegant, fadeUp, lineGrow } from '@/lib/animations';

export default function SectionHeader({
  tag,
  title,
  desc,
}: {
  tag: string;
  title: string;
  desc?: string;
}) {
  return (
    <motion.div
      className="section-header"
      variants={staggerContainerElegant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
    >
      <motion.div className="section-tag" variants={fadeUp}>
        {tag}
      </motion.div>
      <motion.h2 className="section-title" variants={fadeUp}>
        {title}
        <motion.span
          className="title-underline"
          variants={lineGrow}
          style={{ originX: 0.5 }}
        />
      </motion.h2>
      {desc && (
        <motion.p className="section-desc" variants={fadeUp}>
          {desc}
        </motion.p>
      )}
    </motion.div>
  );
}
