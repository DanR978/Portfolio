# KF Countertop — Luxury Marketing Site

Premium, production-quality marketing site for **KF Countertop** — a luxury countertop fabrication & installation company. Built with React + Vite + Tailwind CSS + Framer Motion.

> *"Our reputation is rock solid."*

---

## Stack

- **React 18** (functional components + hooks)
- **Vite 5** — dev server / build
- **Tailwind CSS 3** — utility-first styling, custom design tokens
- **Framer Motion 11** — scroll-driven parallax, sticky storytelling, reveal animations
- **lucide-react** — feather-style icons

---

## Getting started

```bash
cd Countertops
npm install
npm run dev
```

The dev server opens automatically at <http://localhost:5173>.

To produce a production build:

```bash
npm run build
npm run preview
```

---

## Project structure

```
Countertops/
├── index.html                  # entry HTML, loads Inter + Cormorant Garamond
├── tailwind.config.js          # custom palette (ink / stone / gold) + display font
├── vite.config.js
├── postcss.config.js
├── package.json
└── src/
    ├── main.jsx                # ReactDOM root
    ├── App.jsx                 # composes navbar + sections + footer
    ├── index.css               # Tailwind layers + design tokens (.btn-primary, .eyebrow, .container-luxe)
    ├── data/
    │   ├── company.js          # brand constants (phone, email, services)
    │   ├── materials.js        # marble / quartz / granite / quartzite / soapstone
    │   ├── projects.js         # portfolio items
    │   └── process.js          # consultation → design → fabrication → installation
    ├── hooks/
    │   └── useScrollDirection.js   # navbar hide-on-scroll-down
    ├── components/
    │   ├── Logo.jsx
    │   ├── Navbar.jsx          # sticky, glass-blur, hides on scroll-down
    │   ├── Footer.jsx
    │   ├── SectionHeading.jsx  # reusable eyebrow + display title + lede
    │   └── LazyImage.jsx       # lazy + fade-in image primitive
    └── sections/
        ├── Hero.jsx            # full-screen, parallax background, fade-in copy
        ├── ScrollStory.jsx     # sticky, scroll-driven crossfade between materials
        ├── Materials.jsx       # horizontal-scroll showcase (desktop) / stacked cards (mobile)
        ├── Portfolio.jsx       # alternating full-width project rows w/ parallax
        ├── Process.jsx         # 4-step process on a light "stone" surface
        ├── About.jsx           # split-layout story + stats grid
        └── CTASection.jsx      # final call-to-action with phone + email
```

---

## Design system

Defined in `tailwind.config.js` and `src/index.css`:

| Token | Use |
|---|---|
| `bg-ink-950` / `bg-ink-900` | primary dark surfaces |
| `text-stone-50` / `text-stone-300` | foreground text on dark |
| `text-gold-400` / `bg-gold-500` | accent (matches the brand cards) |
| `font-display` (Cormorant Garamond) | headlines |
| `font-sans` (Inter) | body, UI |
| `.eyebrow` | small caps, gold, widest tracking |
| `.btn-primary` / `.btn-ghost` | hard-edge luxury buttons |
| `.container-luxe` | max-w-7xl + responsive gutters |
| `ease-luxe` | shared cubic-bezier easing for all transitions |

---

## Animation patterns

- **Parallax hero** — `useScroll` + `useTransform` translate/scale the background image as you scroll past it.
- **Sticky scroll story** — outer container is `n × 100vh`; inner is `position: sticky`. Each slide's opacity/scale is mapped to its slice of `scrollYProgress`.
- **Horizontal materials track** — vertical scroll progress drives the `x` translation of a flex track.
- **Section reveals** — `whileInView` on every heading, paragraph, and card, using `viewport={{ once: true, margin: '-80px' }}` so they only fire once and trigger slightly before reaching the viewport.

All easings use the `cubic-bezier(0.16, 1, 0.3, 1)` "luxe" curve for a slow-out feel.

---

## Customization checklist

1. **Brand details** — edit `src/data/company.js` (phone, email, social, region).
2. **Materials list** — edit `src/data/materials.js` (image URLs, descriptions, accent slabs).
3. **Portfolio** — edit `src/data/projects.js` (replace stock photos with real installs).
4. **Hero/CTA backgrounds** — `HERO_IMAGE` in `src/sections/Hero.jsx`, `CTA_BG` in `src/sections/CTASection.jsx`.
5. **About copy + stats** — `src/sections/About.jsx` (founder quote, stats array).
6. **Logo** — `src/components/Logo.jsx` currently renders the "K F" wordmark in a bordered square; swap in the actual marble-textured KF logo (PNG/SVG) when available.

---

## Performance notes

- Hero image uses `loading="eager"` + `fetchpriority="high"`; everything else is lazy via `LazyImage`.
- `viewport={{ once: true }}` on all reveal animations means each section animates exactly once.
- Tailwind purges unused classes in `npm run build`.
- Smooth scrolling is opted in via `html { scroll-behavior: smooth }` in `index.css`.

---

## Browser support

Modern evergreen browsers (Chrome, Edge, Firefox, Safari). The sticky-scroll Materials track requires CSS `position: sticky` and `IntersectionObserver` — both ubiquitous.
