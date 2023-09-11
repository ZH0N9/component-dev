import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import Button from './components/Button';
// import Icon from './components/Icon';
// import Tag from './components/Tag';
import Radio from './components/Radio';
import Checkbox from './components/Checkbox';
import Input from './components/Input';
import Switch from './components/Switch';
import Affix from './components/Affix';
import Progress from './components/Progress';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <br />
    <br />
    <Progress percentage={30} strokeColor={'linear-gradient(#e66465, #9198e5)'} type="circle"></Progress>
    <Progress percentage={20} size={'small'} strokeColor={'linear-gradient(#e66465, #9198e5)'} type="circle"></Progress>
    <Progress percentage={50} size={'big'} strokeColor={'linear-gradient(#e66465, #9198e5)'} type="circle"></Progress>
    <Progress
      percentage={80}
      strokeColor={{ from: '#108ee9', to: '#87d068' }}
      success={{ percent: 30, strokeColor: 'red' }}
    ></Progress>
    <Progress percentage={80} strokeColor={{ from: '#108ee9', to: '#87d068' }} size={'small'}></Progress>
    <Progress percentage={80} strokeColor={{ from: '#108ee9', to: '#87d068' }} size={'big'}></Progress>
    <br />
    <br />
    <br />
    <br />
    <Affix offsetTop={30}>
      <Input.Textarea></Input.Textarea>
    </Affix>
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <Affix
      offsetBottom={300}
      onChange={(affixed) => {
        console.log(affixed);
      }}
    >
      <Input.Textarea></Input.Textarea>
    </Affix>
    <br />
    <br />
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
    <div style={{ height: 1000, width: 200, background: 'orange' }}></div>
    <Radio
      //defaultChecked={true}
      name="education"
      value="radio"
      onChange={(e) => {
        console.log('radio change');
      }}
    >
      Radio
    </Radio>
    <Checkbox
      value="4"
      onChange={() => {
        console.log('change');
      }}
    >
      477
    </Checkbox>
    {/* <Input.Textarea
      placeholder="dd"
      showCount
      autoSize={{ minRows: 2, maxRows: 3 }}
      onResize={(obj) => {
        console.log(obj.width, obj.height);
      }}
      style={{ height: 78 }}
    ></Input.Textarea> */}
    {/* <Input placeholder="dd" maxLength={10} prefix={<span>dd</span>} style={{ width: '100%', height: 40 }} /> */}
    {/* {/* <Checkbox.Group
      defaultValue={['1', '2']}
      options={[
        { label: '1', value: '1' },
        { label: '2', value: '2' },
      ]}
    ></Checkbox.Group> */}
    {/* <Checkbox.Group
      defaultValue={['3']}
      onChange={(checkedValues) => {
        console.log('checked values', checkedValues);
      }}
    > */}
    {/* <div>
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
    </Radio.Group> */}
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
