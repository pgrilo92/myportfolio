'use client';
import Image from 'next/image';

export default function AboutSection({ t }) {
  return (
    <section id="about" className="about-section">
      <div className="section-content">
        <h2 className="section-title">{t.about.title}</h2>
        
        <div className="about-layout">
          <div className="about-photo-wrapper">
            <div className="about-photo">
              <Image 
                src="/images/joaquim-portrait.jpg"
                alt="Joaquim Grilo"
                width={400}
                height={400}
                className="profile-image"
                priority
              />
            </div>
          </div>
          
          <div className="about-content">
            <p>{t.about.bio1}</p>
            <p>{t.about.bio2}</p>
            <p>{t.about.bio3}</p>
            <p className="about-background">{t.about.background}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
