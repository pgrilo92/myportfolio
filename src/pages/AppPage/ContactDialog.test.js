import React from 'react';
import { fireEvent, render, wait } from '@testing-library/react';
import ContactDialog, { buildMailtoUrl } from './ContactDialog';

const fillForm = getByLabelText => {
  fireEvent.change(getByLabelText('Name'), { target: { value: 'Ada' } });
  fireEvent.change(getByLabelText('Your email'), { target: { value: 'ada@example.com' } });
  fireEvent.change(getByLabelText('Message'), { target: { value: 'Hello Joaquim' } });
};

test('builds a mailto link with the complete message', () => {
  const url = buildMailtoUrl({ name: 'Ada Lovelace', email: 'ada@example.com', message: 'I would like to discuss a project.' });
  expect(url.startsWith('mailto:pgrilo92@hotmail.com?')).toBe(true);
  const params = new URLSearchParams(url.split('?')[1]);
  expect(params.get('subject')).toBe('Portfolio enquiry from Ada Lovelace');
  expect(params.get('body')).toContain('Reply to: ada@example.com');
});

test('falls back to the mail app without an endpoint and can close', () => {
  const onClose = jest.fn();
  const open = jest.spyOn(window, 'open').mockImplementation(() => null);
  const { getByLabelText, getByRole } = render(<ContactDialog open onClose={onClose} endpoint="" />);

  fillForm(getByLabelText);
  fireEvent.click(getByRole('button', { name: /Send message/ }));

  expect(open).toHaveBeenCalledWith(expect.stringContaining('mailto:pgrilo92@hotmail.com'), '_self');
  fireEvent.click(getByRole('button', { name: 'Close contact form' }));
  expect(onClose).toHaveBeenCalled();
  open.mockRestore();
});

test('sends directly to the form endpoint and confirms', async () => {
  window.fetch = jest.fn(() => Promise.resolve({ ok: true }));
  const { getByLabelText, getByRole, findByText } = render(<ContactDialog open onClose={() => {}} endpoint="https://formspree.io/f/test" />);

  fillForm(getByLabelText);
  fireEvent.click(getByRole('button', { name: /Send message/ }));

  expect(await findByText('Message sent.')).toBeTruthy();
  const [url, options] = window.fetch.mock.calls[0];
  expect(url).toBe('https://formspree.io/f/test');
  expect(JSON.parse(options.body)).toMatchObject({ name: 'Ada', email: 'ada@example.com', message: 'Hello Joaquim' });
});

test('shows a fallback when the endpoint fails', async () => {
  window.fetch = jest.fn(() => Promise.resolve({ ok: false, status: 500 }));
  const { getByLabelText, getByRole, getByText } = render(<ContactDialog open onClose={() => {}} endpoint="https://formspree.io/f/test" />);

  fillForm(getByLabelText);
  fireEvent.click(getByRole('button', { name: /Send message/ }));

  await wait(() => expect(getByText(/Email me directly at pgrilo92@hotmail.com/)).toBeTruthy());
});
