import type { Meta, StoryObj } from '@storybook/react';
import { Icon } from './index';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Icon> = {
  title: 'Example/Button',
  component: Icon,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
  },
  decorators:[
    (Story)=> {
      return (
        <div style={{ margin: '1em' }}>
          <Story />
        </div>
      )
    },
  ],
};
export default meta;
type Story = StoryObj<typeof Icon>;