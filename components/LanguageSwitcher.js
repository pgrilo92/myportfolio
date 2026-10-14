'use client';
import { usePathname, useRouter } from 'next/navigation';
import { PortugalIcon, FranceIcon, UKIcon } from './Icons';

export default function LanguageSwitcher({ currentLang }) {
  const pathname = usePathname();
  const router = useRouter();
  
  const languages = [
    { code: 'pt', name: 'PT', Icon: PortugalIcon },
    { code: 'fr', name: 'FR', Icon: FranceIcon },
    { code: 'en', name: 'EN', Icon: UKIcon },
  ];
  
  const switchLanguage = (newLang) => {
    const segments = pathname.split('/').filter(Boolean);
    if (['pt', 'fr', 'en'].includes(segments[0])) {
      segments[0] = newLang;
    } else {
      segments.unshift(newLang);
    }
    router.push('/' + segments.join('/'));
  };
  
  return (
    <div className="language-switcher">
      {languages.map((lang) => {
        const Icon = lang.Icon;
        return (
          <button
            key={lang.code}
            onClick={() => switchLanguage(lang.code)}
            className={currentLang === lang.code ? 'active' : ''}
            aria-label={`Switch to ${lang.name}`}
          >
            <Icon className="flag-icon" />
            <span className="code">{lang.name}</span>
          </button>
        );
      })}
    </div>
  );
}
