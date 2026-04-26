import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import company from '../data/company.js';

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=2400&q=85';

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const opacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 0.6, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen w-full overflow-hidden bg-ink-950"
    >
      {/* Background image with parallax */}
      <motion.div
        style={{ y, scale }}
        className="absolute inset-0 -z-10"
      >
        <img
          src={HERO_IMAGE}
          alt="Luxury kitchen with marble countertops"
          loading="eager"
          fetchpriority="high"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-950/70 via-ink-950/40 to-ink-950" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950/80 via-transparent to-ink-950/30" />
      </motion.div>

      <div className="relative z-10 flex min-h-screen flex-col">
        <div className="container-luxe flex flex-1 items-center pt-32 pb-24">
          <motion.div
            style={{ opacity }}
            className="max-w-3xl flex flex-col gap-8"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="flex items-center gap-3"
            >
              <span className="divider-gold" />
              <span className="eyebrow">{company.services.join(' · ')}</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
              className="heading-display text-5xl text-stone-50 sm:text-7xl lg:text-[5.5rem] text-balance"
            >
              Crafted Stone.
              <br />
              <span className="italic font-normal text-gold-400">Timeless</span>{' '}
              Design.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.55 }}
              className="max-w-xl text-base leading-relaxed text-stone-300 sm:text-lg"
            >
              Premium countertop fabrication and installation. From quarry to
              kitchen, we bring honest craftsmanship to every slab — built to
              outlast trends.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.75 }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <a href="#materials" className="btn-primary">
                Explore Materials
                <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
              </a>
              <a href="#contact" className="btn-ghost">
                Start Your Project
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="container-luxe pb-10 flex items-center justify-between"
        >
          <div className="hidden sm:block text-[11px] uppercase tracking-widest text-stone-400">
            <span className="text-gold-400">01</span> / Scroll to discover
          </div>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            className="inline-flex h-10 w-10 items-center justify-center border border-stone-100/30 text-stone-200"
          >
            <ChevronDown className="h-4 w-4" strokeWidth={1.5} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
