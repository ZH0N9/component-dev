import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Switch from '.';

describe('Switch Component',()=>{
    test('Render the Component', ()=>{
        render(<Switch>Switch</Switch>);
        expect(screen.getByText(/Switch/)).toBeInTheDocument();
    });
})