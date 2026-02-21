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
  title: 'Andrea La Torre | Contadora P\u00fablica - Auditor\u00eda, Impuestos y SAGRILAFT en Colombia',
  description:
    'Andrea La Torre - Contadora P\u00fablica certificada con 15+ a\u00f1os de experiencia. Servicios de contabilidad, auditor\u00eda, declaraci\u00f3n de renta, impuestos y SAGRILAFT para empresas y personas naturales en Colombia. Consulta inicial GRATIS.',
  keywords: 'contadora publica colombia, auditor\u00eda, declaracion de renta, SAGRILAFT, impuestos colombia, contabilidad empresas, DIAN, IVA, retencion en la fuente',
  openGraph: {
    title: 'Andrea La Torre | Contadora P\u00fablica Certificada',
    description: 'Servicios contables, tributarios y de cumplimiento que impulsan la confianza y transparencia de su negocio. 15+ a\u00f1os de experiencia.',
    type: 'website',
    locale: 'es_CO',
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Andrea La Torre - Contadora P\u00fablica',
  description: 'Servicios profesionales de contabilidad, auditor\u00eda, impuestos, declaraci\u00f3n de renta y cumplimiento SAGRILAFT para empresas y personas naturales en Colombia.',
  telephone: '+573022851810',
  email: 'andrealato30@gmail.com',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'CO',
    addressLocality: 'Colombia',
  },
  priceRange: '$$',
  areaServed: {
    '@type': 'Country',
    name: 'Colombia',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Servicios Contables y Tributarios',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Contabilidad' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Auditor\u00eda' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Impuestos' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Declaraci\u00f3n de Renta - Persona Natural' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'SAGRILAFT' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'PTEE - Programa de Transparencia y \u00c9tica Empresarial' } },
    ],
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5',
    reviewCount: '500',
    bestRating: '5',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${montserrat.variable} ${playfair.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={montserrat.className}>{children}</body>
    </html>
  );
}
