import React, { useEffect, useRef, useState } from 'react';
import './ContactDialog.css';

const CONTACT_EMAIL = 'pgrilo92@hotmail.com';

export function buildOutlookUrl({ name, email, subject, message }) {
  const body = `${message}\n\nFrom: ${name}\nReply to: ${email}`;
  const params = new URLSearchParams({
    to: CONTACT_EMAIL,
    subject: subject || 'Portfolio enquiry',
    body
  });
  return `https://outlook.live.com/mail/0/deeplink/compose?${params.toString()}`;
}

export default function ContactDialog({ open, onClose }) {
  const nameInput = useRef(null);
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (!open) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.requestAnimationFrame(() => nameInput.current && nameInput.current.focus());
    const closeOnEscape = event => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [open, onClose]);

  if (!open) return null;

  const openDraft = event => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget).entries());
    window.open(buildOutlookUrl(data), '_blank', 'noopener,noreferrer');
    setStatus('Your Outlook draft opened in a new tab. Review it, then press Send.');
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setStatus('Email address copied.');
    } catch (error) {
      setStatus(`Copy this address: ${CONTACT_EMAIL}`);
    }
  };

  return <div className="contact-modal" role="presentation" onMouseDown={event => {
    if (event.target === event.currentTarget) onClose();
  }}>
    <section className="contact-dialog" role="dialog" aria-modal="true" aria-labelledby="contact-dialog-title">
      <div className="contact-dialog-top">
        <span>CONTACT / START A CONVERSATION</span>
        <button type="button" onClick={onClose} aria-label="Close contact form">Close ×</button>
      </div>
      <div className="contact-dialog-grid">
        <div className="contact-dialog-intro">
          <span className="contact-dialog-mark" aria-hidden="true">↗</span>
          <h2 id="contact-dialog-title">TELL ME WHAT<br />YOU’RE <em>BUILDING.</em></h2>
          <p>Share a few details and I’ll get back to you. Submitting opens a ready-to-send Outlook draft, so you can review the message before it leaves your account.</p>
          <button className="copy-email" type="button" onClick={copyEmail}>Copy {CONTACT_EMAIL}</button>
        </div>
        <form className="contact-form" onSubmit={openDraft}>
          <label>Name<input ref={nameInput} name="name" autoComplete="name" required /></label>
          <label>Your email<input name="email" type="email" autoComplete="email" required /></label>
          <label>Subject<input name="subject" defaultValue="Portfolio enquiry" required /></label>
          <label>Message<textarea name="message" rows="5" placeholder="A little about your project, goal, or question…" required /></label>
          <button className="contact-submit" type="submit">Open email draft <span aria-hidden="true">↗</span></button>
          <p className="contact-status" aria-live="polite">{status}</p>
        </form>
      </div>
    </section>
  </div>;
}
