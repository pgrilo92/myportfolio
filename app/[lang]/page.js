import { getTranslation } from '@/lib/translations';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import BankingAssistantDemo from '@/components/BankingAssistantDemo';
import HeroAnimation from '@/components/HeroAnimation';
import AboutSection from '@/components/AboutSection';
import ScrollProgress from '@/components/ScrollProgress';
import AnimatedCard from '@/components/AnimatedCard';
import AnimatedSection from '@/components/AnimatedSection';
import StatsCounter from '@/components/StatsCounter';
import { SearchIcon, RobotIcon, GraduationIcon, HandshakeIcon, LockIcon, PeopleIcon, ClipboardIcon } from '@/components/Icons';

export default function LangPage({ params }) {
  const { lang } = params;
  const t = getTranslation(lang);
  
  const stats = [
    { value: 10, suffix: '+', label: lang === 'pt' ? 'Anos de Experiência' : lang === 'fr' ? 'Années d\'Expérience' : 'Years Experience' },
    { value: 50, suffix: '+', label: lang === 'pt' ? 'Projectos IA' : lang === 'fr' ? 'Projets IA' : 'AI Projects' },
    { value: 3, suffix: '', label: lang === 'pt' ? 'Idiomas' : lang === 'fr' ? 'Langues' : 'Languages' },
  ];

  return (
    <div className="page-container">
      <ScrollProgress />
      <header className="site-header">
        <nav className="nav-container">
          <div className="nav-brand">
            <h1 className="brand-name">Joaquim Grilo</h1>
            <p className="brand-tagline">{t.hero.subtitle}</p>
          </div>
          <div className="nav-menu">
            <a href={`#services`} className="nav-link">{t.nav.services}</a>
            <a href={`#cases`} className="nav-link">{t.nav.cases}</a>
            <a href={`#about`} className="nav-link">{t.nav.about}</a>
            <a href={`#contact`} className="nav-link">{t.nav.contact}</a>
          </div>
          <LanguageSwitcher currentLang={lang} />
        </nav>
      </header>

      <main>
        <section className="hero-section">
          <HeroAnimation />
          <div className="hero-content">
            <div className="hero-badge">{t.hero.subtitle}</div>
            <h1 className="hero-title">{t.hero.title}</h1>
            <p className="hero-description">{t.hero.description}</p>
            <p className="hero-location">{t.hero.location}</p>
            <a href="#contact" className="hero-cta">
              <span>{t.hero.cta}</span>
              <svg className="cta-arrow" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M4 10h12m0 0l-4-4m4 4l-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <div className="hero-stats">
              <StatsCounter stats={stats} />
            </div>
          </div>
        </section>

        <section id="services" className="services-section">
          <div className="section-content">
            <AnimatedSection animation="fade-up">
              <h2 className="section-title">{t.services.title}</h2>
              <p className="section-subtitle">{t.services.subtitle}</p>
            </AnimatedSection>
            
            <div className="services-grid">
              <AnimatedCard delay={0} className="service-card">
                <div className="card-glow"></div>
                <SearchIcon className="service-icon" />
                <h3>{t.services.audit.title}</h3>
                <p>{t.services.audit.description}</p>
              </AnimatedCard>
              
              <AnimatedCard delay={100} className="service-card">
                <div className="card-glow"></div>
                <RobotIcon className="service-icon" />
                <h3>{t.services.assistant.title}</h3>
                <p>{t.services.assistant.description}</p>
              </AnimatedCard>
              
              <AnimatedCard delay={200} className="service-card">
                <div className="card-glow"></div>
                <GraduationIcon className="service-icon" />
                <h3>{t.services.training.title}</h3>
                <p>{t.services.training.description}</p>
              </AnimatedCard>
              
              <AnimatedCard delay={300} className="service-card">
                <div className="card-glow"></div>
                <HandshakeIcon className="service-icon" />
                <h3>{t.services.partner.title}</h3>
                <p>{t.services.partner.description}</p>
              </AnimatedCard>
            </div>
          </div>
        </section>

        <section className="demo-section">
          <div className="section-content">
            <BankingAssistantDemo lang={lang} t={t} />
          </div>
        </section>

        <section id="cases" className="cases-section">
          <div className="section-content">
            <AnimatedSection animation="fade-up">
              <h2 className="section-title">{t.cases.title}</h2>
              <p className="section-subtitle">{t.cases.subtitle}</p>
            </AnimatedSection>
            
            <div className="cases-grid">
              <AnimatedCard delay={0} className="case-card">
                <h3>{t.cases.bank.title}</h3>
                <div className="case-section">
                  <h4>{lang === 'pt' ? 'Problema' : lang === 'fr' ? 'Problème' : 'Problem'}</h4>
                  <p>{t.cases.bank.problem}</p>
                </div>
                <div className="case-section">
                  <h4>{lang === 'pt' ? 'Solução' : lang === 'fr' ? 'Solution' : 'Build'}</h4>
                  <p>{t.cases.bank.build}</p>
                </div>
                <div className="case-section">
                  <h4>{lang === 'pt' ? 'Resultado' : lang === 'fr' ? 'Résultat' : 'Result'}</h4>
                  <p>{t.cases.bank.result}</p>
                </div>
                <div className="case-tech">
                  <strong>{lang === 'pt' ? 'Tecnologias:' : lang === 'fr' ? 'Technologies:' : 'Technologies:'}</strong> {t.cases.bank.tech}
                </div>
              </AnimatedCard>

              <AnimatedCard delay={150} className="case-card">
                <h3>{t.cases.learning.title}</h3>
                <div className="case-section">
                  <h4>{lang === 'pt' ? 'Problema' : lang === 'fr' ? 'Problème' : 'Problem'}</h4>
                  <p>{t.cases.learning.problem}</p>
                </div>
                <div className="case-section">
                  <h4>{lang === 'pt' ? 'Solução' : lang === 'fr' ? 'Solution' : 'Build'}</h4>
                  <p>{t.cases.learning.build}</p>
                </div>
                <div className="case-section">
                  <h4>{lang === 'pt' ? 'Resultado' : lang === 'fr' ? 'Résultat' : 'Result'}</h4>
                  <p>{t.cases.learning.result}</p>
                </div>
                <div className="case-tech">
                  <strong>{lang === 'pt' ? 'Tecnologias:' : lang === 'fr' ? 'Technologies:' : 'Technologies:'}</strong> {t.cases.learning.tech}
                </div>
              </AnimatedCard>

              <AnimatedCard delay={300} className="case-card">
                <h3>{t.cases.sundaymoss.title}</h3>
                <div className="case-section">
                  <h4>{lang === 'pt' ? 'Problema' : lang === 'fr' ? 'Problème' : 'Problem'}</h4>
                  <p>{t.cases.sundaymoss.problem}</p>
                </div>
                <div className="case-section">
                  <h4>{lang === 'pt' ? 'Solução' : lang === 'fr' ? 'Solution' : 'Build'}</h4>
                  <p>{t.cases.sundaymoss.build}</p>
                </div>
                <div className="case-section">
                  <h4>{lang === 'pt' ? 'Resultado' : lang === 'fr' ? 'Résultat' : 'Result'}</h4>
                  <p>{t.cases.sundaymoss.result}</p>
                </div>
                <div className="case-tech">
                  <strong>{lang === 'pt' ? 'Tecnologias:' : lang === 'fr' ? 'Technologies:' : 'Technologies:'}</strong> {t.cases.sundaymoss.tech}
                </div>
              </AnimatedCard>
            </div>
          </div>
        </section>

        <section className="for-banks-section">
          <div className="section-content">
            <AnimatedSection animation="fade-up">
              <h2 className="section-title">{t.forBanks.title}</h2>
              <p className="section-subtitle">{t.forBanks.subtitle}</p>
            </AnimatedSection>
            
            <div className="banks-grid">
              <AnimatedCard delay={0} className="bank-feature">
                <LockIcon className="feature-icon" />
                <h3>{t.forBanks.privacy.title}</h3>
                <p>{t.forBanks.privacy.description}</p>
              </AnimatedCard>
              
              <AnimatedCard delay={150} className="bank-feature">
                <PeopleIcon className="feature-icon" />
                <h3>{t.forBanks.human.title}</h3>
                <p>{t.forBanks.human.description}</p>
              </AnimatedCard>
              
              <AnimatedCard delay={300} className="bank-feature">
                <ClipboardIcon className="feature-icon" />
                <h3>{t.forBanks.audit.title}</h3>
                <p>{t.forBanks.audit.description}</p>
              </AnimatedCard>
            </div>
          </div>
        </section>

        <AboutSection t={t} />

        <section id="contact" className="contact-section">
          <div className="section-content">
            <h2 className="section-title">{t.contact.title}</h2>
            <p className="section-subtitle">{t.contact.description}</p>
            
            <div className="contact-info">
              <div className="contact-method">
                <div className="contact-icon-wrapper">
                  <svg className="contact-icon-svg" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="8" y="16" width="48" height="32" rx="4" stroke="url(#emailGrad)" strokeWidth="2.5" fill="none"/>
                    <path d="M8 20 L32 36 L56 20" stroke="url(#emailGrad)" strokeWidth="2.5" strokeLinejoin="round"/>
                    <defs>
                      <linearGradient id="emailGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="#8b5cf6" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <div>
                  <strong>{t.contact.email}</strong>
                  <a href="mailto:patrickgrillo11@gmail.com" className="contact-email">
                    patrickgrillo11@gmail.com
                  </a>
                </div>
              </div>
            </div>
            
            <a href="mailto:patrickgrillo11@gmail.com" className="contact-cta">
              {t.contact.cta}
            </a>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-content">
          <p>&copy; 2026 Joaquim Grilo. {lang === 'pt' ? 'Todos os direitos reservados.' : lang === 'fr' ? 'Tous droits réservés.' : 'All rights reserved.'}</p>
          <p className="footer-contact">patrickgrillo11@gmail.com</p>
        </div>
      </footer>
    </div>
  );
}
