import { motion } from 'framer-motion';
import LazyImage from '../components/LazyImage.jsx';
import company from '../data/company.js';

const stats = [
  { label: 'Years of craft', value: '15+' },
  { label: 'Slabs installed', value: '900+' },
  { label: 'Counties served', value: '12' },
  { label: 'Workmanship guarantee', value: 'Lifetime' },
];

export default function About() {
  return (
    <section id="about" className="relative bg-ink-950">
      <div className="container-luxe py-28 sm:py-36">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-20">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative lg:col-span-6"
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-ink-900">
              <LazyImage
                src="https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?auto=format&fit=crop&w=1600&q=85"
                alt="Craftsman polishing stone"
                className="absolute inset-0 h-full w-full"
              />
            </div>
            {/* Floating accent card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
              className="absolute -bottom-6 -right-6 hidden max-w-[260px] border border-stone-100/10 bg-ink-950/85 p-6 backdrop-blur-md sm:block"
            >
              <p className="font-display italic text-lg text-stone-100">
                "{company.tagline.replace(/\.$/, '')}."
              </p>
              <p className="mt-3 text-[11px] uppercase tracking-widest text-gold-400">
                — Rolando Fernandez, Founder
              </p>
            </motion.div>
          </motion.div>

          {/* Text */}
          <div className="lg:col-span-6 flex flex-col gap-8">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-3"
            >
              <span className="divider-gold" />
              <span className="eyebrow">About {company.name}</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
              className="heading-display text-4xl text-stone-50 sm:text-5xl lg:text-6xl text-balance"
            >
              A family shop built on
              <span className="italic font-normal text-gold-400"> precision</span> and word-of-mouth.
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
              className="flex flex-col gap-5 text-base leading-relaxed text-stone-300"
            >
              <p>
                {company.name} was founded on a simple promise: do the work as if
                it's going in your own home. Fifteen years and hundreds of installs
                later, we still template every job ourselves, hand-finish every
                edge, and walk every customer through the install before we leave.
              </p>
              <p>
                We're not the biggest shop in the region — and we don't try to be.
                We work in small batches, with the kind of care that doesn't scale
                if you cut corners. That's why most of our work comes from
                referrals.
              </p>
            </motion.div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-px border border-stone-100/10 bg-stone-100/5 sm:grid-cols-4">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{
                    duration: 0.6,
                    ease: [0.16, 1, 0.3, 1],
                    delay: 0.05 * i,
                  }}
                  className="bg-ink-950 px-4 py-6"
                >
                  <p className="font-display text-3xl text-gold-400">{s.value}</p>
                  <p className="mt-1 text-[11px] uppercase tracking-widest text-stone-400">
                    {s.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
