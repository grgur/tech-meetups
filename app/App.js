import React from 'react';
import { Provider } from 'react-redux';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';
import store from './stores';
import SliderContainer from './slider/SliderContainer';
import DisplayContainer from './display/DisplayContainer';
import GroupListContainer from './view/meetup/GroupListContainer';

const { Component } = React;


export default class App extends Component {
  render() {
    return (
      <div>
        <h1>Universal App Example</h1>
        <Provider store={store}>
          {() => <div>
                  <SliderContainer />
                  <DisplayContainer />
                  <GroupListContainer />
                </div>
          }
        </Provider>
        <DebugPanel top right bottom>
          <DevTools store={store} monitor={LogMonitor} />
        </DebugPanel>
      </div>
    );
  }
}

