import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import App from './App';
test('filters projects without losing the complete archive', () => {
  const {
    getByRole,
    getByText,
    queryByText
  } = render(<App />);
  fireEvent.click(getByRole('button', {
    name: 'Games'
  }));
  expect(getByText('Dancing Deboties', {
    selector: 'h3'
  })).toBeInTheDocument();
  expect(queryByText('Alpha Blog', {
    selector: 'h3'
  })).not.toBeInTheDocument();
  fireEvent.click(getByRole('button', {
    name: /All/
  }));
  expect(getByText('Alpha Blog', {
    selector: 'h3'
  })).toBeInTheDocument();
  expect(document.querySelectorAll('.project')).toHaveLength(6);
});
test('mobile navigation and motion controls are operable', () => {
  const {
    getByRole
  } = render(<App />);
  const menu = getByRole('button', {
    name: 'Menu +'
  });
  fireEvent.click(menu);
  expect(menu).toHaveAttribute('aria-expanded', 'true');
  fireEvent.click(getByRole('link', {
    name: 'Selected work'
  }));
  expect(menu).toHaveAttribute('aria-expanded', 'false');
  const motion = getByRole('button', {
    name: 'Motion on'
  });
  fireEvent.click(motion);
  expect(motion).toHaveAttribute('aria-pressed', 'false');
  expect(document.querySelector('.portfolio')).toHaveClass('motion-off');
});

test('opens and closes the contact form without navigating away', () => {
  const { getAllByRole, getByRole } = render(<App />);
  fireEvent.click(getAllByRole('button', { name: /Let’s talk/ })[0]);
  expect(getByRole('dialog', { name: /tell me what you’re building/i })).toBeInTheDocument();
  fireEvent.click(getByRole('button', { name: 'Close contact form' }));
  expect(document.querySelector('.contact-dialog')).not.toBeInTheDocument();
});
