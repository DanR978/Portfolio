import { useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from 'framer-motion';

const COUNTERTOP_PATH =
  'M 200 200 L 1000 200 L 1000 380 L 650 380 L 650 500 L 200 500 Z';

export default function BuildStory() {
  const ref = useRef(null);

  // 'start start' → 'end end' maps progress 0..1 to exactly the range during
  // which the sticky inner element is pinned. Using 'end start' was making
  // progress continue past the unpinning point, so later stages played while
  // the section was already scrolling off-screen ("darkness").
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  // Light smoothing — enough to soften jitter, not enough to introduce lag
  // (over-damped springs make stages appear to "miss" when scrolling fast).
  const smooth = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 30,
    mass: 0.15,
    restDelta: 0.0005,
  });

  // ---------- MEASURING ----------
  const measureOpacity = useTransform(
    smooth,
    [0.0, 0.05, 0.2, 0.25],
    [0, 1, 1, 0]
  );
  const tapeProgress = useTransform(smooth, [0.05, 0.18], [0, 1]);
  const tickOpacity = useTransform(smooth, [0.12, 0.2], [0, 1]);
  const measureLabelOp = useTransform(
    smooth,
    [0.12, 0.18, 0.2, 0.25],
    [0, 1, 1, 0]
  );

  // ---------- DRAFTING ----------
  const draftOpacity = useTransform(
    smooth,
    [0.2, 0.26, 0.45, 0.5],
    [0, 1, 1, 0]
  );
  const blueprintOp = useTransform(
    smooth,
    [0.2, 0.26, 0.45, 0.5],
    [0, 0.9, 0.9, 0]
  );
  const drawnLength = useTransform(smooth, [0.25, 0.42], [0, 1]);
  const dimsOp = useTransform(
    smooth,
    [0.35, 0.42, 0.45, 0.5],
    [0, 1, 1, 0]
  );

  const pencilProgress = useTransform(smooth, [0.25, 0.42], [0, 1]);
  const pencilX = useTransform(pencilProgress, (p) => pencilPoint(p).x - 6);
  const pencilY = useTransform(pencilProgress, (p) => pencilPoint(p).y - 22);

  // ---------- CUTTING ----------
  // Saw descends 0.48 → 0.55 from y=60 to y=200 (touching the slab),
  // then 0.55 → 0.70 traverses the entire L perimeter via sawPoint(t).
  const cutOpacity = useTransform(
    smooth,
    [0.45, 0.5, 0.7, 0.75],
    [0, 1, 1, 0]
  );
  const sawX = useTransform(smooth, (p) => {
    if (p < 0.55) return 200; // hover above start corner during descent
    const t = clamp01((p - 0.55) / (0.70 - 0.55));
    return sawPoint(t).x;
  });
  const sawY = useTransform(smooth, (p) => {
    if (p < 0.48) return 60;
    if (p < 0.55) return 60 + (200 - 60) * ((p - 0.48) / (0.55 - 0.48));
    const t = clamp01((p - 0.55) / (0.70 - 0.55));
    return sawPoint(t).y;
  });
  const sawRotate = useTransform(smooth, [0.48, 0.7], [0, 2200]);
  const sawOpacity = useTransform(
    smooth,
    [0.48, 0.55, 0.7, 0.75],
    [0, 1, 1, 0]
  );
  const cutLineLength = useTransform(smooth, [0.55, 0.7], [0, 1]);
  const dustOpacity = useTransform(
    smooth,
    [0.55, 0.58, 0.68, 0.71],
    [0, 1, 1, 0]
  );

  // ---------- POLISHING ----------
  // Polisher serpentines across the slab via polishPoint(t) on 0.75 → 0.85.
  const polishOpacity = useTransform(
    smooth,
    [0.7, 0.75, 0.85, 0.9],
    [0, 1, 1, 0]
  );
  const polishProgress = useTransform(smooth, [0.75, 0.85], [0, 1]);
  const bufferX = useTransform(polishProgress, (p) => polishPoint(clamp01(p)).x);
  const bufferY = useTransform(polishProgress, (p) => polishPoint(clamp01(p)).y);
  const bufferRotate = useTransform(smooth, [0.75, 0.85], [0, 2400]);
  const polishGlowOp = useTransform(
    smooth,
    [0.75, 0.8, 0.85, 0.9],
    [0, 1, 1, 0]
  );

  // ---------- PLACING ----------
  const placeOpacity = useTransform(smooth, [0.85, 1], [0, 1]);
  const cabinetsY = useTransform(smooth, [0.85, 0.95], [120, 0]);
  const cabinetsOp = useTransform(smooth, [0.85, 0.95], [0, 1]);
  const finalSlabY = useTransform(smooth, [0.88, 1], [-280, 0]);
  const finalSlabOp = useTransform(smooth, [0.88, 1], [0, 1]);
  const shadowOp = useTransform(smooth, [0.92, 1], [0, 0.55]);
  const sheenX = useTransform(smooth, [0.92, 1], [-400, 1500]);
  const sheenOp = useTransform(
    smooth,
    [0.92, 0.95, 0.98, 1],
    [0, 0.7, 0.7, 0]
  );

  // ---------- LABELS ----------
  const stage1Op = useTransform(smooth, [0.0, 0.05, 0.2, 0.25], [0, 1, 1, 0]);
  const stage2Op = useTransform(smooth, [0.25, 0.3, 0.45, 0.5], [0, 1, 1, 0]);
  const stage3Op = useTransform(smooth, [0.5, 0.55, 0.7, 0.75], [0, 1, 1, 0]);
  const stage4Op = useTransform(smooth, [0.75, 0.8, 0.85, 0.9], [0, 1, 1, 0]);
  const stage5Op = useTransform(smooth, [0.85, 0.9, 1, 1], [0, 1, 1, 1]);

  const progressBar = useTransform(smooth, [0, 1], ['0%', '100%']);

  const phaseNum = useTransform(smooth, (p) => {
  if (p < 0.2) return '01';
  if (p < 0.45) return '02';
  if (p < 0.7) return '03';
  if (p < 0.85) return '04';
  return '05';
});

  return (
    <section
      ref={ref}
      className="relative bg-ink-950"
      style={{ height: '800vh' }}
    >
      <div className="sticky top-0 flex h-screen w-full flex-col overflow-hidden">
        {/* Heading */}
        <div className="container-luxe pt-20 sm:pt-24">
          <div className="flex items-center gap-3">
            <span className="divider-gold" />
            <span className="eyebrow">The Craft</span>
            <span className="ml-auto font-mono text-[11px] tracking-widest text-gold-400">
              <motion.span>{phaseNum}</motion.span>
              <span className="text-stone-600"> / 05</span>
            </span>
          </div>
          <h2 className="heading-display mt-4 max-w-3xl text-3xl text-stone-50 sm:text-5xl lg:text-6xl">
            Measured. Drafted. Cut. Polished. Placed.
          </h2>
        </div>

        {/* Animation stage */}
        <div className="relative flex-1">
          <svg
            viewBox="0 0 1200 700"
            preserveAspectRatio="xMidYMid meet"
            className="absolute inset-0 h-full w-full"
          >
            <defs>
              <pattern
                id="bpGridSm"
                x="0"
                y="0"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 40 0 L 0 0 0 40"
                  fill="none"
                  stroke="rgba(201,150,47,0.18)"
                  strokeWidth="0.6"
                />
              </pattern>
              <pattern
                id="bpGridLg"
                x="0"
                y="0"
                width="200"
                height="200"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 200 0 L 0 0 0 200"
                  fill="none"
                  stroke="rgba(201,150,47,0.30)"
                  strokeWidth="1"
                />
              </pattern>

              {/* White marble with warm cream undertone — to receive gold veining */}
              <linearGradient id="stone" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fdfbf5" />
                <stop offset="35%" stopColor="#f6efde" />
                <stop offset="65%" stopColor="#fbf5e7" />
                <stop offset="100%" stopColor="#efe5cd" />
              </linearGradient>

              {/* Polisher disc gradient — restored to original */}
              <radialGradient id="bufferGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#fff5d0" />
                <stop offset="70%" stopColor="#c9962f" />
                <stop offset="100%" stopColor="#3a2a08" />
              </radialGradient>

              {/* Wet-polish shine overlay used to highlight buffed areas */}
              <radialGradient id="polishHalo" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.55)" />
                <stop offset="60%" stopColor="rgba(255,232,170,0.18)" />
                <stop offset="100%" stopColor="rgba(255,232,170,0)" />
              </radialGradient>

              <linearGradient id="cabinet" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#1a1814" />
                <stop offset="100%" stopColor="#0e0d0b" />
              </linearGradient>

              <linearGradient id="sheen" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(255,232,170,0)" />
                <stop offset="50%" stopColor="rgba(255,232,170,1)" />
                <stop offset="100%" stopColor="rgba(255,232,170,0)" />
              </linearGradient>

              <clipPath id="slabClip">
                <path d={COUNTERTOP_PATH} />
              </clipPath>
            </defs>

            {/* ============ STAGE 1 — MEASURING ============ */}
            <motion.g style={{ opacity: measureOpacity }}>
              {/* Faint floorplan corner walls */}
              <g stroke="rgba(201,150,47,0.45)" strokeWidth="2" fill="none">
                <line x1="100" y1="180" x2="100" y2="540" />
                <line x1="100" y1="180" x2="1080" y2="180" />
                <line x1="1080" y1="180" x2="1080" y2="420" />
                <line x1="1080" y1="420" x2="700" y2="420" />
                <line x1="700" y1="420" x2="700" y2="540" />
                <line x1="700" y1="540" x2="100" y2="540" />
              </g>

              {/* Tape measure body (left anchor) */}
              <g>
                <rect
                  x="120"
                  y="155"
                  width="60"
                  height="40"
                  rx="6"
                  fill="#c9962f"
                  stroke="#0a0a0a"
                  strokeWidth="1.2"
                />
                <circle cx="150" cy="175" r="9" fill="#0a0a0a" />
                <circle cx="150" cy="175" r="3" fill="#c9962f" />
              </g>

              {/* Tape ribbon — extends with scroll */}
              <ExtendingTape
                x1={180}
                y1={175}
                x2={1060}
                y2={175}
                progress={tapeProgress}
              />

              {/* Tick marks every 80px once tape arrives */}
              <motion.g style={{ opacity: tickOpacity }}>
                {Array.from({ length: 11 }).map((_, i) => (
                  <line
                    key={i}
                    x1={200 + i * 80}
                    y1={170}
                    x2={200 + i * 80}
                    y2={180}
                    stroke="#0a0a0a"
                    strokeWidth="1.2"
                  />
                ))}
              </motion.g>

              {/* Measurement readouts */}
              <motion.g style={{ opacity: measureLabelOp }}>
                <text
                  x="600"
                  y="135"
                  textAnchor="middle"
                  fill="#e7c98a"
                  fontFamily="Inter, sans-serif"
                  fontSize="18"
                  letterSpacing="6"
                >
                  96 ⅛″
                </text>
                <text
                  x="600"
                  y="225"
                  textAnchor="middle"
                  fill="rgba(231,201,138,0.7)"
                  fontFamily="Inter, sans-serif"
                  fontSize="11"
                  letterSpacing="4"
                >
                  COUNTERTOP — RUN A
                </text>
                {/* secondary measurement */}
                <line
                  x1="700"
                  y1="430"
                  x2="700"
                  y2="540"
                  stroke="#c9962f"
                  strokeWidth="1.2"
                  strokeDasharray="3 4"
                />
                <text
                  x="730"
                  y="495"
                  fill="#e7c98a"
                  fontFamily="Inter, sans-serif"
                  fontSize="13"
                  letterSpacing="3"
                >
                  24″
                </text>
              </motion.g>
            </motion.g>

            {/* ============ STAGE 2 — DRAFTING ============ */}
            <motion.g style={{ opacity: draftOpacity }}>
              <motion.g style={{ opacity: blueprintOp }}>
                <rect x="0" y="0" width="1200" height="700" fill="url(#bpGridSm)" />
                <rect x="0" y="0" width="1200" height="700" fill="url(#bpGridLg)" />
              </motion.g>

              <motion.path
                d={COUNTERTOP_PATH}
                fill="none"
                stroke="#c9962f"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ pathLength: drawnLength }}
              />

              <motion.g style={{ opacity: dimsOp }}>
                {/* Width dimension top */}
                <line
                  x1="200"
                  y1="150"
                  x2="1000"
                  y2="150"
                  stroke="rgba(201,150,47,0.7)"
                  strokeWidth="1"
                  strokeDasharray="2 4"
                />
                <line x1="200" y1="140" x2="200" y2="160" stroke="#c9962f" strokeWidth="1.2" />
                <line x1="1000" y1="140" x2="1000" y2="160" stroke="#c9962f" strokeWidth="1.2" />
                <text
                  x="600"
                  y="138"
                  textAnchor="middle"
                  fill="#e7c98a"
                  fontFamily="Inter, sans-serif"
                  fontSize="14"
                  letterSpacing="3"
                >
                  96″
                </text>

                {/* Height left */}
                <line
                  x1="150"
                  y1="200"
                  x2="150"
                  y2="500"
                  stroke="rgba(201,150,47,0.7)"
                  strokeWidth="1"
                  strokeDasharray="2 4"
                />
                <line x1="140" y1="200" x2="160" y2="200" stroke="#c9962f" strokeWidth="1.2" />
                <line x1="140" y1="500" x2="160" y2="500" stroke="#c9962f" strokeWidth="1.2" />
                <text
                  x="135"
                  y="355"
                  textAnchor="end"
                  fill="#e7c98a"
                  fontFamily="Inter, sans-serif"
                  fontSize="14"
                  letterSpacing="3"
                >
                  36″
                </text>

                <text
                  x="820"
                  y="450"
                  textAnchor="middle"
                  fill="#e7c98a"
                  fontFamily="Inter, sans-serif"
                  fontSize="11"
                  letterSpacing="3"
                >
                  L-RETURN
                </text>

                {/* Corner crosshairs */}
                {[
                  [200, 200],
                  [1000, 200],
                  [1000, 380],
                  [650, 380],
                  [650, 500],
                  [200, 500],
                ].map(([cx, cy], i) => (
                  <g key={i} stroke="#c9962f" strokeWidth="1.2">
                    <line x1={cx - 6} y1={cy} x2={cx + 6} y2={cy} />
                    <line x1={cx} y1={cy - 6} x2={cx} y2={cy + 6} />
                  </g>
                ))}
              </motion.g>

              {/* Pencil icon following the perimeter */}
              <motion.g style={{ x: pencilX, y: pencilY }}>
                <polygon
                  points="2,2 20,2 24,8 24,14 6,14 2,10"
                  fill="#c9962f"
                  stroke="#0a0a0a"
                  strokeWidth="0.8"
                />
                <polygon points="24,8 24,14 32,11" fill="#0a0a0a" />
              </motion.g>
            </motion.g>

            {/* ============ STAGE 3 — CUTTING ============ */}
            <motion.g style={{ opacity: cutOpacity }}>
              <MarbleSlab />

              {/* Glowing kerf line — traces the entire L perimeter as the saw cuts */}
              <motion.path
                d={COUNTERTOP_PATH}
                fill="none"
                stroke="#ffe8aa"
                strokeWidth="3"
                strokeLinecap="round"
                style={{
                  pathLength: cutLineLength,
                  filter: 'drop-shadow(0 0 10px #ffd97a)',
                }}
              />

              {/* Dust / sparks following the saw — denser burst */}
              <motion.g style={{ opacity: dustOpacity, x: sawX, y: sawY }}>
                {Array.from({ length: 32 }).map((_, i) => {
                  const angle = (i / 32) * Math.PI * 2;
                  const r = 14 + (i % 6) * 8;
                  return (
                    <circle
                      key={i}
                      cx={Math.cos(angle) * r}
                      cy={Math.sin(angle) * r * 0.6 - 4}
                      r={1.6 + (i % 4) * 0.8}
                      fill="#ffd97a"
                      opacity={0.9 - (i % 6) * 0.1}
                    />
                  );
                })}
                {/* Bright spark streaks */}
                {Array.from({ length: 8 }).map((_, i) => {
                  const a = (i / 8) * Math.PI * 2;
                  return (
                    <line
                      key={`s${i}`}
                      x1={Math.cos(a) * 18}
                      y1={Math.sin(a) * 12}
                      x2={Math.cos(a) * 56}
                      y2={Math.sin(a) * 36}
                      stroke="#fff5d0"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      opacity={0.85}
                    />
                  );
                })}
                {/* Hot spot at the contact point */}
                <circle r="14" fill="#fff5d0" opacity="0.55" />
                <circle r="6" fill="#fff" />
              </motion.g>

              {/* Saw blade — no shaft, follows perimeter */}
              <motion.g style={{ opacity: sawOpacity, x: sawX, y: sawY }}>
                <motion.g style={{ rotate: sawRotate }}>
                  <SawBlade size={108} />
                </motion.g>
              </motion.g>
            </motion.g>

            {/* ============ STAGE 4 — POLISHING ============ */}
            <motion.g style={{ opacity: polishOpacity }}>
              <MarbleSlab />

              {/* Wet-polish halo + receding trail rings following the buffer */}
              <motion.g style={{ opacity: polishGlowOp }}>
                <g clipPath="url(#slabClip)">
                  {/* Bright halo right under the disc */}
                  <motion.circle
                    cx={0}
                    cy={0}
                    r={62}
                    fill="url(#polishHalo)"
                    style={{ x: bufferX, y: bufferY }}
                  />
                  {/* Receding trail rings */}
                  {Array.from({ length: 14 }).map((_, i) => {
                    const t = (i + 1) / 14;
                    return (
                      <BufferTrail
                        key={i}
                        t={t}
                        bufferX={bufferX}
                        bufferY={bufferY}
                      />
                    );
                  })}
                </g>
              </motion.g>

              {/* Polisher disc — original gold gradient, no handle */}
              <motion.g style={{ x: bufferX, y: bufferY, rotate: bufferRotate }}>
                <PolisherDisc size={76} />
              </motion.g>
            </motion.g>

            {/* ============ STAGE 5 — PLACING ============ */}
            <motion.g style={{ opacity: placeOpacity }}>
              {/* Cabinets rising up */}
              <motion.g style={{ opacity: cabinetsOp, y: cabinetsY }}>
                <rect x="200" y="500" width="450" height="140" fill="url(#cabinet)" stroke="#2a2520" strokeWidth="1" />
                <line x1="350" y1="500" x2="350" y2="640" stroke="#2a2520" strokeWidth="1" />
                <line x1="500" y1="500" x2="500" y2="640" stroke="#2a2520" strokeWidth="1" />
                <rect x="265" y="555" width="20" height="3" fill="#c9962f" opacity="0.7" />
                <rect x="415" y="555" width="20" height="3" fill="#c9962f" opacity="0.7" />
                <rect x="565" y="555" width="20" height="3" fill="#c9962f" opacity="0.7" />

                <rect x="650" y="380" width="350" height="260" fill="url(#cabinet)" stroke="#2a2520" strokeWidth="1" />
                <line x1="825" y1="380" x2="825" y2="640" stroke="#2a2520" strokeWidth="1" />
                <rect x="730" y="490" width="20" height="3" fill="#c9962f" opacity="0.7" />
                <rect x="905" y="490" width="20" height="3" fill="#c9962f" opacity="0.7" />

                <line
                  x1="120"
                  y1="640"
                  x2="1080"
                  y2="640"
                  stroke="rgba(201,150,47,0.25)"
                  strokeWidth="1"
                />
              </motion.g>

              {/* Slab descending */}
              <motion.g style={{ opacity: finalSlabOp, y: finalSlabY }}>
                <motion.ellipse
                  cx="600"
                  cy="515"
                  rx="380"
                  ry="14"
                  fill="rgba(0,0,0,0.55)"
                  style={{ opacity: shadowOp }}
                />
                <MarbleSlab finished />
              </motion.g>

              {/* Sheen sweep */}
              <motion.g style={{ opacity: sheenOp, x: sheenX }}>
                <g clipPath="url(#slabClip)">
                  <rect
                    x="0"
                    y="180"
                    width="240"
                    height="340"
                    fill="url(#sheen)"
                    opacity="0.9"
                    transform="skewX(-18)"
                  />
                </g>
              </motion.g>
            </motion.g>
          </svg>

          {/* Stage labels overlay */}
          <div className="pointer-events-none absolute inset-0 flex items-end">
            <div className="container-luxe pb-10 sm:pb-14">
              <div className="relative h-28">
                <StageLabel opacity={stage1Op} index="01" title="Measured" body="On-site templating to the millimetre — every wall, every angle, every overhang." />
                <StageLabel opacity={stage2Op} index="02" title="Drafted" body="Layout, dimensions, seam placement and edge profile drawn before the first cut." />
                <StageLabel opacity={stage3Op} index="03" title="Cut" body="Diamond-tipped blades shape the slab. Water-cooled, dust-controlled, line-true." />
                <StageLabel opacity={stage4Op} index="04" title="Polished" body="Edges chamfered, surface buffed across grits — to a mirror, eased, or honed." />
                <StageLabel opacity={stage5Op} index="05" title="Placed" body="Set on the cabinetry, leveled to a hair, sealed — built to outlive the kitchen." />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom progress bar */}
        <div className="relative h-px w-full bg-stone-100/10">
          <motion.div className="absolute left-0 top-0 h-full bg-gold-500" style={{ width: progressBar }} />
        </div>
      </div>
    </section>
  );
}

function ExtendingTape({ x1, y1, x2, y2, progress }) {
  // Tape ribbon grows from x1,y1 toward x2,y2 driven by `progress` (0..1)
  const opacity = useTransform(progress, [0, 0.05, 1], [0, 1, 1]);
  return (
    <motion.line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke="#c9962f"
      strokeWidth="6"
      strokeLinecap="round"
      style={{ pathLength: progress, opacity }}
    />
  );
}

function BufferTrail({ t, bufferX, bufferY }) {
  // Receding ring behind the buffer — fades & expands. Trails along the path
  // by sampling the polishPoint a little behind the buffer's current point.
  const x = useTransform(bufferX, (v) => v - t * 14);
  const y = useTransform(bufferY, (v) => v - t * 3);
  const opacity = 0.55 * (1 - t);
  return (
    <motion.circle
      cx={0}
      cy={0}
      r={36 + t * 28}
      fill="none"
      stroke="rgba(255,245,208,0.95)"
      strokeWidth={1.8 - t * 1.2}
      style={{ x, y, opacity }}
    />
  );
}

// Inlined circular saw blade — original viewBox 0..512, centered on (256,256).
// We translate the inner group so its visual center sits at the wrapper's origin
// (so x/y/rotate from the parent motion.g operate around the blade center).
function SawBlade({ size = 100 }) {
  const scale = size / 512;
  return (
    <g transform={`scale(${scale}) translate(-256 -256)`}>
      <path
        fill="#dab054"
        d="M509.147,191.274c-1.772-1.074-3.975-1.144-5.811-0.187l-33.21,17.321c-2.378,1.24-5.291,0.728-7.104-1.247s-2.073-4.922-0.634-7.185l27.882-43.843c1.185-1.863,1.235-4.23,0.131-6.142l-42.528-73.66c-1.036-1.794-2.933-2.916-5.004-2.961c-2.071-0.045-4.014,0.996-5.126,2.743l-20.1,31.607c-1.438,2.263-4.219,3.276-6.776,2.473c-2.558-0.804-4.257-3.227-4.142-5.905l2.225-51.91c0.094-2.206-1.046-4.28-2.956-5.384L332.334,4.468c-1.794-1.036-3.998-1.059-5.814-0.062c-1.815,0.997-2.979,2.87-3.068,4.939l-1.604,37.422c-0.114,2.679-2.014,4.947-4.632,5.529c-2.618,0.582-5.299-0.665-6.54-3.043L286.648,3.184C285.627,1.227,283.603,0,281.395,0H196.34c-2.071,0-3.992,1.082-5.066,2.853c-1.074,1.772-1.144,3.975-0.187,5.811l17.321,33.211c1.24,2.377,0.728,5.291-1.247,7.104c-1.975,1.813-4.922,2.073-7.185,0.634l-43.843-27.882c-1.863-1.185-4.23-1.235-6.142-0.131L76.333,64.127c-1.794,1.036-2.916,2.933-2.961,5.004c-0.045,2.071,0.996,4.014,2.744,5.126l31.607,20.1c2.263,1.438,3.276,4.219,2.473,6.776c-0.804,2.558-3.227,4.257-5.905,4.142l-51.91-2.225c-2.206-0.094-4.28,1.045-5.384,2.956L4.468,179.667c-1.036,1.794-1.059,3.999-0.063,5.814c0.997,1.815,2.87,2.979,4.939,3.068l37.422,1.604c2.679,0.114,4.947,2.015,5.529,4.633s-0.665,5.299-3.043,6.54L3.185,225.352c-1.957,1.021-3.184,3.045-3.184,5.253v85.055c0,2.071,1.082,3.992,2.853,5.066s3.975,1.144,5.811,0.187l33.21-17.321c2.378-1.24,5.291-0.728,7.104,1.247c1.813,1.976,2.073,4.922,0.634,7.185l-27.882,43.843c-1.185,1.863-1.235,4.23-0.131,6.142l42.528,73.66c1.036,1.794,2.933,2.916,5.004,2.961s4.014-0.996,5.126-2.743l20.1-31.607c1.438-2.263,4.219-3.276,6.776-2.473c2.558,0.804,4.257,3.227,4.142,5.905l-2.225,51.91c-0.094,2.206,1.045,4.28,2.956,5.384l73.66,42.528c1.794,1.036,3.998,1.059,5.814,0.063c1.817-0.996,2.979-2.87,3.068-4.939l1.604-37.422c0.114-2.679,2.015-4.947,4.633-5.529c2.618-0.582,5.299,0.665,6.54,3.043l24.027,46.068c1.021,1.957,3.045,3.184,5.253,3.184h85.055c2.071,0,3.992-1.082,5.066-2.853s1.144-3.974,0.187-5.811l-17.321-33.21c-1.24-2.378-0.728-5.291,1.247-7.104c1.976-1.813,4.922-2.073,7.185-0.634l43.842,27.882c1.863,1.185,4.23,1.235,6.142,0.131l73.66-42.528c1.794-1.036,2.916-2.933,2.961-5.004c0.045-2.071-0.996-4.014-2.744-5.126l-31.607-20.1c-2.263-1.438-3.276-4.219-2.473-6.776s3.226-4.257,5.905-4.142l51.91,2.225c2.206,0.094,4.28-1.045,5.384-2.956l42.528-73.66c1.036-1.794,1.059-3.999,0.062-5.814c-0.996-1.815-2.87-2.979-4.939-3.068l-37.422-1.604c-2.679-0.114-4.947-2.015-5.529-4.633c-0.582-2.618,0.665-5.299,3.043-6.54l46.068-24.027c1.957-1.021,3.184-3.045,3.184-5.253V196.34C512.001,194.269,510.919,192.348,509.147,191.274z M256.001,291.156c-19.416,0-35.155-15.739-35.155-35.155s15.739-35.155,35.155-35.155s35.155,15.739,35.155,35.155S275.416,291.156,256.001,291.156z"
      />
      <path
        fill="#deb65c"
        d="M509.147,191.274c-1.772-1.074-3.975-1.144-5.811-0.187l-33.21,17.321c-2.378,1.24-5.291,0.728-7.104-1.247s-2.073-4.922-0.634-7.185l27.882-43.843c1.185-1.863,1.235-4.23,0.131-6.142l-42.528-73.66c-1.036-1.794-2.933-2.916-5.004-2.961c-2.071-0.045-4.014,0.996-5.126,2.743l-20.1,31.607c-1.438,2.263-4.219,3.276-6.776,2.473c-2.558-0.804-4.257-3.227-4.142-5.905l2.225-51.91c0.094-2.206-1.046-4.28-2.956-5.384L332.334,4.468c-1.794-1.036-3.998-1.059-5.814-0.062c-1.815,0.997-2.979,2.87-3.068,4.939l-1.604,37.422c-0.114,2.679-2.014,4.947-4.632,5.529c-2.618,0.582-5.299-0.665-6.54-3.043L286.648,3.184C285.627,1.227,283.603,0,281.395,0H256v220.844c19.416,0,35.155,15.739,35.155,35.155S275.416,291.155,256,291.155v220.844h59.66c2.071,0,3.992-1.082,5.066-2.853c1.074-1.772,1.144-3.974,0.187-5.811l-17.321-33.21c-1.24-2.378-0.728-5.291,1.247-7.104c1.976-1.813,4.922-2.073,7.185-0.634l43.842,27.882c1.863,1.185,4.23,1.235,6.142,0.131l73.66-42.528c1.794-1.036,2.916-2.933,2.961-5.004c0.045-2.071-0.996-4.014-2.744-5.126l-31.607-20.101c-2.263-1.438-3.276-4.219-2.473-6.776c0.803-2.557,3.226-4.257,5.905-4.142l51.91,2.225c2.206,0.094,4.28-1.045,5.384-2.956l42.528-73.66c1.036-1.794,1.059-3.999,0.062-5.814c-0.996-1.815-2.87-2.979-4.939-3.068l-37.422-1.604c-2.679-0.114-4.947-2.015-5.529-4.633s0.665-5.299,3.043-6.54l46.068-24.027c1.957-1.021,3.184-3.045,3.184-5.253v-85.055C512.001,194.269,510.919,192.348,509.147,191.274z"
      />
      <path
        fill="#cc9a35"
        d="M256.001,61.521c-107.407,0-194.478,87.071-194.478,194.478s87.071,194.478,194.478,194.478s194.478-87.071,194.478-194.478S363.408,61.521,256.001,61.521z M256.001,291.156c-19.416,0-35.155-15.739-35.155-35.155s15.739-35.155,35.155-35.155s35.155,15.739,35.155,35.155S275.416,291.156,256.001,291.156z"
      />
      <path
        fill="#d0a653"
        d="M291.156,256.001c0,19.416-15.739,35.155-35.155,35.155v159.323c107.407,0,194.478-87.071,194.478-194.478S363.408,61.521,256.001,61.521v159.323C275.416,220.844,291.156,236.584,291.156,256.001z"
      />
      <path
        fill="#dfb85f"
        d="M256.001,432.901c-97.544,0-176.901-79.357-176.901-176.901s79.357-176.9,176.901-176.9s176.901,79.357,176.901,176.901S353.544,432.901,256.001,432.901z M256.001,112.759c-78.984,0-143.241,64.258-143.241,143.241s64.258,143.241,143.241,143.241s143.241-64.258,143.241-143.241S334.984,112.759,256.001,112.759z"
      />
      <path
        fill="#dab054"
        d="M256.001,179.836c-42.063,0-76.164,34.1-76.164,76.164c0,42.063,34.1,76.164,76.164,76.164s76.164-34.1,76.164-76.164C332.164,213.936,298.065,179.836,256.001,179.836z M256.001,291.156c-19.416,0-35.155-15.739-35.155-35.155s15.739-35.155,35.155-35.155s35.155,15.739,35.155,35.155S275.416,291.156,256.001,291.156z"
      />
      <path
        fill="#deb65c"
        d="M291.156,256.001c0,19.416-15.739,35.155-35.155,35.155v41.008c42.063,0,76.164-34.1,76.164-76.164s-34.1-76.164-76.164-76.164v41.008C275.416,220.844,291.156,236.584,291.156,256.001z"
      />
    </g>
  );
}

// Polishing pad — original gold gradient look (no handle, no wedges).
// The 4 white pad-swirl spots make rotation visible as the parent group spins.
function PolisherDisc({ size = 76 }) {
  const r = size / 2;
  return (
    <g>
      <circle r={r} fill="url(#bufferGrad)" stroke="#0a0a0a" strokeWidth="1.5" />
      <circle r={r * 0.84} fill="none" stroke="rgba(255,245,208,0.5)" strokeWidth="1" />
      {Array.from({ length: 4 }).map((_, i) => {
        const a = (i / 4) * Math.PI * 2;
        return (
          <circle
            key={i}
            cx={Math.cos(a) * (r * 0.47)}
            cy={Math.sin(a) * (r * 0.47)}
            r={r * 0.16}
            fill="rgba(255,255,255,0.45)"
          />
        );
      })}
      {/* Specular highlight arc — adds a clear visual cue while spinning */}
      <path
        d={`M ${-r * 0.7} ${-r * 0.55} A ${r * 0.92} ${r * 0.92} 0 0 1 ${r * 0.55} ${-r * 0.7}`}
        fill="none"
        stroke="rgba(255,255,255,0.55)"
        strokeWidth={r * 0.06}
        strokeLinecap="round"
      />
      <circle r={r * 0.16} fill="#0a0a0a" />
    </g>
  );
}

// White marble slab — fill, branching gold veins, and outline. `finished`
// brightens the outline to read as "polished and ready to install".
function MarbleSlab({ finished = false }) {
  return (
    <g>
      <path d={COUNTERTOP_PATH} fill="url(#stone)" />
      <g clipPath="url(#slabClip)">
        {/* Primary diagonal vein — thick, branching */}
        <path
          d="M 200 220 Q 320 250 420 235 T 640 270 Q 760 295 880 250 T 1000 230"
          fill="none"
          stroke="#b8702a"
          strokeWidth="2.2"
          strokeLinecap="round"
          opacity="0.85"
        />
        {/* Branch off primary */}
        <path
          d="M 420 235 Q 470 290 510 350 T 600 470"
          fill="none"
          stroke="#c47a30"
          strokeWidth="1.8"
          strokeLinecap="round"
          opacity="0.75"
        />
        {/* Secondary horizontal vein */}
        <path
          d="M 220 320 Q 380 360 540 335 T 820 370 Q 920 385 1000 360"
          fill="none"
          stroke="#a86527"
          strokeWidth="1.6"
          strokeLinecap="round"
          opacity="0.7"
        />
        {/* Lower-arm vein cluster */}
        <path
          d="M 230 420 Q 300 440 380 430 T 540 460 Q 590 470 630 455"
          fill="none"
          stroke="#b8702a"
          strokeWidth="1.6"
          strokeLinecap="round"
          opacity="0.7"
        />
        {/* Filaments — fine hair-veins */}
        <path
          d="M 480 220 q 30 35 10 80 t -10 70"
          fill="none"
          stroke="#c47a30"
          strokeWidth="0.9"
          opacity="0.5"
        />
        <path
          d="M 760 230 q -25 40 -5 90 t 25 80"
          fill="none"
          stroke="#a86527"
          strokeWidth="0.9"
          opacity="0.5"
        />
        <path
          d="M 280 470 q 60 -30 130 -10"
          fill="none"
          stroke="#c47a30"
          strokeWidth="0.8"
          opacity="0.55"
        />
        {/* Tiny specks of copper */}
        {[
          [310, 250], [380, 290], [560, 240], [690, 310],
          [840, 260], [930, 320], [320, 410], [510, 440],
          [580, 470],
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={1.8} fill="#b8702a" opacity="0.7" />
        ))}
      </g>
      <path
        d={COUNTERTOP_PATH}
        fill="none"
        stroke={finished ? '#a86527' : '#c47a30'}
        strokeWidth={finished ? 2 : 1.6}
        opacity={finished ? 0.9 : 0.65}
      />
      {finished && (
        <line
          x1="200"
          y1="202"
          x2="1000"
          y2="202"
          stroke="rgba(255,255,255,0.7)"
          strokeWidth="1"
        />
      )}
    </g>
  );
}

const clamp01 = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);

// Saw position around the L outline. Uses the same parametric perimeter
// as pencilPoint, so the saw appears to cut the very lines that were drawn.
function sawPoint(t) {
  return pencilPoint(clamp01(t));
}

// Serpentine polishing path covering the L surface in 9 segments.
// Returns a point along the snake-like trajectory at parameter t (0..1).
function polishPoint(t) {
  const segs = [
    { from: [240, 240], to: [980, 240] }, // top row of upper rect
    { from: [980, 240], to: [980, 295] }, // step down
    { from: [980, 295], to: [240, 295] }, // back left
    { from: [240, 295], to: [240, 350] }, // step down
    { from: [240, 350], to: [980, 350] }, // right
    { from: [980, 350], to: [610, 350] }, // back left toward bottom-arm column
    { from: [610, 350], to: [610, 430] }, // descend into lower extension
    { from: [610, 430], to: [240, 430] }, // bottom row of lower extension
    { from: [240, 430], to: [240, 475] }, // final step down
    { from: [240, 475], to: [610, 475] }, // final pass right
  ].map((s) => ({
    ...s,
    len: Math.hypot(s.to[0] - s.from[0], s.to[1] - s.from[1]),
  }));
  const total = segs.reduce((a, s) => a + s.len, 0);
  let traveled = clamp01(t) * total;
  for (const s of segs) {
    if (traveled <= s.len) {
      const f = traveled / s.len;
      return {
        x: s.from[0] + (s.to[0] - s.from[0]) * f,
        y: s.from[1] + (s.to[1] - s.from[1]) * f,
      };
    }
    traveled -= s.len;
  }
  return { x: 610, y: 475 };
}

function StageLabel({ opacity, index, title, body }) {
  return (
    <motion.div style={{ opacity }} className="absolute inset-x-0 bottom-0 grid grid-cols-1 gap-2 sm:grid-cols-12 sm:gap-4">
      <div className="sm:col-span-2">
        <span className="font-display text-3xl text-gold-400">{index}</span>
      </div>
      <div className="sm:col-span-3">
        <h3 className="font-display text-3xl text-stone-50 sm:text-4xl">{title}</h3>
      </div>
      <div className="sm:col-span-7">
        <p className="max-w-md text-sm leading-relaxed text-stone-300 sm:text-base">{body}</p>
      </div>
    </motion.div>
  );
}

// Pencil parametric position along the L outline. Trace clockwise from (200,200).
function pencilPoint(t) {
  const segs = [
    { from: [200, 200], to: [1000, 200], len: 800 },
    { from: [1000, 200], to: [1000, 380], len: 180 },
    { from: [1000, 380], to: [650, 380], len: 350 },
    { from: [650, 380], to: [650, 500], len: 120 },
    { from: [650, 500], to: [200, 500], len: 450 },
    { from: [200, 500], to: [200, 200], len: 300 },
  ];
  const total = segs.reduce((a, s) => a + s.len, 0);
  let traveled = t * total;
  for (const s of segs) {
    if (traveled <= s.len) {
      const f = traveled / s.len;
      return {
        x: s.from[0] + (s.to[0] - s.from[0]) * f,
        y: s.from[1] + (s.to[1] - s.from[1]) * f,
      };
    }
    traveled -= s.len;
  }
  return { x: 200, y: 200 };
}
