import React, { useEffect, useRef, useState } from 'react';
import './ContactDialog.css';

export const CONTACT_EMAIL = 'pgrilo92@hotmail.com';
// Paste a Formspree (https://formspree.io/f/xxxx) or similar endpoint here to send
// messages directly. While empty, the form falls back to the visitor's mail app.
export const CONTACT_FORM_ENDPOINT = '';

export function buildMailtoUrl({ name, email, message }) {
  const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
  const body = encodeURIComponent(`${message}\n\nFrom: ${name}\nReply to: ${email}`);
  return `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
}

const prefersPointer = () => Boolean(window.matchMedia && window.matchMedia('(pointer: fine)').matches);

export default function ContactDialog({ open, onClose, endpoint = CONTACT_FORM_ENDPOINT }) {
  const nameInput = useRef(null);
  const [state, setState] = useState('idle');
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (!open) return undefined;
    setState('idle');
    setStatus('');
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    // On touch devices focusing immediately throws the keyboard over the form.
    if (prefersPointer()) window.requestAnimationFrame(() => nameInput.current && nameInput.current.focus());
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

  const submit = async event => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget).entries());
    if (!endpoint) {
      window.open(buildMailtoUrl(data), '_self');
      setStatus('Your mail app should open with the message ready — just press Send.');
      return;
    }
    setState('sending');
    setStatus('');
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...data, _replyto: data.email, _subject: `Portfolio enquiry from ${data.name}` })
      });
      if (!response.ok) throw new Error(`Request failed: ${response.status}`);
      setState('sent');
    } catch (error) {
      setState('idle');
      setStatus(`Something went wrong. Email me directly at ${CONTACT_EMAIL}.`);
    }
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
          <p>Share a few details and I’ll get back to you, usually within a day.</p>
          <div className="contact-direct">
            <a href={`mailto:${CONTACT_EMAIL}`}>Email me directly</a>
            <button className="copy-email" type="button" onClick={copyEmail}>Copy address</button>
          </div>
        </div>
        {state === 'sent' ? <div className="contact-sent" role="status">
          <span aria-hidden="true">✳</span>
          <h3>Message sent.</h3>
          <p>Thanks for reaching out. I’ll reply to your email soon.</p>
          <button className="contact-submit" type="button" onClick={onClose}>Back to the site <span aria-hidden="true">↗</span></button>
        </div> : <form className="contact-form" onSubmit={submit}>
          <label>Name<input ref={nameInput} name="name" autoComplete="name" enterkeyhint="next" required /></label>
          <label>Your email<input name="email" type="email" inputMode="email" autoComplete="email" autoCapitalize="off" enterkeyhint="next" required /></label>
          <label>Message<textarea name="message" rows="5" placeholder="A little about your project, goal, or question…" required /></label>
          <div className="contact-actions">
            <button className="contact-submit" type="submit" disabled={state === 'sending'}>
              {state === 'sending' ? 'Sending…' : 'Send message'} <span aria-hidden="true">↗</span>
            </button>
          </div>
          <p className="contact-status" aria-live="polite">{status}</p>
        </form>}
      </div>
    </section>
  </div>;
}
