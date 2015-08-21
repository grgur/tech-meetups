import React from 'react';
import { Provider } from 'react-redux';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';
import store from './stores';
import MeetupList from './view/meetup/MeetupList';

const { Component } = React;


export default class App extends Component {
  render() {
    return (
      <div>
        <h1>Universal App Example - Tech Meetups</h1>
        <Provider store={store}>
          {() => <MeetupList />
          }
        </Provider>
        <DebugPanel top right bottom>
          <DevTools store={store} monitor={LogMonitor} />
        </DebugPanel>
      </div>
    );
  }
}

