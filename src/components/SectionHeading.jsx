import { motion } from 'framer-motion';

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  className = '',
}) {
  const alignment = align === 'center' ? 'items-center text-center' : 'items-start text-left';
  return (
    <div className={`flex flex-col gap-6 ${alignment} ${className}`}>
      {eyebrow && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-3"
        >
          <span className="divider-gold" />
          <span className="eyebrow">{eyebrow}</span>
        </motion.div>
      )}
      {title && (
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
          className="heading-display text-4xl text-stone-50 sm:text-5xl lg:text-6xl text-balance max-w-3xl"
        >
          {title}
        </motion.h2>
      )}
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          className="max-w-2xl text-base leading-relaxed text-stone-300 sm:text-lg"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
