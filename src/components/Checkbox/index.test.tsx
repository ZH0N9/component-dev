import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Checkbox from '.';

describe('Checkbox Component',()=>{
    test('Render the Component', ()=>{
        render(<Checkbox>Checkbox</Checkbox>);
        expect(screen.getByText(/Checkbox/)).toBeInTheDocument();
    });
})