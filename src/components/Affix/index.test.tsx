import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Affix from '.';

describe('Affix Component',()=>{
    test('Render the Component', ()=>{
        render(<Affix>Affix</Affix>);
        expect(screen.getByText(/Affix/)).toBeInTheDocument();
    });
})