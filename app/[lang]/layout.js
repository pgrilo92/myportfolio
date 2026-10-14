import { getTranslation } from '@/lib/translations';
import '../globals.css';

export async function generateStaticParams() {
  return [{ lang: 'pt' }, { lang: 'fr' }, { lang: 'en' }];
}

export async function generateMetadata({ params }) {
  const { lang } = params;
  const t = getTranslation(lang);
  
  return {
    title: lang === 'pt' 
      ? 'Joaquim Grilo - Especialista em IA para Bancos e Negócios'
      : lang === 'fr'
      ? 'Joaquim Grilo - Spécialiste IA pour Banques et Entreprises'
      : 'Joaquim Grilo - AI Expert for Banks and Businesses',
    description: t.hero.description,
    alternates: {
      languages: {
        'pt-AO': '/pt',
        'fr-CA': '/fr',
        'en': '/en',
      },
    },
    openGraph: {
      title: t.hero.title,
      description: t.hero.description,
      locale: t.htmlLang,
      type: 'website',
    },
  };
}

export default function LangLayout({ children, params }) {
  const { lang } = params;
  const t = getTranslation(lang);
  
  return (
    <html lang={t.htmlLang}>
      <head>
        <link rel="icon" href="/favicon.svg" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
