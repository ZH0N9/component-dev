import type { Meta, StoryObj } from '@storybook/react';

import Button from './index';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Button> = {
  title: 'Example/Button',
  component: Button,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    size: {
      options: ['large', 'medium', 'small'],
      control: { type: 'radio' },
    },
    loading: {
      control: { type: 'boolean' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
    block: {
      control: { type: 'boolean' },
    },
  },
  decorators: [
    (Story) => {
      return (
        <div style={{ margin: '1em' }}>
          <Story />
        </div>
      );
    },
  ],
};

export default meta;
type Story = StoryObj<typeof Button>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args

export const Basic: Story = {
  render: () => {
    return (
      <div style={{ display: 'flex', gap: '8px' }}>
        <Button type="primary">Primary</Button>
        <Button type="normal">Normal</Button>
        <Button type="dashed">Dashed</Button>
        <Button type="text">Text</Button>
      </div>
    );
  },
};
export const Size: Story = {
  args: {
    size: 'medium',
  },
  render: () => {
    return (
      <div style={{ display: 'flex', gap: '8px' }}>
        <Button type="primary">Primary</Button>
        <Button type="normal">Normal</Button>
        <Button type="dashed">Dashed</Button>
        <Button type="text">Text</Button>
      </div>
    );
  },
};
