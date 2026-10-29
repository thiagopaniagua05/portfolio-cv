'use client';

import { useEffect, useState } from 'react';
import Icon from './Icon';
import { site } from '../data/site';

type Props = { links?: { href: string; label: string }[]; back?: boolean };

/** Barra superior fija. En el celular, las secciones van en un menú desplegable. */
export default function Header({ links = [], back = false }: Props) {
  const [open, setOpen] = useState(false);

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
          {site.name}
        </a>
        <div className="top-links">
          {links.map((l) => (
            <a key={l.href} className="nav-link" href={l.href}>
              {l.label}
            </a>
          ))}
        </div>
        <a className="btn btn-dark btn-sm top-cv" href={site.cv} download>
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
              <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
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
