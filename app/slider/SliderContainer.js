import React from 'react';
import SliderComponent from './SliderComponent';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as VolumeActions from '../actions/VolumeActions';

const { Component } = React;

@connect(state => ({
  volume: state.volumelevels
}))
export default class SliderContainer extends Component {
  render() {
    const { volume, dispatch } = this.props;
    return (
      <SliderComponent label="Volume" value={volume[0].level} {...bindActionCreators(VolumeActions, dispatch)} />
    );
  }
}
