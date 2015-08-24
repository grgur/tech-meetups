import React from 'react';
import { Provider } from 'react-redux';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';
import { Router } from 'react-router';
import routes from './routes';
import store from './stores';

const { Component, PropTypes } = React;


export default class App extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired
  };

  render() {
    const { history } = this.props;

    return (
      <div>
        <h1>Universal App Example - Tech Meetups</h1>
        <Provider store={store}>
          {() => (
            <Router history={history} children={routes} />
          )}
        </Provider>
        <DebugPanel top right bottom>
          <DevTools store={store} monitor={LogMonitor} />
        </DebugPanel>
      </div>
    );
  }
}
