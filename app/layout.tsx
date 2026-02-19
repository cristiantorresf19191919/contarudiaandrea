import type { Metadata } from 'next';
import { Montserrat, Playfair_Display } from 'next/font/google';
import './globals.css';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-montserrat',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Andrea La Torre | Contadora Publica - Auditoria y Control',
  description:
    'Andrea La Torre - Contadora Publica, Especialista en Auditoria y Control, Oficial de cumplimiento SAGRILAFT. Servicios contables, tributarios y de cumplimiento en Colombia.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${montserrat.variable} ${playfair.variable}`}>
      <body className={montserrat.className}>{children}</body>
    </html>
  );
}
