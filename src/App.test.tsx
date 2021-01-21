import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Register Courses/i);
  expect(linkElement).toBeInTheDocument();
  expect(screen.getByText('Welcome, hope you\'ve had a great time!')).toBeInTheDocument();
});

test('redirects if user is already logged in', () => {
  window.localStorage.setItem('token', 'tokenstring');
  render(<App />);
  expect(screen.getByText(/Search student here/i)).toBeInTheDocument();
  window.localStorage.removeItem('token');
});
