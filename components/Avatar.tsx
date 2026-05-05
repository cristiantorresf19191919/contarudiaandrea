'use client';

import { motion } from 'framer-motion';

type AvatarSize = 'sm' | 'md' | 'lg';

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: AvatarSize;
  showStatus?: boolean;
  statusLabel?: string;
  className?: string;
  animated?: boolean;
}

const sizeMap: Record<AvatarSize, number> = {
  sm: 40,
  md: 96,
  lg: 140,
};

export default function Avatar({
  src = '/images/andrea-portrait.jpeg',
  alt = 'Andrea La Torre - Contadora Pública',
  size = 'sm',
  showStatus = false,
  statusLabel,
  className = '',
  animated = false,
}: AvatarProps) {
  const px = sizeMap[size];

  const inner = (
    <span
      className={`avatar avatar-${size} ${className}`}
      style={{ width: px, height: px }}
    >
      <span className="avatar-ring" aria-hidden="true" />
      <img src={src} alt={alt} className="avatar-img" />
      {showStatus && (
        <span className="avatar-status" aria-label={statusLabel || 'Disponible'}>
          <span className="avatar-status-dot" />
        </span>
      )}
    </span>
  );

  if (!animated) return inner;

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      style={{ display: 'inline-flex' }}
    >
      {inner}
    </motion.span>
  );
}
