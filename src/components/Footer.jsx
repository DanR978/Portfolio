import { Facebook, Mail, Phone, MapPin } from 'lucide-react';
import Logo from './Logo.jsx';
import company from '../data/company.js';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-stone-100/5 bg-ink-950">
      <div className="container-luxe py-20">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5 flex flex-col gap-6">
            <Logo />
            <p className="max-w-sm text-sm leading-relaxed text-stone-400">
              {company.tagline} Premium countertop fabrication and installation
              for discerning homes — {company.region.toLowerCase()}.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={company.facebookHref}
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="inline-flex h-10 w-10 items-center justify-center border border-stone-100/15 text-stone-300 transition-colors hover:border-gold-400 hover:text-gold-400"
              >
                <Facebook className="h-4 w-4" strokeWidth={1.5} />
              </a>
              <a
                href={company.emailHref}
                aria-label="Email"
                className="inline-flex h-10 w-10 items-center justify-center border border-stone-100/15 text-stone-300 transition-colors hover:border-gold-400 hover:text-gold-400"
              >
                <Mail className="h-4 w-4" strokeWidth={1.5} />
              </a>
              <a
                href={company.phoneHref}
                aria-label="Phone"
                className="inline-flex h-10 w-10 items-center justify-center border border-stone-100/15 text-stone-300 transition-colors hover:border-gold-400 hover:text-gold-400"
              >
                <Phone className="h-4 w-4" strokeWidth={1.5} />
              </a>
            </div>
          </div>

          <div className="lg:col-span-3">
            <h4 className="eyebrow mb-5">Explore</h4>
            <ul className="flex flex-col gap-3 text-sm text-stone-300">
              {[
                ['Materials', '#materials'],
                ['Portfolio', '#portfolio'],
                ['Process', '#process'],
                ['About', '#about'],
                ['Contact', '#contact'],
              ].map(([label, href]) => (
                <li key={href}>
                  <a
                    href={href}
                    className="transition-colors hover:text-gold-400"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h4 className="eyebrow mb-5">Contact</h4>
            <ul className="flex flex-col gap-4 text-sm text-stone-300">
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 text-gold-400" strokeWidth={1.5} />
                <a
                  href={company.phoneHref}
                  className="transition-colors hover:text-gold-50"
                >
                  {company.phone}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 text-gold-400" strokeWidth={1.5} />
                <a
                  href={company.emailHref}
                  className="break-all transition-colors hover:text-gold-50"
                >
                  {company.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 text-gold-400" strokeWidth={1.5} />
                <span>{company.region}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-stone-100/5 pt-8 text-xs text-stone-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {company.name}. All rights reserved.</p>
          <p className="tracking-widest uppercase">Install · Repair · Removal</p>
        </div>
      </div>
    </footer>
  );
}
