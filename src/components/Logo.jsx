export default function Logo({ className = '', mark = true, wordmark = true }) {
  return (
    <a
      href="#top"
      className={`group inline-flex items-center gap-3 ${className}`}
      aria-label="KF Countertop home"
    >
      {mark && (
        <span className="relative inline-flex h-11 w-11 items-center justify-center transition-transform duration-500 ease-luxe group-hover:scale-105">
          <img
            src="/logo.svg"
            alt=""
            draggable="false"
            className="h-full w-full select-none object-contain logo-mark"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 ease-luxe group-hover:opacity-100"
            style={{
              background:
                'radial-gradient(circle at 50% 50%, rgba(201,150,47,0.35), transparent 70%)',
            }}
          />
        </span>
      )}
      {wordmark && (
        <span className="flex flex-col leading-none">
          <span className="text-[10px] uppercase tracking-widest text-gold-400">KF</span>
          <span className="font-display text-lg text-stone-50">Countertop</span>
        </span>
      )}
    </a>
  );
}
