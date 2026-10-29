'use client';

import { useEffect, useRef, useState } from 'react';
import Viewer from './Viewer';

type Props = {
  kind: 'laptop' | 'phone';
  src: string;
  title: string;
  eager?: boolean;
  hideCaption?: boolean;
};

const SIZES = {
  laptop: { w: 1280, h: 800 },
  phone: { w: 390, h: 844 },
};

/** true en pantallas angostas: ahí las webs se muestran como en un celular. */
function useNarrow() {
  const [narrow, setNarrow] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 700px)');
    const update = () => setNarrow(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);
  return narrow;
}

export function ExpandIcon() {
  return (
    <svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true">
      <path
        d="M3 8V3h5M17 8V3h-5M3 12v5h5M17 12v5h-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Muestra una demo real (iframe) dentro de un marco de notebook o celular.
 * El sitio se dibuja a su tamaño real y se escala para entrar en el marco.
 * En el celular, las webs se muestran en formato teléfono (son responsive).
 * Hasta que la persona toca "Probar", el iframe no captura el scroll de la página.
 */
export default function Device({ kind, src, title, eager = false, hideCaption = false }: Props) {
  const narrow = useNarrow();
  const shown = narrow ? 'phone' : kind;
  const box = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);
  const [visible, setVisible] = useState(eager);
  const [active, setActive] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [open, setOpen] = useState(false);
  const { w, h } = SIZES[shown];

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setScale(e.contentRect.width / w));
    ro.observe(el);
    let io: IntersectionObserver | null = null;
    if (!eager) {
      io = new IntersectionObserver(
        ([e]) => {
          if (e.isIntersecting) {
            setVisible(true);
            io?.disconnect();
          }
        },
        { rootMargin: '600px 0px' },
      );
      io.observe(el);
    }
    return () => {
      ro.disconnect();
      io?.disconnect();
    };
  }, [w, eager]);

  // La central del antipánico se activa sola cuando el teléfono simulado manda una alerta
  useEffect(() => {
    if (!src.includes('/central/')) return;
    const on = () => setActive(true);
    window.addEventListener('activar-central', on);
    return () => window.removeEventListener('activar-central', on);
  }, [src]);

  // Al cambiar de formato (girar el celular, achicar la ventana) el iframe se vuelve a cargar
  useEffect(() => setLoaded(false), [shown]);

  return (
    <figure className={`device device-${shown} ${active ? 'is-active' : ''}`}>
      <div className="device-shell">
        {shown === 'laptop' && (
          <div className="device-bar" aria-hidden="true">
            <i />
            <i />
            <i />
            <span>{title}</span>
          </div>
        )}
        <div className="device-screen" ref={box} style={{ aspectRatio: `${w} / ${h}` }}>
          {visible && scale > 0 && (
            <iframe
              key={shown}
              src={src}
              title={title}
              loading="lazy"
              onLoad={() => setLoaded(true)}
              tabIndex={active ? 0 : -1}
              style={{ width: w, height: h, transform: `scale(${scale})` }}
            />
          )}
          {!loaded && <div className="device-loading" aria-hidden="true" />}
          {!active && (
            <button type="button" className="device-cover" onClick={() => setActive(true)}>
              <span>Tocá para probar</span>
            </button>
          )}
        </div>
      </div>
      {!hideCaption && (
        <figcaption>
          <span className="device-title">{title}</span>
          <button type="button" className="device-expand" onClick={() => setOpen(true)}>
            <ExpandIcon />
            Pantalla completa
          </button>
        </figcaption>
      )}
      {open && <Viewer src={src} title={title} onClose={() => setOpen(false)} />}
    </figure>
  );
}
