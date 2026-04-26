import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import SectionHeading from '../components/SectionHeading.jsx';
import LazyImage from '../components/LazyImage.jsx';
import projects from '../data/projects.js';

export default function Portfolio() {
  return (
    <section id="portfolio" className="relative bg-ink-950">
      <div className="container-luxe pt-28 pb-16 sm:pt-36">
        <SectionHeading
          eyebrow="Portfolio"
          title="Kitchens we've built. Stories they keep."
          description="A selection of recent installations — from compact city baths to estate-scale kitchen builds. Each one a collaboration with the people who live in it."
        />
      </div>

      <div className="flex flex-col gap-24 pb-32 sm:gap-32 lg:gap-40">
        {projects.map((p, i) => (
          <ProjectRow key={p.id} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}

function ProjectRow({ project, index }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);
  const titleY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const reverse = index % 2 === 1;

  return (
    <article ref={ref} className="container-luxe">
      <div
        className={`grid items-center gap-10 lg:grid-cols-12 lg:gap-16 ${
          reverse ? 'lg:[&>*:first-child]:order-2' : ''
        }`}
      >
        {/* Image */}
        <div className="lg:col-span-8 relative overflow-hidden">
          <motion.div
            style={{ y }}
            className="relative aspect-[16/10] w-full overflow-hidden bg-ink-900"
          >
            <LazyImage
              src={project.image}
              alt={project.title}
              className="absolute inset-0 h-[120%] w-full -translate-y-[10%]"
              imgClassName="transition-transform duration-[1600ms] ease-luxe hover:scale-[1.04]"
            />
          </motion.div>
        </div>

        {/* Text */}
        <motion.div
          style={{ y: titleY }}
          className="lg:col-span-4 flex flex-col gap-5"
        >
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="eyebrow"
          >
            Project {String(index + 1).padStart(2, '0')}
          </motion.span>
          <motion.h3
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
            className="heading-display text-4xl text-stone-50 sm:text-5xl"
          >
            {project.title}
          </motion.h3>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="flex flex-col gap-2 pt-2 text-sm text-stone-400"
          >
            <div className="flex items-center justify-between border-t border-stone-100/10 py-3">
              <span className="text-[11px] uppercase tracking-widest text-stone-500">Material</span>
              <span className="text-stone-200">{project.material}</span>
            </div>
            <div className="flex items-center justify-between border-t border-b border-stone-100/10 py-3">
              <span className="text-[11px] uppercase tracking-widest text-stone-500">Location</span>
              <span className="text-stone-200">{project.location}</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </article>
  );
}
