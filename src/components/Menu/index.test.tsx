import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Menu from '.';

describe('Menu Component',()=>{
    test('Render the Component', ()=>{
        render(<Menu>Menu</Menu>);
        expect(screen.getByText(/Menu/)).toBeInTheDocument();
    });
})