'use client';

import { useEffect } from 'react';

/**
 * Los elementos con la clase "reveal" aparecen suavemente al entrar en pantalla.
 * Funciona en todos los navegadores. Sin JavaScript o con "reducir movimiento" se ve todo normal.
 */
export default function Reveal() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const root = document.documentElement;
    const els = Array.from(document.querySelectorAll<HTMLElement>('.reveal'));
    els.forEach((el) => {
      if (el.getBoundingClientRect().top < window.innerHeight * 0.92) el.classList.add('is-in');
    });
    root.classList.add('js-reveal');
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-in');
            io.unobserve(e.target);
          }
        }),
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
    );
    els.forEach((el) => !el.classList.contains('is-in') && io.observe(el));
    return () => io.disconnect();
  }, []);
  return null;
}
