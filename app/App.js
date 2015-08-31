import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
// import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';
import { Router } from 'react-router';
import routes from './routes';
import store from './stores';
import './app.less';

export default class App extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired
  };

  render() {
    const { history } = this.props;

    return (
      <div>
        <div className="mainToolbar">
          <h1 className="title">Tech Meetups</h1>
          <div className="subtitle">ReactJS + Redux + React Router + Webpack + ES.later</div>
        </div>
        <Provider store={store}>
          {() => (
            <Router history={history} children={routes} />
          )}
        </Provider>
        { /* <DebugPanel top right bottom> */}
        { /* <DevTools store={store} monitor={LogMonitor} /> */ }
        { /* </DebugPanel> */ }
      </div>
    );
  }
}
