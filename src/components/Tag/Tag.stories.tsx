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
    const preventDefault = (e:any)=>{
      e.preventDefault();
    }
    return (
      <div style={{display: 'flex', gap:'8px'}}>
          <Tag>Tag</Tag>
          <Tag><a href="https://www.google.com.hk/">Link</a></Tag>
          <Tag closable>Closable</Tag>
          <Tag visible closable>Visible</Tag>
          <Tag closable onClose={preventDefault}>Prevent default</Tag>
      </div>
    )
  }
};
export const ColorTags : Story = {
  render: ()=>{
    const preSetColors = ['blue','cyan','green','red','orange','purple'];
    const customColors = ['#f50', '#2db7f5', '#87d068', '#108ee9']
    return (
      <div style={{display:'flex', flexDirection:'column', gap: '8px'}}>
        <div style={{fontWeight: 600, fontSize:'14px'}}>Presets:</div>
        <div style={{ display: 'flex', gap: '8px' }}>
          {preSetColors.map(color => {
            return <Tag color={color}>{color}</Tag>;
          })}
        </div>
        <hr/>
        <div style={{fontWeight: 600, fontSize:'14px'}}>Custom:</div>
        <div style={{ display: 'flex', gap: '8px' }}>
          {customColors.map(color => {
            return <Tag color={color}>{color}</Tag>;
          })}
        </div>
      </div>
    )
  }
}