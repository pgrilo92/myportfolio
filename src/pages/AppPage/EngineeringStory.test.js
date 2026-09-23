import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import EngineeringStory, { stageFromScroll } from './EngineeringStory';

test('scroll chapters remain bounded before and after the story', () => {
  expect(stageFromScroll(200, 2300, 1000)).toBe(0);
  expect(stageFromScroll(-600, 2300, 1000)).toBe(1);
  expect(stageFromScroll(-1200, 2300, 1000)).toBe(2);
  expect(stageFromScroll(-9000, 2300, 1000)).toBe(2);
});
test('every chapter is available without scrolling or animation', () => {
  const { getByRole, container } = render(<EngineeringStory motion={false} />);
  fireEvent.click(getByRole('button', { name: /Interactive worlds/ }));
  expect(container.querySelector('.game-world')).toHaveClass('active');
  expect(container.querySelector('#engineering-detail')).toHaveTextContent('Risky Run');
  fireEvent.click(getByRole('button', { name: /Practical AI/ }));
  expect(container.querySelector('.ai-world')).toHaveClass('active');
  expect(container.querySelector('.game-world')).not.toHaveClass('active');
});
