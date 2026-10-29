/** @type {import('next').NextConfig} */
const dev = process.env.NODE_ENV !== 'production';

const nextConfig = {
  // En producción exporta HTML estático (Vercel, Netlify o cualquier hosting).
  ...(dev ? {} : { output: 'export' }),
  // Direcciones con barra final: así cada demo de public/demos encuentra sus archivos.
  trailingSlash: true,
  // En desarrollo, las carpetas de public/demos se abren por su index.html
  // (en producción eso lo hace el hosting solo).
  ...(dev
    ? {
        async rewrites() {
          return [{ source: '/demos/:path*/', destination: '/demos/:path*/index.html' }];
        },
      }
    : {}),
};

export default nextConfig;
