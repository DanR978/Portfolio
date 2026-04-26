import { motion } from 'framer-motion';
import { ArrowRight, Phone, Mail } from 'lucide-react';
import company from '../data/company.js';

const CTA_BG =
  'https://images.unsplash.com/photo-1556909114-44e3e9699e2b?auto=format&fit=crop&w=2400&q=85';

export default function CTASection() {
  return (
    <section id="contact" className="relative overflow-hidden bg-ink-950">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={CTA_BG}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-950 via-ink-950/70 to-ink-950" />
      </div>

      <div className="container-luxe relative py-32 sm:py-40">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3"
          >
            <span className="divider-gold" />
            <span className="eyebrow">Start Your Project</span>
            <span className="divider-gold" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
            className="heading-display mt-8 text-5xl text-stone-50 sm:text-6xl lg:text-7xl text-balance"
          >
            Let's build something that
            <span className="italic font-normal text-gold-400"> outlasts</span> the trend cycle.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-stone-300 sm:text-lg"
          >
            Free consultations and on-site templating. Tell us about your space,
            and we'll help you choose the right stone for it.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <a href={company.phoneHref} className="btn-primary">
              <Phone className="h-4 w-4" strokeWidth={1.75} />
              {company.phone}
            </a>
            <a href={company.emailHref} className="btn-ghost">
              <Mail className="h-4 w-4" strokeWidth={1.75} />
              Email Us
              <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
            </a>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-12 text-[11px] uppercase tracking-widest text-stone-500"
          >
            {company.region}  ·  Install · Repair · Removal
          </motion.p>
        </div>
      </div>
    </section>
  );
}
