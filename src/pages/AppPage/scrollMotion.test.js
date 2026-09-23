import { getScrollMotion } from './scrollMotion';
test('scroll effects are bounded at both ends and handle a non-scrolling page', () => {
  expect(getScrollMotion(-30, 5000, 800, 900)['--page-progress']).toBe('0');
  expect(getScrollMotion(9000, 5000, 800, -5000)).toEqual({
    '--page-progress': '1', '--hero-shift': '180px', '--record-turn': '180deg', '--culture-shift': '45px'
  });
  expect(getScrollMotion(0, 800, 800, 0)['--page-progress']).toBe('0');
});
