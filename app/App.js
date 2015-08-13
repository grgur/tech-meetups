import React from 'react';
import SliderContainer from './slider/SliderContainer';

const {Component} = React;

export default class App extends Component {
    render() {
        return (
            <div>
                <h1>Universal App Example</h1>
                <SliderContainer />
            </div>
        );
      }
}
