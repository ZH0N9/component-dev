import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Button from './components/Button';
import Icon from './components/Icon';
import Tag from './components/Tag';
import Radio from './components/Radio';
import Checkbox from './components/Checkbox';
import Input from './components/Input';
import Switch from './components/Switch';
import reportWebVitals from './reportWebVitals';
import { check } from 'prettier';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Switch
      loading
      defatultChecked={true}
      onChange={(checked, switcher) => {
        console.log(checked, switcher);
      }}
      unCheckedChildren={<span>1</span>}
      checkedChildren={<span>checked</span>}
    ></Switch>
    <br />
    <Input.Textarea
      placeholder="dd"
      showCount
      autoSize={{ minRows: 2, maxRows: 3 }}
      onResize={(obj) => {
        console.log(obj.width, obj.height);
      }}
      style={{ height: 78 }}
    ></Input.Textarea>
    <Input placeholder="dd" maxLength={10} prefix={<span>dd</span>} style={{ width: '100%', height: 40 }} />
    {/* {/* <Checkbox.Group
      defaultValue={['1', '2']}
      options={[
        { label: '1', value: '1' },
        { label: '2', value: '2' },
      ]}
    ></Checkbox.Group> */}
    <Checkbox.Group
      defaultValue={['3']}
      onChange={(checkedValues) => {
        console.log('checked values', checkedValues);
      }}
    >
      <div>
        <Checkbox value="3">3</Checkbox>
      </div>
      <Checkbox value="4">477</Checkbox>
    </Checkbox.Group>
    <Radio value="2">3</Radio>
    <Radio.Group
      defaultValue={'4'}
      options={[
        { value: '4', label: '4' },
        { value: '3', label: '3' },
      ]}
    ></Radio.Group>
    <Radio.Group
      optionAlign="vertical"
      name="radiogroup"
      defaultValue={'radio2'}
      onChange={(checkedValue) => {
        console.log(checkedValue);
      }}
    >
      <Radio defaultChecked={true} name="education" value="radio">
        Radio
      </Radio>
      <Radio defaultChecked={false} name="education" value="radio2">
        Radio2
      </Radio>
    </Radio.Group>
    {/* 
    <input type="radio" name="sex" value="B" />
    <input type="radio" name="sex" value="A" />
    <Button type="normal" disabled>
      <a href="www.baidu.com">dddd</a>
    </Button>
    <Radio
      disabled={true}
      defaultChecked={false}
      onChange={(e) => {
        console.log(e);
      }}
      name="education"
    >
      Radio
    </Radio>
    <Radio
      defaultChecked={false}
      onChange={(e) => {
        console.log(e);
      }}
      name="education"
    >
      Radio2
    </Radio>
    <Button type="primary" loading>
      ddd
    </Button>
    <Button type="text" disabled>
      ddd
    </Button>
    <Button type="dashed" disabled>
      ddd
    </Button>
    <div style={{ width: '100px' }}>
      <Button block>test</Button>
    </div>
    <Icon name="close" className="test-class" />
    <Icon name="loading" spin />
    <Tag color="#f50" icon={<Icon name="warning"></Icon>}>
      <div>dddd</div>
    </Tag>
    <Tag
      color="cyan"
      onClick={() => {
        console.log('d');
      }}
      closable
    >
      <div>dddd</div>
    </Tag> */}
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
