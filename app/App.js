import React from 'react';
import SliderContainer from './slider/SliderContainer';
import DisplayContainer from './display/DisplayContainer';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import * as reducers from './reducers/index';
import { devTools, persistState } from 'redux-devtools';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';
import thunk from 'redux-thunk';

const { Component } = React;

const finalCreateStore = compose(
  applyMiddleware(thunk),
  devTools(),
  persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/)),
  createStore
);

const reducer = combineReducers(reducers);
const store = finalCreateStore(reducer);

export default class App extends Component {
  render() {
    return (
      <div>
        <h1>Universal App Example</h1>
        <Provider store={store}>
          {() => <div><SliderContainer /><DisplayContainer /></div> }
        </Provider>
        <DebugPanel top right bottom>
          <DevTools store={store} monitor={LogMonitor} />
        </DebugPanel>
      </div>
    );
  }
}

