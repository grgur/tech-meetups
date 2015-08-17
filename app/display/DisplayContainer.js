import React from 'react';
import SliderComponent from './DisplayComponent';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as VolumeActions from '../actions/VolumeActions';

const { Component, PropTypes } = React;

@connect(state => ({
  volume: state.volumelevels,
}))
export default class DisplayContainer extends Component {
  static propTypes = {
    volume: PropTypes.object,
    dispatch: PropTypes.func,
  };

  render() {
    const { volume, dispatch } = this.props;

    return (
      <SliderComponent value={volume.level} {...bindActionCreators(VolumeActions, dispatch)} />
    );
  }
}
