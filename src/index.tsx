import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Button } from './components/Button';
import { Icon } from './components/Icon';
import { Tag } from './components/Tag';
import Radio from './components/Radio';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Button type="normal" disabled><a href="www.baidu.com">dddd</a></Button>
    <Radio  defaultChecked={false} checked={false} onChange={(e)=>{console.log(e);}}>Radio</Radio>
    <Button type="primary" loading>ddd</Button>
    <Button type="text" disabled>ddd</Button>
    <Button type="dashed" disabled>ddd</Button>
    <div style={{width: '100px'}}>
      <Button block>test</Button>
    </div>
    <Icon name='close' className='test-class'/>
    <Icon name='loading' spin/>
    <Tag color='#f50' icon={<Icon name='warning'></Icon>}><div>dddd</div></Tag>
    <Tag color='cyan' onClick={()=> {console.log('d')}}closable><div>dddd</div></Tag>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
