// Custom SVG icons matching site palette

export function SearchIcon({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="searchGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#667eea" />
          <stop offset="100%" stopColor="#764ba2" />
        </linearGradient>
      </defs>
      <circle cx="26" cy="26" r="18" stroke="url(#searchGrad)" strokeWidth="3" fill="none"/>
      <path d="M39 39L54 54" stroke="url(#searchGrad)" strokeWidth="3" strokeLinecap="round"/>
      <circle cx="26" cy="26" r="12" stroke="url(#searchGrad)" strokeWidth="2" opacity="0.5" fill="none"/>
    </svg>
  );
}

export function RobotIcon({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="robotGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>
      <rect x="16" y="24" width="32" height="28" rx="4" stroke="url(#robotGrad)" strokeWidth="2.5" fill="none"/>
      <circle cx="28" cy="36" r="3" fill="url(#robotGrad)"/>
      <circle cx="36" cy="36" r="3" fill="url(#robotGrad)"/>
      <path d="M26 44 H38" stroke="url(#robotGrad)" strokeWidth="2.5" strokeLinecap="round"/>
      <circle cx="32" cy="16" r="4" stroke="url(#robotGrad)" strokeWidth="2.5" fill="none"/>
      <path d="M32 20 V24" stroke="url(#robotGrad)" strokeWidth="2.5"/>
      <path d="M12 32 H16" stroke="url(#robotGrad)" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M48 32 H52" stroke="url(#robotGrad)" strokeWidth="2.5" strokeLinecap="round"/>
    </svg>
  );
}

export function GraduationIcon({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="gradGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
      </defs>
      <path d="M32 16 L8 28 L32 40 L56 28 L32 16Z" stroke="url(#gradGrad)" strokeWidth="2.5" strokeLinejoin="round" fill="none"/>
      <path d="M16 32 V42 L32 50 L48 42 V32" stroke="url(#gradGrad)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <path d="M56 28 V40" stroke="url(#gradGrad)" strokeWidth="2.5" strokeLinecap="round"/>
    </svg>
  );
}

export function HandshakeIcon({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="handGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#ec4899" />
        </linearGradient>
      </defs>
      <path d="M12 32 L22 22 L28 28 L32 24 L42 34" stroke="url(#handGrad)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <path d="M32 24 L38 18 L48 28 L52 32" stroke="url(#handGrad)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <circle cx="18" cy="26" r="4" stroke="url(#handGrad)" strokeWidth="2" fill="none"/>
      <circle cx="46" cy="26" r="4" stroke="url(#handGrad)" strokeWidth="2" fill="none"/>
    </svg>
  );
}

export function LockIcon({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="lockGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
      </defs>
      <rect x="18" y="30" width="28" height="24" rx="3" stroke="url(#lockGrad)" strokeWidth="2.5" fill="none"/>
      <path d="M22 30 V22 A10 10 0 0 1 42 22 V30" stroke="url(#lockGrad)" strokeWidth="2.5" strokeLinecap="round"/>
      <circle cx="32" cy="42" r="3" fill="url(#lockGrad)"/>
      <path d="M32 45 V48" stroke="url(#lockGrad)" strokeWidth="2.5" strokeLinecap="round"/>
    </svg>
  );
}

export function PeopleIcon({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="peopleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#667eea" />
          <stop offset="100%" stopColor="#764ba2" />
        </linearGradient>
      </defs>
      <circle cx="24" cy="22" r="6" stroke="url(#peopleGrad)" strokeWidth="2.5" fill="none"/>
      <path d="M12 48 C12 38 36 38 36 48" stroke="url(#peopleGrad)" strokeWidth="2.5" strokeLinecap="round"/>
      <circle cx="42" cy="24" r="5" stroke="url(#peopleGrad)" strokeWidth="2" fill="none"/>
      <path d="M52 48 C52 40 38 42 38 42" stroke="url(#peopleGrad)" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

export function ClipboardIcon({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="clipGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
      </defs>
      <rect x="18" y="16" width="28" height="40" rx="3" stroke="url(#clipGrad)" strokeWidth="2.5" fill="none"/>
      <rect x="26" y="12" width="12" height="6" rx="2" stroke="url(#clipGrad)" strokeWidth="2" fill="none"/>
      <path d="M26 28 H38" stroke="url(#clipGrad)" strokeWidth="2" strokeLinecap="round"/>
      <path d="M26 36 H38" stroke="url(#clipGrad)" strokeWidth="2" strokeLinecap="round"/>
      <path d="M26 44 H34" stroke="url(#clipGrad)" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

// Language flag icons (replacing emojis)
export function PortugalIcon({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" fill="#006600"/>
      <rect x="2" y="2" width="8" height="20" fill="#FF0000"/>
      <circle cx="10" cy="12" r="3" stroke="#FFD700" strokeWidth="1.5" fill="none"/>
    </svg>
  );
}

export function FranceIcon({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="6.67" height="20" fill="#002395"/>
      <rect x="8.67" y="2" width="6.67" height="20" fill="#FFFFFF"/>
      <rect x="15.33" y="2" width="6.67" height="20" fill="#ED2939"/>
    </svg>
  );
}

export function UKIcon({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="20" height="20" fill="#012169"/>
      <path d="M2 2 L22 22 M22 2 L2 22" stroke="#FFFFFF" strokeWidth="3"/>
      <path d="M2 2 L22 22 M22 2 L2 22" stroke="#C8102E" strokeWidth="1.5"/>
      <path d="M12 2 V22 M2 12 H22" stroke="#FFFFFF" strokeWidth="4"/>
      <path d="M12 2 V22 M2 12 H22" stroke="#C8102E" strokeWidth="2.5"/>
    </svg>
  );
}
