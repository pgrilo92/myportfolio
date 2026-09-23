import React, { useEffect, useRef, useState } from 'react';
import landscape from '../../images/risky-run-landscape.png';
import runner from '../../images/risky-run-character.png';
import './EngineeringStory.css';

export const engineeringSteps = [
  { title: 'Web experiences', label: '01 / BUILD', copy: 'Interfaces, application logic, and APIs—bringing the pieces together into a working product.' },
  { title: 'Practical AI', label: '02 / CONNECT', copy: 'Choosing tools, connecting a workflow, and keeping a person in control of the result.' },
  { title: 'Interactive worlds', label: '03 / PLAY', copy: 'Games are part of my development story too. Here’s a little motion study using my original Risky Run artwork.' }
];
export function stageFromScroll(top, height, viewport) {
  const distance = Math.max(1, height - viewport);
  return Math.min(2, Math.max(0, Math.floor((-top / distance) * 3)));
}

export default function EngineeringStory({ motion }) {
  const [stage, setStage] = useState(0);
  const section = useRef(null);
  useEffect(() => {
    if (!motion) return;
    let frame = 0;
    const draw = () => {
      frame = 0;
      if (!section.current || window.innerWidth < 901) return;
      const rect = section.current.getBoundingClientRect();
      setStage(stageFromScroll(rect.top, rect.height, window.innerHeight));
    };
    const schedule = () => { if (!frame) frame = window.requestAnimationFrame(draw); };
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, [motion]);

  return <section id="engineering" ref={section} className="engineering-story" aria-labelledby="engineering-title">
    <div className="engineering-sticky">
      <div className="engineering-top"><span className="eyebrow">FROM INTERFACE TO INTERACTION</span><span className="engineering-hint">SCROLL TO EXPLORE / OR CHOOSE A CHAPTER</span></div>
      <div className="engineering-layout">
        <div className="engineering-copy"><h2 id="engineering-title">DIFFERENT TOOLS.<br />SAME <em>CURIOSITY.</em></h2><p>I enjoy the engineering behind what you see: how a page responds, how a workflow connects, how a game feels.</p>
          <div className="engineering-controls" aria-label="Explore engineering chapters">{engineeringSteps.map((step, i) => <button key={step.title} aria-pressed={stage === i} aria-controls="engineering-detail" onClick={() => setStage(i)}><span>{step.label}</span>{step.title}<span aria-hidden="true">↗</span></button>)}</div>
          <div id="engineering-detail" className="engineering-detail"><h3>{engineeringSteps[stage].title}</h3><p>{engineeringSteps[stage].copy}</p></div>
        </div>
        <div className={`laptop-scene stage-${stage}`} aria-hidden="true">
          <div className="laptop-display"><div className="laptop-camera" /><div className="laptop-screen">
            <div className="screen-chrome"><span>● ● ●</span><span>joaquim / creative engineering</span><span>↗</span></div>
            <div className={`screen-world web-world ${stage === 0 ? 'active' : ''}`}><div className="demo-nav">JG / DIGITAL STUDIO <span>WORK +</span></div><div className="demo-web"><div><small>AN IDEA, TAKING SHAPE</small><strong>HELLO,<br />POSSIBILITY.</strong><span className="demo-cta">LET’S MAKE IT ↗</span></div><div className="demo-sculpture">✳</div></div><div className="demo-code"><span>interface</span><span>logic</span><span>experience</span></div></div>
            <div className={`screen-world ai-world ${stage === 1 ? 'active' : ''}`}><small>WORKFLOW SKETCH / HUMAN IN THE LOOP</small><h3>A little help.<br />A better workflow.</h3><div className="workflow"><span>YOUR INPUT</span><i /><span className="ai-node">AI ASSIST</span><i /><span>YOUR REVIEW</span></div><div className="workflow-lines"><b /><b /><b /></div><p>Define the task. Connect the tools. Review the result.</p></div>
            <div className={`screen-world game-world ${stage === 2 ? 'active' : ''}`}><div className="game-landscape" style={{backgroundImage:`url("${landscape}")`}} /><div className="game-hud"><span>RISKY RUN</span><span>ARTWORK IN MOTION</span></div><img className="game-runner" src={runner} alt="" /><div className="game-dust"><i /><i /><i /></div><div className="game-ground" /><span className="game-demo-caption">ORIGINAL GAME ART / MOTION STUDY</span></div>
          </div></div><div className="laptop-base"><span /></div><div className="laptop-shadow" /><span className="laptop-footnote">A LOOK AT HOW I THINK & BUILD</span>
        </div>
      </div>
    </div>
  </section>;
}
