'use client';

import { useEffect, useRef, useState } from 'react';
import Icon from './Icon';
import { site } from '../data/site';

type Props = { links?: { href: string; label: string }[]; back?: boolean };

/** Barra superior fija. En el celular, las secciones van en un menú desplegable. */
export default function Header({ links = [], back = false }: Props) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');
  const linksRef = useRef<HTMLDivElement>(null);
  const [pill, setPill] = useState({ x: 0, w: 0, on: false });

  // Mueve el rectángulo negro debajo de la sección actual
  useEffect(() => {
    const place = () => {
      const el = linksRef.current?.querySelector<HTMLElement>(`a[href="#${active}"]`);
      setPill((p) => (el ? { x: el.offsetLeft, w: el.offsetWidth, on: true } : { ...p, on: false }));
    };
    place();
    window.addEventListener('resize', place);
    return () => window.removeEventListener('resize', place);
  }, [active]);

  // Marca en la barra la sección que se está viendo
  useEffect(() => {
    if (!links.length) return;
    const ids = links.map((l) => l.href.slice(1));
    let raf = 0;
    const update = () => {
      raf = 0;
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      let current = '';
      if (atBottom) current = ids[ids.length - 1];
      else
        for (const id of ids) {
          const el = document.getElementById(id);
          if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.35) current = id;
        }
      setActive(current);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [links]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className={`top ${open ? 'is-open' : ''}`}>
      <nav aria-label="Secciones" className="wrap top-in">
        {back ? (
          <a className="top-back" href="/#proyectos">
            <Icon name="arrowLeft" size={16} /> Volver a proyectos
          </a>
        ) : null}
        <a className="brand" href="/" onClick={() => setOpen(false)}>
          <span className="brand-mark" aria-hidden="true">TP</span>
          <span className="brand-name">{site.name}</span>
        </a>
        <div className="top-links" ref={linksRef}>
          <span
            className={`nav-pill ${pill.on ? 'is-on' : ''}`}
            style={{ transform: `translateX(${pill.x}px)`, width: pill.w }}
            aria-hidden="true"
          />
          {links.map((l) => (
            <a
              key={l.href}
              className={`nav-link ${active === l.href.slice(1) ? 'is-active' : ''}`}
              href={l.href}
              aria-current={active === l.href.slice(1) ? 'true' : undefined}
            >
              {l.label}
            </a>
          ))}
        </div>
        <a className={`btn btn-dark btn-sm top-cv ${active === 'contacto' ? 'is-quiet' : ''}`} href={site.cv} download>
          <Icon name="download" size={16} /> Descargar CV
        </a>
        {links.length > 0 && (
          <button type="button" className="menu-btn" aria-expanded={open} aria-controls="menu" onClick={() => setOpen((o) => !o)}>
            <Icon name={open ? 'close' : 'menu'} size={20} />
            <span className="sr-only">{open ? 'Cerrar menú' : 'Abrir menú'}</span>
          </button>
        )}
      </nav>
      {links.length > 0 && (
        <div id="menu" className="menu-panel" hidden={!open}>
          <div className="wrap">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={active === l.href.slice(1) ? 'is-active' : undefined}
                aria-current={active === l.href.slice(1) ? 'true' : undefined}
                onClick={() => setOpen(false)}
              >
                {l.label}
              </a>
            ))}
            <a className="btn btn-primary" href={site.cv} download onClick={() => setOpen(false)}>
              <Icon name="download" size={16} /> Descargar CV
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
