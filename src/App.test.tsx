import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders without crashing', () => {
  const { baseElement, unmount } = render(<App />);
  expect( baseElement ).toBeDefined();
  unmount();
});