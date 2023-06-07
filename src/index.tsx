import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Button } from './components/Button';
import { Icon } from './components/Icon';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Button type="normal" disabled><a href="www.baidu.com">dddd</a></Button>
    <Button type="primary" disabled>ddd</Button>
    <Button type="text" disabled>ddd</Button>
    <Button type="dashed" disabled>ddd</Button>
    <div style={{width: '100px'}}>
      <Button block>test</Button>
    </div>
    <Icon name='close'/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
