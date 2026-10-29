'use client';

import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

type Props = { src: string; title: string; onClose: () => void };

/**
 * Visor a pantalla completa, dentro del mismo portfolio.
 * La demo ocupa toda la ventana con su diseño real (en el celular se ve como en el celular).
 */
export default function Viewer({ src, title, onClose }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    document.documentElement.classList.add('viewer-open');
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => {
      document.documentElement.classList.remove('viewer-open');
      window.removeEventListener('keydown', onKey);
      prev?.focus();
    };
  }, [onClose]);

  return createPortal(
    <div className="viewer" role="dialog" aria-modal="true" aria-label={`${title}, pantalla completa`}>
      <div className="viewer-bar">
        <span className="viewer-dot" aria-hidden="true" />
        <p className="viewer-title">{title}</p>
        <a className="viewer-btn" href={src} target="_blank" rel="noopener noreferrer">
          <svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true">
            <path d="M11 3h6v6M17 3l-8 8M8 4H4v12h12v-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>Abrir en otra pestaña</span>
        </a>
        <button ref={closeRef} type="button" className="viewer-btn viewer-close" onClick={onClose}>
          <svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true">
            <path d="M5 5l10 10M15 5L5 15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <span>Cerrar</span>
        </button>
      </div>
      <iframe className="viewer-frame" src={src} title={title} />
    </div>,
    document.body,
  );
}
