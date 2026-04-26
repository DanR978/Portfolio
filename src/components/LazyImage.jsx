import { useState } from 'react';
import { motion } from 'framer-motion';

export default function LazyImage({
  src,
  alt = '',
  className = '',
  imgClassName = '',
  sizes = '100vw',
  eager = false,
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-ink-800 ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        sizes={sizes}
        onLoad={() => setLoaded(true)}
        initial={false}
        animate={{ opacity: loaded ? 1 : 0, scale: loaded ? 1 : 1.04 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        className={`h-full w-full object-cover ${imgClassName}`}
      />
      {!loaded && (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-ink-800 via-ink-700 to-ink-800" />
      )}
    </div>
  );
}
