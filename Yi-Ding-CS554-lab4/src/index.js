import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const title = "Pokemon Introduction";

ReactDOM.render(
<App title={title} author="Yi Ding" now={new Date()} />, 
document.getElementById('root'));
registerServiceWorker();
