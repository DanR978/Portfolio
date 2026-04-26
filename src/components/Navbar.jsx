import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone } from 'lucide-react';
import Logo from './Logo.jsx';
import useScrollDirection from '../hooks/useScrollDirection.js';
import company from '../data/company.js';

const links = [
  { label: 'Materials', href: '#materials' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Process', href: '#process' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const { scrolled, hidden } = useScrollDirection();
  const [open, setOpen] = useState(false);

  return (
    <motion.header
      id="top"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: hidden ? -100 : 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ease-luxe ${
        scrolled || open
          ? 'bg-ink-950/80 backdrop-blur-xl border-b border-stone-100/5'
          : 'bg-transparent'
      }`}
    >
      <div className="container-luxe flex h-20 items-center justify-between">
        <Logo />

        <nav className="hidden lg:flex items-center gap-10">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="group relative text-[12px] font-medium uppercase tracking-widest text-stone-200 transition-colors duration-300 hover:text-gold-400"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold-400 transition-all duration-500 ease-luxe group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          <a
            href={company.phoneHref}
            className="inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-widest text-stone-200 transition-colors hover:text-gold-400"
          >
            <Phone className="h-4 w-4" strokeWidth={1.5} />
            {company.phone}
          </a>
          <a href="#contact" className="btn-primary !py-3 !px-6">
            Get a Quote
          </a>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          className="inline-flex h-11 w-11 items-center justify-center border border-stone-100/20 text-stone-100 transition-colors hover:border-gold-400 hover:text-gold-400 lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-stone-100/5 bg-ink-950/95 backdrop-blur-xl lg:hidden"
          >
            <div className="container-luxe py-8 flex flex-col gap-6">
              {links.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.4 }}
                  className="font-display text-3xl text-stone-50 transition-colors hover:text-gold-400"
                >
                  {l.label}
                </motion.a>
              ))}
              <div className="flex flex-col gap-3 pt-4 border-t border-stone-100/10">
                <a
                  href={company.phoneHref}
                  className="text-sm tracking-widest text-stone-300 hover:text-gold-400"
                >
                  {company.phone}
                </a>
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="btn-primary self-start"
                >
                  Get a Quote
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
