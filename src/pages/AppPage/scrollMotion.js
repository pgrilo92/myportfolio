// Bounded values keep scroll effects stable at the page edges and on short pages.
export function getScrollMotion(scrollY, pageHeight, viewportHeight, cultureTop) {
  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
  return {
    '--page-progress': String(clamp(scrollY / Math.max(1, pageHeight - viewportHeight), 0, 1)),
    '--hero-shift': `${clamp(scrollY * 0.18, 0, 180)}px`,
    '--record-turn': `${clamp(scrollY * 0.12, 0, 180)}deg`,
    '--culture-shift': `${clamp((viewportHeight - cultureTop) * 0.035, 0, 45)}px`
  };
}
