'use client';

import { useEffect, useRef, useState } from 'react';

const HOLD_MS = 3000;
type Phase = 'idle' | 'holding' | 'sent' | 'resolved';

/**
 * Réplica de la pantalla principal de la app del empleado.
 * Al completar los 3 segundos avisa a la central embebida (mismo sitio) por BroadcastChannel,
 * y vuelve a la normalidad cuando la central marca la alerta como resuelta.
 */
export default function PanicPhone() {
  const [phase, setPhase] = useState<Phase>('idle');
  const [progress, setProgress] = useState(0);
  const start = useRef<number | null>(null);
  const raf = useRef<number | null>(null);
  const channel = useRef<BroadcastChannel | null>(null);

  useEffect(() => {
    try {
      channel.current = new BroadcastChannel('demo-antipanico');
      channel.current.onmessage = (e) => {
        if (e.data?.tipo === 'resuelta') setPhase('resolved');
      };
    } catch {
      channel.current = null;
    }
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
      channel.current?.close();
    };
  }, []);

  const stop = () => {
    if (raf.current) cancelAnimationFrame(raf.current);
    raf.current = null;
    start.current = null;
  };

  const tick = (t: number) => {
    if (start.current === null) start.current = t;
    const p = Math.min((t - start.current) / HOLD_MS, 1);
    setProgress(p);
    if (p >= 1) {
      stop();
      navigator.vibrate?.(200);
      channel.current?.postMessage({ tipo: 'alerta' });
      setPhase('sent');
      window.dispatchEvent(new Event('activar-central'));
      // En el celular la central queda abajo: la llevamos a la vista para ver la alerta.
      if (window.matchMedia('(max-width: 900px)').matches) {
        setTimeout(() => {
          document.querySelector('[data-central]')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 350);
      }
      return;
    }
    raf.current = requestAnimationFrame(tick);
  };

  const press = () => {
    if (phase !== 'idle') return;
    setPhase('holding');
    raf.current = requestAnimationFrame(tick);
  };

  const release = () => {
    if (phase !== 'holding') return;
    stop();
    setPhase('idle');
    setProgress(0);
  };

  const reset = () => {
    stop();
    setPhase('idle');
    setProgress(0);
  };

  const r = 54;
  const c = 2 * Math.PI * r;

  return (
    <figure className="device device-phone panic-phone">
      <div className="device-shell">
        <div className="device-screen pp-screen">
          <div className="pp-status">
            <span>9:41</span>
            <span>62%</span>
          </div>
          {phase === 'idle' || phase === 'holding' ? (
            <div className="pp-body">
              <p className="pp-hello">Hola, Diego</p>
              <p className="pp-sub">Choferes, legajo L-0127</p>
              <button
                type="button"
                className={`pp-btn ${phase === 'holding' ? 'is-holding' : ''}`}
                onPointerDown={press}
                onPointerUp={release}
                onPointerLeave={release}
                onPointerCancel={release}
                onKeyDown={(e) => {
                  if ((e.key === ' ' || e.key === 'Enter') && !e.repeat) {
                    e.preventDefault();
                    press();
                  }
                }}
                onKeyUp={(e) => {
                  if (e.key === ' ' || e.key === 'Enter') release();
                }}
                onContextMenu={(e) => e.preventDefault()}
              >
                <svg viewBox="0 0 120 120" aria-hidden="true">
                  <circle cx="60" cy="60" r={r} className="pp-track" />
                  <circle cx="60" cy="60" r={r} className="pp-fill" strokeDasharray={c} strokeDashoffset={c * (1 - progress)} />
                </svg>
                <span>{phase === 'holding' ? 'Seguí apretando' : 'SOS'}</span>
              </button>
              <p className="pp-hint">Mantené apretado 3 segundos. Si soltás antes, no se envía nada.</p>
            </div>
          ) : phase === 'sent' ? (
            <div className="pp-body pp-calm">
              <p className="pp-hello">Hola, Diego</p>
              <p className="pp-ok">Todo en orden</p>
              <p className="pp-hint">
                Modo discreto: la pantalla no muestra la alarma. Mirá la central: ya te ve en el mapa.
              </p>
            </div>
          ) : (
            <div className="pp-body pp-calm">
              <p className="pp-ok">La central resolvió tu alerta</p>
              <button type="button" className="pp-again" onClick={reset}>
                Volver al inicio
              </button>
            </div>
          )}
        </div>
      </div>
      <figcaption>
        <span>App del empleado</span>
        <span className="pp-tip">Apretá el botón y mirá la central</span>
      </figcaption>
    </figure>
  );
}
