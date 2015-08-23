import React from 'react';
import { Provider } from 'react-redux';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';
import { Router } from 'react-router';
import { history } from 'react-router/lib/BrowserHistory';
import routes from './routes';
import store from './stores';

const { Component } = React;


export default class App extends Component {
  render() {
    return (
      <div>
        <h1>Universal App Example - Tech Meetups</h1>
        <Provider store={store}>
          {() => <Router children={routes} history={history} />
          }
        </Provider>
        <DebugPanel top right bottom>
          <DevTools store={store} monitor={LogMonitor} />
        </DebugPanel>
      </div>
    );
  }
}

