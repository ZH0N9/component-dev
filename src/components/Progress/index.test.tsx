import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Progress from '.';

describe('Progress Component',()=>{
    test('Render the Component', ()=>{
        render(<Progress>Progress</Progress>);
        expect(screen.getByText(/Progress/)).toBeInTheDocument();
    });
})