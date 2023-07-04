import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Input from '.';

describe('Input Component',()=>{
    test('Render the Component', ()=>{
        render(<Input>Input</Input>);
        expect(screen.getByText(/Input/)).toBeInTheDocument();
    });
})