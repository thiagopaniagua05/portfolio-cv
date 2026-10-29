import type { Metadata, Viewport } from 'next';
import { Geist } from 'next/font/google';
import { site } from '../data/site';
import './globals.css';

const geist = Geist({ subsets: ['latin'], variable: '--font', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: `${site.name} | ${site.title}`,
  description: `${site.title} en ${site.city}. React, React Native y Node.js. Proyectos con demo en vivo.`,
  openGraph: {
    title: `${site.name} | ${site.title}`,
    description: 'React, React Native y Node.js. Proyectos con demo en vivo.',
    type: 'website',
    locale: 'es_AR',
  },
};

export const viewport: Viewport = { themeColor: '#FFFFFF' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-AR" className={geist.variable}>
      <body>{children}</body>
    </html>
  );
}
