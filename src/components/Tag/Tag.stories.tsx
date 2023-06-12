import type { Meta, StoryObj } from '@storybook/react';
import { Tag } from './index';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Tag> = {
  title: 'Example/Tag',
  component: Tag,
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
type Story = StoryObj<typeof Tag>;
export const Basic: Story = {
  render: ()=> {
    return (
      <div style={{display: 'flex', gap:'8px'}}>
      </div>
    )
  }
};