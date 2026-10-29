// Datos personales. Cambiá estos valores y se actualiza todo el sitio (y el CV en PDF).
export const site = {
  name: 'Thiago Paniagua',
  title: 'Desarrollador Full Stack',
  city: 'Buenos Aires, Argentina',
  modality: 'Presencial, híbrido o remoto',
  email: 'thiago.paniagua.emp@gmail.com',
  github: 'https://github.com/thiagopaniagua05',
  linkedin: 'https://www.linkedin.com/in/thiagopaniagua/',
  // Dirección pública del sitio (la que te dé Vercel o tu dominio)
  url: 'https://thiagopaniagua-dev.vercel.app',
  cv: '/thiago-paniagua-cv.pdf',
  summary:
    'Hago aplicaciones web y mobile con React, React Native y Node.js, y ya desarrollé sistemas que hoy usan empresas reales.',
};

export const stack = [
  { area: 'Frontend', icon: 'M8 9l-4 3 4 3M16 9l4 3-4 3M13 6l-2 12', main: ['React', 'Next.js', 'JavaScript'], rest: ['TypeScript', 'Tailwind CSS', 'Vite'] },
  { area: 'Mobile', icon: 'M8 3h8a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zM11 18h2', main: ['React Native', 'Expo'], rest: ['Notificaciones push', 'Geolocalización'] },
  { area: 'Backend', icon: 'M4 6h16v5H4zM4 13h16v5H4zM8 8.5h.01M8 15.5h.01', main: ['Node.js', 'Express'], rest: ['Socket.io', 'APIs REST', 'JWT'] },
  { area: 'Datos', icon: 'M12 4c4.4 0 8 1.3 8 3s-3.6 3-8 3-8-1.3-8-3 3.6-3 8-3zM4 7v10c0 1.7 3.6 3 8 3s8-1.3 8-3V7M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3', main: ['MongoDB', 'PostgreSQL'], rest: ['Firebase', 'Payload CMS'] },
  { area: 'Herramientas', icon: 'M6 3v12M18 9a3 3 0 1 0 0-.01M6 21a3 3 0 1 0 0-.01M18 12c0 4-6 3-12 6', main: ['Git', 'GitHub'], rest: ['Vercel', 'Railway', 'Docker'] },
];

export const timeline = [
  {
    when: '2026 – actualidad',
    title: 'Desarrollador Full Stack',
    place: 'Proyectos para clientes',
    text: 'Relevamiento de requerimientos, desarrollo de apps mobile, paneles web y APIs, publicación y mantenimiento.',
  },
  {
    when: '2025 – actualidad',
    title: 'Tecnicatura Universitaria en Programación',
    place: 'Universidad Tecnológica Nacional (UTN)',
    text: 'Programación, bases de datos, desarrollo web y mobile.',
  },
  {
    when: '2024 – 2025',
    title: 'Cursos de JavaScript y React',
    place: 'Coderhouse',
    text: 'Proyecto final: tienda online con React y Firebase.',
  },
  { when: 'Idiomas', title: 'Español nativo, inglés básico', place: '', text: '' },
];
