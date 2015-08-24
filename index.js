import React from 'react';
import ReactDOM from 'react-dom';
import History from 'react-router/lib/HashHistory';
import App from './app/App';

ReactDOM.render((
  <App history={new History()} />
), document.getElementById('root'));
