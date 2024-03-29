import type { Meta, StoryObj } from '@storybook/react';

import Affix from './index';

const meta: Meta<typeof Affix> = {
  title: 'Example/Affix',
  component: Affix,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
  },
  decorators:[
    (Story)=> {
      const storyStyle = { margin: '1em' }
      return (
        <div style={storyStyle}>
          <Story />
        </div>
      )
    },
  ],
};

export default meta;
type Story = StoryObj<typeof Affix >;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args

export const Basic: Story = {
  render: ()=> {
    const wrapperStyle = {
        display: 'flex',
        gap:'8px'
    };
    return (
      <div style={wrapperStyle}>
      </div>
    )
  }
};
