'use client';
import { usePathname, useRouter } from 'next/navigation';

export default function LanguageSwitcher({ currentLang }) {
  const pathname = usePathname();
  const router = useRouter();
  
  const languages = [
    { code: 'pt', name: 'PT', flag: '🇦🇴' },
    { code: 'fr', name: 'FR', flag: '🇨🇦' },
    { code: 'en', name: 'EN', flag: '🇬🇧' },
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
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => switchLanguage(lang.code)}
          className={currentLang === lang.code ? 'active' : ''}
          aria-label={`Switch to ${lang.name}`}
        >
          <span className="flag">{lang.flag}</span>
          <span className="code">{lang.name}</span>
        </button>
      ))}
    </div>
  );
}
