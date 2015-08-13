import React from 'react';
import SliderComponent from './SliderComponent';

const { Component } = React;

export default class SliderContainer extends Component {
  render() {
    return (
      <SliderComponent label="Volume" />
    );
  }
}
