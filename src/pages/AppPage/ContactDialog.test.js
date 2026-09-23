import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import ContactDialog, { buildOutlookUrl } from './ContactDialog';

test('builds a secure Outlook compose link with the complete message', () => {
  const url = new URL(buildOutlookUrl({
    name: 'Ada Lovelace',
    email: 'ada@example.com',
    subject: 'AI workflow',
    message: 'I would like to discuss a project.'
  }));
  expect(url.origin).toBe('https://outlook.live.com');
  expect(url.searchParams.get('to')).toBe('pgrilo92@hotmail.com');
  expect(url.searchParams.get('subject')).toBe('AI workflow');
  expect(url.searchParams.get('body')).toContain('Reply to: ada@example.com');
});

test('opens a prefilled draft and can close the contact dialog', () => {
  const onClose = jest.fn();
  const open = jest.spyOn(window, 'open').mockImplementation(() => null);
  const { getByLabelText, getByRole } = render(<ContactDialog open onClose={onClose} />);

  fireEvent.change(getByLabelText('Name'), { target: { value: 'Ada' } });
  fireEvent.change(getByLabelText('Your email'), { target: { value: 'ada@example.com' } });
  fireEvent.change(getByLabelText('Message'), { target: { value: 'Hello Joaquim' } });
  fireEvent.click(getByRole('button', { name: /Open email draft/ }));

  expect(open).toHaveBeenCalledWith(expect.stringContaining('to=pgrilo92%40hotmail.com'), '_blank', 'noopener,noreferrer');
  fireEvent.click(getByRole('button', { name: 'Close contact form' }));
  expect(onClose).toHaveBeenCalled();
  open.mockRestore();
});
