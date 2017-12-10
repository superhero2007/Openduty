import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './helpers/registerServiceWorker';
import './scss/index.scss';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
