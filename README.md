# Thiago Paniagua · Desarrollador Full Stack

Portfolio y CV online. Proyectos con demo en vivo y detalle de cómo está hecho cada uno.

**Sitio:** https://thiagopaniagua-dev.vercel.app

## Stack del sitio

Next.js 15 (exportación estática), TypeScript y CSS sin librerías.

## Desarrollo

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # genera la carpeta out/
```

- Datos personales, stack y trayectoria: `src/data/site.ts`
- Proyectos: `src/data/projects.ts`
- Demos (builds estáticos con datos de prueba): `public/demos/`
- CV en PDF: `public/thiago-paniagua-cv.pdf` (se genera desde `tools/cv.html`)
