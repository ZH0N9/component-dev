import { Icon } from ".";
import { prefixClass } from "./constants";
import { fireEvent, render, screen } from '@testing-library/react';

describe('Icon Component', ()=>{
    test('Render the Icon',()=>{
        render(<Icon name='close'/>);
        expect(screen.getByRole('img')).toBeInTheDocument();
    });
    test('Render the Spinning Icon',()=>{
        const {container} = render(<Icon name="close" spin/>);
        expect(container.querySelector(`.${prefixClass}-spin`)).toBeInTheDocument();
    })
    test('Check Icon Click Event',()=>{
        const mockClick = jest.fn();
        render(<Icon name='close' onClick={mockClick}/>);
        fireEvent.click(screen.getByRole('img'));
        expect(mockClick).toBeCalled();
    })
});