'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

// Recorrido inventado sobre un plano esquemático.
const ROUTE: [number, number][] = [
  [30, 220], [90, 220], [90, 170], [170, 170], [170, 120], [250, 120],
  [250, 70], [330, 70], [330, 40], [380, 40],
];
// Paradas detectadas: posición (0 a 1) dentro del recorrido y duración.
const STOPS = [
  { at: 0.34, label: 'Parada de 18 min' },
  { at: 0.71, label: 'Parada de 9 min' },
];
const TOTAL_KM = 42.6;
const DURATION = 11000;

function useRouteGeometry() {
  return useMemo(() => {
    const segs = ROUTE.slice(1).map((p, i) => {
      const a = ROUTE[i];
      return { a, b: p, len: Math.hypot(p[0] - a[0], p[1] - a[1]) };
    });
    const total = segs.reduce((s, x) => s + x.len, 0);
    const pointAt = (t: number): [number, number] => {
      let d = t * total;
      for (const s of segs) {
        if (d <= s.len) {
          const k = d / s.len;
          return [s.a[0] + (s.b[0] - s.a[0]) * k, s.a[1] + (s.b[1] - s.a[1]) * k];
        }
        d -= s.len;
      }
      return ROUTE[ROUTE.length - 1];
    };
    return { total, pointAt };
  }, []);
}

export default function RouteDemo() {
  const { total, pointAt } = useRouteGeometry();
  const [t, setT] = useState(0);
  const [running, setRunning] = useState(false);
  const raf = useRef<number | null>(null);
  const startAt = useRef(0);

  useEffect(() => () => { if (raf.current) cancelAnimationFrame(raf.current); }, []);

  const run = () => {
    if (raf.current) cancelAnimationFrame(raf.current);
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setT(1);
      return;
    }
    setRunning(true);
    startAt.current = performance.now() - t * DURATION;
    const step = (now: number) => {
      const p = Math.min((now - startAt.current) / DURATION, 1);
      setT(p);
      if (p < 1) raf.current = requestAnimationFrame(step);
      else setRunning(false);
    };
    raf.current = requestAnimationFrame(step);
  };

  const reset = () => {
    if (raf.current) cancelAnimationFrame(raf.current);
    setRunning(false);
    setT(0);
  };

  const [x, y] = pointAt(t);
  const done = STOPS.filter((s) => t >= s.at);
  const path = ROUTE.map((p, i) => `${i ? 'L' : 'M'}${p[0]} ${p[1]}`).join(' ');
  const finished = t >= 1;

  return (
    <div className="demo demo-route">
      <div className="route-map">
        <svg viewBox="0 0 410 260" role="img" aria-label="Mapa con el recorrido del camión">
          <g className="streets">
            {[40, 70, 120, 170, 220].map((yy) => (
              <line key={`h${yy}`} x1="0" x2="410" y1={yy} y2={yy} />
            ))}
            {[30, 90, 170, 250, 330, 380].map((xx) => (
              <line key={`v${xx}`} x1={xx} x2={xx} y1="0" y2="260" />
            ))}
          </g>
          <path d={path} className="route-base" />
          <path
            d={path}
            className="route-done"
            pathLength={1}
            strokeDasharray="1"
            strokeDashoffset={1 - t}
          />
          {done.map((s) => {
            const [sx, sy] = pointAt(s.at);
            return <rect key={s.at} x={sx - 6} y={sy - 6} width="12" height="12" rx="2" className="stop" />;
          })}
          <circle cx={x} cy={y} r="9" className="truck" />
        </svg>
      </div>

      <div className="route-side">
        <dl className="route-stats">
          <div>
            <dt>Recorrido</dt>
            <dd>{(t * TOTAL_KM).toFixed(1)} km</dd>
          </div>
          <div>
            <dt>Velocidad</dt>
            <dd>{running && !done.some((s) => Math.abs(t - s.at) < 0.02) ? 58 : 0} km/h</dd>
          </div>
          <div>
            <dt>Paradas</dt>
            <dd>{done.length}</dd>
          </div>
        </dl>
        <ul className="route-log" aria-live="polite">
          {t > 0 && <li>Jornada iniciada, camión AB 123 CD</li>}
          {done.map((s) => <li key={s.at}>{s.label}</li>)}
          {finished && <li>Jornada finalizada</li>}
        </ul>
        {finished ? (
          <button type="button" className="btn-small" onClick={reset}>Reiniciar</button>
        ) : (
          <button type="button" className="btn-small" onClick={run} disabled={running}>
            {running ? 'En viaje…' : 'Simular viaje'}
          </button>
        )}
      </div>
    </div>
  );
}
