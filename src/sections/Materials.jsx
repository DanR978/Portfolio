import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import SectionHeading from '../components/SectionHeading.jsx';
import LazyImage from '../components/LazyImage.jsx';
import materials from '../data/materials.js';

export default function Materials() {
  return (
    <section id="materials" className="relative bg-ink-950 grain">
      <div className="container-luxe pt-24 pb-16 sm:pt-32">
        <SectionHeading
          eyebrow="Materials"
          title="Stone, chosen with intention."
          description="We work with the world's most distinctive surfaces and help you choose the one that fits your home, your life, and the way you want to live in it."
        />
      </div>

      <div className="container-luxe grid gap-6 pb-28 sm:gap-8 lg:grid-cols-2">
        {materials.map((m, i) => (
          <MaterialCard key={m.id} material={m} index={i} />
        ))}
      </div>
    </section>
  );
}

function MaterialCard({ material, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: (index % 2) * 0.08 }}
      className="group relative overflow-hidden bg-ink-900"
    >
      <LazyImage
        src={material.image}
        alt={material.name}
        className="aspect-[4/5] w-full"
        imgClassName="transition-transform duration-[1400ms] ease-luxe group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/40 to-transparent" />
      <div className="absolute inset-0 flex flex-col justify-end gap-3 p-7 sm:p-9">
        <div className="flex items-center gap-3">
          <span className="text-[11px] uppercase tracking-widest text-gold-400">
            0{index + 1}
          </span>
          <span className="h-px w-8 bg-gold-400/60" />
          <span className="eyebrow !text-stone-300">{material.tagline}</span>
        </div>
        <h3 className="heading-display text-4xl text-stone-50 sm:text-5xl">
          {material.name}
        </h3>
        <p className="max-w-md text-sm leading-relaxed text-stone-300">
          {material.description}
        </p>
        <p className="text-[11px] uppercase tracking-widest text-stone-500">
          {material.accent}
        </p>
        <a
          href="#contact"
          className="mt-2 inline-flex items-center gap-2 self-start text-[11px] uppercase tracking-widest text-gold-400 transition-colors hover:text-gold-300"
        >
          Inquire
          <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.75} />
        </a>
      </div>
    </motion.article>
  );
}
