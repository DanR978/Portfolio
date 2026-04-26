import { motion } from 'framer-motion';
import SectionHeading from '../components/SectionHeading.jsx';
import processSteps from '../data/process.js';

export default function Process() {
  return (
    <section
      id="process"
      className="relative overflow-hidden bg-stone-50 text-ink-950"
    >
      {/* Subtle stone texture overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 20%, #000 0.5px, transparent 0.6px), radial-gradient(circle at 80% 60%, #000 0.5px, transparent 0.6px)',
          backgroundSize: '24px 24px, 32px 32px',
        }}
      />

      <div className="container-luxe relative py-28 sm:py-36">
        <SectionHeading
          eyebrow="Our Process"
          title="From first conversation to final reveal."
          description="Four stages, no shortcuts. Every project moves through the same careful sequence — because the difference between a good install and a great one is in the details no one sees."
          className="mb-20 [&_.eyebrow]:!text-gold-600 [&_h2]:!text-ink-950 [&_p]:!text-ink-700 [&_.divider-gold]:!bg-gold-600"
        />

        <div className="relative grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Connecting line (desktop) */}
          <div
            aria-hidden
            className="absolute left-0 right-0 top-[34px] hidden h-px bg-gradient-to-r from-transparent via-ink-950/15 to-transparent lg:block"
          />

          {processSteps.map((step, i) => (
            <Step key={step.id} step={step} index={i} total={processSteps.length} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Step({ step, index, total }) {
  const Icon = step.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
        delay: index * 0.12,
      }}
      className="relative flex flex-col gap-5"
    >
      <div className="relative flex items-center gap-4">
        <span className="relative z-10 inline-flex h-[68px] w-[68px] items-center justify-center border border-ink-950/15 bg-stone-50 text-ink-950 transition-colors duration-500 ease-luxe hover:border-gold-600 hover:text-gold-600">
          <Icon className="h-6 w-6" strokeWidth={1.25} />
        </span>
        <span className="font-display text-3xl text-ink-950/30">
          0{index + 1}
        </span>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="font-display text-2xl text-ink-950">{step.title}</h3>
        <p className="text-sm leading-relaxed text-ink-700">{step.description}</p>
      </div>

      {index < total - 1 && (
        <span
          aria-hidden
          className="hidden lg:block absolute -right-5 top-[34px] h-px w-10 bg-ink-950/15"
        />
      )}
    </motion.div>
  );
}
