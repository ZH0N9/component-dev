import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Radio from '.';

describe('Radio Component', () => {
  test('Render the Component', () => {
    render(<Radio>Radio</Radio>);
    expect(screen.getByText(/Radio/)).toBeInTheDocument();
  });
});
