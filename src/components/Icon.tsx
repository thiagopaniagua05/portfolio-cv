// Íconos de trazo simples (sin dependencias).
const PATHS: Record<string, string> = {
  download: 'M12 4v11M7 10l5 5 5-5M5 20h14',
  arrowRight: 'M5 12h14M13 6l6 6-6 6',
  arrowLeft: 'M19 12H5M11 6l-6 6 6 6',
  code: 'M8 9l-4 3 4 3M16 9l4 3-4 3M13 6l-2 12',
  school: 'M3 9l9-5 9 5-9 5zM7 11.5V16c0 1.5 2.2 3 5 3s5-1.5 5-3v-4.5',
  shield: 'M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6zM9 12l2 2 4-4',
  pin: 'M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11zM12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z',
  menu: 'M4 7h16M4 12h16M4 17h16',
  close: 'M6 6l12 12M18 6L6 18',
  mail: 'M4 6h16v12H4zM4 7l8 6 8-6',
  lock: 'M6 11h12v9H6zM9 11V8a3 3 0 0 1 6 0v3',
};

export default function Icon({ name, size = 18, d }: { name?: string; size?: number; d?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={d ?? PATHS[name ?? 'code']} />
    </svg>
  );
}
