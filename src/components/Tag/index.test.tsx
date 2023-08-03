import exp from 'constants';
import { Tag } from '.';
import { fireEvent, render, screen } from '@testing-library/react';

describe('Icon Component', () => {
  test('Render the Tag Component', () => {
    render(<Tag>Tag</Tag>);
    expect(screen.getByText(/Tag/)).toBeInTheDocument();
  });
  test('Check Tag Close Event', () => {
    const mockClose = jest.fn();
    const { container } = render(
      <Tag closable onClose={mockClose}>
        Closable
      </Tag>,
    );
    const closeEl = container.querySelector('svg');
    closeEl && fireEvent.click(closeEl);
    expect(mockClose).toBeCalled();
  });
});
