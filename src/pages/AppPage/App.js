import React, { useCallback, useEffect, useRef, useState } from 'react';
import './App.css';
import EngineeringStory from './EngineeringStory';
import ContactDialog, { CONTACT_EMAIL } from './ContactDialog';
import { getScrollMotion } from './scrollMotion';
import alpha from '../../images/alpha-blog.png';
import photo from '../../images/photo-app.png';
import coaches from '../../images/blackcoaches.png';
import codex from '../../images/codex.png';
import portrait from '../../images/IMG_0060.jpg';
import sundaymossWebsite from '../../images/sundaymoss-website.png';
import debotiesArtwork from '../../images/dancing-deboties.png';
import pyramidArtwork from '../../images/pyramid-runner.png';
const projects = [{
  name: 'Black Coaches',
  type: 'Web',
  detail: 'A website for a European tour bus company, presenting its services online.',
  image: coaches,
  tech: 'Business website',
  url: 'https://blackcoaches.co.uk/'
}, {
  name: 'Codexperience',
  type: 'Web',
  detail: 'Contributed API development to a software company’s website.',
  image: codex,
  tech: 'API development',
  url: 'https://codexperience.io/en'
}, {
  name: 'Alpha Blog',
  type: 'Web',
  detail: 'A Ruby on Rails blog with user accounts, publishing, and comments.',
  image: alpha,
  tech: 'Ruby on Rails',
  url: 'https://alpha-blog-joaquim.herokuapp.com/'
}, {
  name: 'Photo App',
  type: 'Web',
  detail: 'A photo-sharing application with cloud uploads, monthly subscriptions, and Stripe payments.',
  image: photo,
  tech: 'Cloud storage · Stripe',
  url: 'https://joaquim-photo-app2.herokuapp.com/'
}, {
  name: 'Dancing Deboties',
  image: debotiesArtwork,
  alt: 'Dancing Deboties game artwork with three colourful characters and musical notes',
  type: 'Games',
  detail: 'An independent game I developed in Unity and released on the App Store.',
  tech: 'Unity · C# · iOS',
  url: 'https://www.youtube.com/watch?v=JR6h-fFCQIc',
  symbol: '✳'
}, {
  name: 'Risky Run',
  image: pyramidArtwork,
  alt: 'Black-haired game character running in front of golden pyramids',
  type: 'Games',
  detail: 'A game I developed with GameSalad, exploring character movement and interactive play.',
  tech: 'GameSalad',
  url: 'https://www.youtube.com/watch?v=0HbtJJNirhE',
  symbol: '△'
}];

const Arrow = () => <span aria-hidden="true">↗</span>;

function App() {
  const [filter, setFilter] = useState('All');
  const [motion, setMotion] = useState(() => !window.matchMedia || !window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [menu, setMenu] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const root = useRef(null);
  const openContact = () => setContactOpen(true);
  const closeContact = useCallback(() => setContactOpen(false), []);
  useEffect(() => {
    const previous = document.documentElement.style.scrollBehavior;
    if (!motion) document.documentElement.style.scrollBehavior = 'auto';
    return () => {
      document.documentElement.style.scrollBehavior = previous;
    };
  }, [motion]);
  useEffect(() => {
    const media = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)');

    const update = () => setMotion(!media.matches);

    if (media && media.addEventListener) media.addEventListener('change', update);
    return () => {
      if (media && media.removeEventListener) media.removeEventListener('change', update);
    };
  }, []);
  useEffect(() => {
    const target = window.location.hash ? null : window.location.pathname === '/portfolio' ? 'work' : window.location.pathname === '/about' ? 'about' : null;
    if (target) document.getElementById(target).scrollIntoView();
  }, []);
  useEffect(() => {
    if (!motion || !window.IntersectionObserver) return;
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    }), {
      threshold: 0.08
    });
    root.current.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [motion, filter]);

  // Scroll-linked transforms use one scheduled frame; native scrolling stays intact.
  useEffect(() => {
    if (!motion) return;
    let frame = 0;
    const page = root.current;
    const draw = () => {
      frame = 0;
      if (!page) return;
      const culture = document.getElementById('culture');
      const values = getScrollMotion(window.scrollY, document.documentElement.scrollHeight, window.innerHeight, culture ? culture.getBoundingClientRect().top : 0);
      Object.keys(values).forEach(key => page.style.setProperty(key, values[key]));
    };
    const schedule = () => { if (!frame) frame = window.requestAnimationFrame(draw); };
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    schedule();
    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      window.cancelAnimationFrame(frame);
      ['--page-progress', '--hero-shift', '--record-turn', '--culture-shift'].forEach(key => page && page.style.removeProperty(key));
    };
  }, [motion, filter]);

  // The record idles slowly; hovering or tapping it speeds the same animation up without a jump.
  const spinRecord = rate => e => {
    const vinyl = e.currentTarget.querySelector('.vinyl');
    if (!motion || !vinyl || !vinyl.getAnimations) return;
    vinyl.getAnimations().forEach(animation => animation.updatePlaybackRate(rate));
  };

  // The closing call-to-action leans a little toward the cursor.
  const magnet = e => {
    if (!motion || e.pointerType === 'touch') return;
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${((e.clientX - rect.left) / rect.width - 0.5) * 24}px`);
    e.currentTarget.style.setProperty('--my', `${((e.clientY - rect.top) / rect.height - 0.5) * 16}px`);
  };
  const releaseMagnet = e => {
    e.currentTarget.style.removeProperty('--mx');
    e.currentTarget.style.removeProperty('--my');
  };

  const pointer = e => {
    if (!motion || e.pointerType === 'touch') return;
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--px', `${(e.clientX - rect.left) / rect.width * 100}%`);
    e.currentTarget.style.setProperty('--py', `${(e.clientY - rect.top) / rect.height * 100}%`);
  };

  return <div ref={root} className={`portfolio ${motion ? 'motion-on' : 'motion-off'}`}>
    <div className="reading-progress" aria-hidden="true" /><a className="skip-link" href="#main">Skip to content</a>
    <header className="site-header" onKeyDown={e => {
      if (e.key === 'Escape') setMenu(false);
    }}>
      <a className="wordmark" href="/" aria-label="Joaquim Grilo home">JG<span aria-hidden="true">↗</span></a>
      <button className="menu-toggle" aria-expanded={menu} aria-controls="navigation" onClick={() => setMenu(!menu)}>{menu ? 'Close −' : 'Menu +'}</button>
      <nav id="navigation" className={menu ? 'is-open' : ''} aria-label="Main navigation">
        <a href="#work" onClick={() => setMenu(false)}>Selected work</a><a href="#expertise" onClick={() => setMenu(false)}>Expertise</a><a href="#about" onClick={() => setMenu(false)}>About</a>
      </nav>
      <button className="header-contact contact-trigger" type="button" onClick={openContact}>Let’s talk <Arrow /></button>
    </header>
    <main id="main">
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-top"><span className="eyebrow">JOAQUIM GRILO / DEVELOPER & AI SPECIALIST</span><span className="location"><i /> TORONTO, CA</span></div>
        <div className="hero-headline"><h1 id="hero-title"><span>BUILT WITH</span><span className="headline-second">INTENT<span className="headline-dot">.</span></span></h1><span className="hero-edition">PORTFOLIO<br />VOL. 01 / 2026</span></div>
        <div className="hero-lower"><div className="hero-description"><span className="eyebrow">WEB DEVELOPMENT & PRACTICAL AI</span><p>I build websites and applications, connect tools, and help people put AI to work. Based in Toronto, with a hands-on role at Sundaymoss.</p><a className="button button-light" href="#work">THE WORK <span aria-hidden="true">↘</span></a></div>
          <div className="record-art" aria-hidden="true" onPointerEnter={spinRecord(4)} onPointerLeave={spinRecord(1)}><div className="vinyl"><div className="record-label"><span>JG / SIDE A</span><strong>MAKE<br />IT REAL.</strong><span>CODE • CULTURE • CURIOSITY</span></div></div><span className="record-sticker">HIGH<br />ENERGY<br />↗</span><div className="record-caption">OFF THE CLOCK / MUSIC IN THE MIX</div></div>
          <div className="hero-note"><span className="asterisk" aria-hidden="true">✳</span><p>WEB & APPS.<br />AI WORKFLOWS.<br />INDEPENDENT GAMES.</p><a href="#culture">OFF THE CLOCK ↘</a></div>
        </div>
        <div className="hero-bottom"><span>WEB DEVELOPMENT / AI / SUNDAYMOSS</span><a href="#now">KEEP SCROLLING <span aria-hidden="true">↓</span></a></div>
      </section>
      <section className="now-section section-pad" id="now">
        <div className="section-marker"><span>01 / CURRENT WORK</span><span className="status"><i /> Sundaymoss</span></div>
        <div className="sunday-feature" data-reveal>
          <figure className="sunday-art sunday-website"><div className="sunday-preview-bar"><span aria-hidden="true">● ● ●</span><span>SUNDAYMOSS / WEBSITE</span></div><img src={sundaymossWebsite} alt="Sundaymoss website with its forest-green logo, cream and gold branding, and colourful sea moss jars" loading="lazy" /><figcaption>WEB DEVELOPMENT / SUNDAYMOSS</figcaption></figure>
          <div className="sunday-copy"><span className="eyebrow">SUNDAYMOSS / MY CURRENT FOCUS</span><h2>HELPING A BRAND<br /><em>MOVE FORWARD.</em></h2><p>I’m a core part of the Sundaymoss team, working across web development and day-to-day business operations.</p><p>My role extends beyond the website: translating business needs into practical improvements, solving technical problems, and supporting the work that keeps the brand moving.</p><div className="tags"><span>Web development</span><span>Business operations</span><span>Technical problem-solving</span></div><button className="text-link contact-trigger" type="button" onClick={openContact}>Ask me about my role <Arrow /></button></div>
        </div>
      </section>
      <section className="expertise section-pad" id="expertise">
        <div className="section-marker"><span>02 / HOW I CAN HELP</span><span>DEVELOPMENT / INTEGRATION / SUPPORT</span></div>
        <div className="section-heading" data-reveal><h2>FROM THE IDEA<br /><em>TO THE DETAILS.</em></h2><p>A new website, an app, or a better way to work—I start with the problem and build around what people actually need.</p></div>
        <div className="expertise-grid">
          {[['01', '↗', 'Websites & applications', 'Frontend development, application logic, and API integrations. I bring these pieces together to build websites and apps that are clear and easy to use.', ['Web development', 'React & JavaScript', 'APIs & integrations']], ['02', '✳', 'AI setup & workflows', 'I help choose and configure AI tools, shape useful workflows, and connect them to everyday tasks—with clear instructions and human review.', ['AI setup', 'Workflow design', 'Tool integration']], ['03', '⌘', 'Technical collaboration', 'I work alongside people building a business, turning requirements into technical decisions and helping with improvements as their needs evolve.', ['Technical problem-solving', 'Business mindset', 'Ongoing collaboration']]].map(([n, icon, title, copy, tags]) => <article className="expertise-card" data-reveal key={n} onPointerMove={pointer}><div className="card-top"><span>{n}</span><span className="expertise-icon" aria-hidden="true">{icon}</span></div><h3>{title}</h3><p>{copy}</p><ul>{tags.map(tag => <li key={tag}>{tag}</li>)}</ul></article>)}
        </div>
      </section>
      <EngineeringStory motion={motion} />
      <section className="work section-pad" id="work">
        <div className="section-marker"><span>03 / SELECTED WORK</span><span>WEBSITES / APPLICATIONS / GAMES</span></div>
        <div className="work-heading"><h2>SELECTED<br /><em>PROJECTS.</em></h2><div className="filters" aria-label="Filter projects">{['All', 'Web', 'Games'].map(item => <button key={item} aria-pressed={filter === item} onClick={() => setFilter(item)}>{item}{item === 'All' && <span>06</span>}</button>)}</div></div>
        <div className="project-grid" aria-live="polite">{projects.filter(p => filter === 'All' || p.type === filter).map((p, i) => <article className="project" key={p.name} style={{ '--card-index': i }} data-reveal><a href={p.url} target="_blank" rel="noopener noreferrer" className={`project-visual ${p.symbol ? 'game-visual game-' + i : ''}`} aria-label={`${p.symbol ? 'Watch' : 'Visit'} ${p.name} (opens in new tab)`}>{p.image ? <img src={p.image} alt={p.alt || `${p.name} website preview`} loading="lazy" /> : <><span className="game-symbol" aria-hidden="true">{p.symbol}</span><span className="game-caption">{p.name}</span><span className="play-label">▶ WATCH THE GAME</span></>}<span className="project-arrow"><Arrow /></span></a><div className="project-info"><span className="project-number">0{i + 1} / {p.type.toUpperCase()}</span><div className="project-title"><h3>{p.name}</h3><span>{p.tech}</span></div><p>{p.detail}</p><a className="text-link" href={p.url} target="_blank" rel="noopener noreferrer">{p.symbol ? 'WATCH THE GAME' : 'VIEW PROJECT'} <Arrow /></a></div></article>)}</div>
        <p className="archive-note">A selection from the archive. Some original websites may no longer be active.</p>
      </section>
      <section className="culture section-pad" id="culture" aria-labelledby="culture-title">
        <div className="section-marker"><span>04 / OFF THE CLOCK</span><span>FITNESS / ART / MUSIC</span></div>
        <div className="culture-heading"><h2 id="culture-title">MORE THAN<br /><em>WHAT I BUILD.</em></h2><p>Training keeps me grounded.<br />Art keeps me curious.<br />Music keeps me moving.</p></div>
        <div className="culture-grid">
          <article className="culture-card training-card" data-reveal><span className="eyebrow">01 / DISCIPLINE</span><div className="training-art" aria-hidden="true"><span /><span /><span /><span /><span /></div><h3>PUT IN<br />THE REPS.</h3><p>Training is a regular part of my life. I enjoy the focus and consistency it asks of me.</p><span className="culture-tag">TRAINING / EVERYDAY ENERGY</span></article>
          <article className="culture-card art-card" data-reveal><span className="eyebrow">02 / PERSPECTIVE</span><div className="art-composition" aria-hidden="true"><span /><span /><span /></div><h3>KEEP YOUR<br />EYES OPEN.</h3><p>I’m drawn to art, design, and the details that make something feel distinctive.</p><span className="culture-tag">ART / DESIGN / CURIOSITY</span></article>
          <article className="culture-card music-card" data-reveal><span className="eyebrow">03 / RHYTHM</span><div className="equalizer" aria-hidden="true">{[4,8,6,10,3,7,5,9,4,8,6,3].map((height,i) => <span key={i} style={{height:height*12,animationDelay:`${i * -.13}s`}} />)}</div><h3>LIFE HAS<br />A SOUNDTRACK.</h3><p>Rap is a favourite, but my listening goes well beyond one genre. Music is part of my everyday life.</p><span className="culture-tag">RAP / MUSIC / REPEAT</span></article>
        </div>
        <a className="culture-link" href="https://www.instagram.com/joaquimpatrick/" target="_blank" rel="noopener noreferrer">MORE OF MY WORLD <span>@joaquimpatrick ↗</span></a>
      </section>
      <section className="about section-pad" id="about"><div className="section-marker"><span>05 / BEHIND THE WORK</span><span>JOAQUIM GRILO / TORONTO</span></div><div className="about-grid" data-reveal><div className="portrait-wrap"><img src={portrait} alt="Joaquim Grilo" loading="lazy" /><span>JOAQUIM GRILO / TORONTO</span></div><div className="about-copy"><h2>A LITTLE<br /><em>ABOUT ME.</em></h2><p className="intro">I’m Joaquim, a developer and AI specialist with an entrepreneurial background.</p><p>I started by building an app for MaMadeIt, my home-cooked meal delivery startup. Since then, I’ve worked across web applications, independent games, and experiments with augmented reality.</p><p>Today, I focus on web development, practical AI setups, and my work at Sundaymoss. I enjoy understanding how a business works as much as figuring out the technology behind it.</p><a className="text-link" href="https://github.com/pgrilo92" target="_blank" rel="noopener noreferrer">Explore my GitHub <Arrow /></a></div></div></section>
      <section className="contact section-pad" id="contact"><span className="eyebrow">NEED A WEBSITE, AN AI WORKFLOW, OR A TECHNICAL PARTNER?</span><button type="button" onClick={openContact} onPointerMove={magnet} onPointerLeave={releaseMagnet} className="contact-title contact-trigger">GOT AN IDEA?<br /><em>LET’S BUILD.</em><Arrow /></button><div className="contact-bottom"><a className="contact-trigger" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL} <Arrow /></a><span>Web development · AI setups · Collaboration</span></div></section>
    </main>
    <footer><span>© {new Date().getFullYear()} Joaquim Grilo</span><div><a href="https://www.instagram.com/joaquimpatrick/" target="_blank" rel="noopener noreferrer">Instagram <Arrow /></a><a href="https://linkedin.com/in/joaquim-grilo" target="_blank" rel="noopener noreferrer">LinkedIn <Arrow /></a><a href="https://github.com/pgrilo92" target="_blank" rel="noopener noreferrer">GitHub <Arrow /></a><button onClick={() => setMotion(!motion)} aria-pressed={motion}>Motion {motion ? 'on' : 'off'}</button><a href="#main">Back to top ↑</a></div></footer>
    <ContactDialog open={contactOpen} onClose={closeContact} />
  </div>;
}

export default App;
