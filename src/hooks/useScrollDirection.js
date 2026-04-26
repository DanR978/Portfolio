import { useEffect, useState } from 'react';

export default function useScrollDirection(threshold = 8) {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const y = window.scrollY;
          setScrolled(y > 24);
          if (Math.abs(y - lastY) > threshold) {
            setHidden(y > lastY && y > 120);
            lastY = y;
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);

  return { scrolled, hidden };
}
