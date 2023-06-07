import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { prefixClass, typeClassMap } from './constants';
import { Button } from '.';

describe('Button Component',()=>{
    test('Render the Button', ()=>{
        render(<Button>Button</Button>);
        expect(screen.getByText(/Button/)).toBeInTheDocument();
    });
    test('Render different types pf the Button', ()=>{
        const {container} = render(<>
            <Button type='primary'>Button</Button>
            <Button type='normal'>Button</Button>
            <Button type='dashed'>Button</Button>
            <Button type='text'>Button</Button>
        </>);
        for(const key in typeClassMap){
            expect(container.querySelector(`.${prefixClass}-${key}`)).toBeInTheDocument();
        };
    })
    test('Check Button Click Event',()=>{
        // mock on function
        const mockClick = jest.fn();
        render(<Button onClick={mockClick}>Button</Button>);
        fireEvent.click(screen.getByText(/Button/));
        expect(mockClick).toBeCalled();
    })
    test('Check Button Blur Event',()=>{
        const mockBlur = jest.fn();
        render(<Button onBlur={mockBlur}>Button</Button>);
        fireEvent.click(screen.getByText(/Button/));
        fireEvent.blur(screen.getByText(/Button/));
        expect(mockBlur).toBeCalled();
    })
})