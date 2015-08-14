import React from 'react';
import SliderContainer from './slider/SliderContainer';
import DisplayContainer from './display/DisplayContainer';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import * as reducers from './reducers/index';

const reducer = combineReducers(reducers);
const store = createStore(reducer);
const { Component } = React;

export default class App extends Component {
  render() {
    return (
      <div>
        <h1>Universal App Example</h1>
        <Provider store={store}>
          {() => <div><SliderContainer /><DisplayContainer /></div> }
        </Provider>
      </div>
    );
  }
}

