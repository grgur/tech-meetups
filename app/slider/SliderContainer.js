import React from 'react';
import SliderComponent from './SliderComponent';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as VolumeActions from '../actions/VolumeActions';
import { getGeolocation } from '../actions/Geolocation';

const { Component, PropTypes } = React;

@connect(state => ({
  volume: state.volumelevels,
  geo: state.geo,
}))
export default class SliderContainer extends Component {
  static propTypes = {
    volume: PropTypes.object,
    geo: PropTypes.object,
    dispatch: PropTypes.func,
  };

  render() {
    const { volume, geo, dispatch } = this.props;
    return (
      <div>
        <SliderComponent label="Volume" value={volume.level} {...bindActionCreators(VolumeActions, dispatch)} />
        <div>Lat: {geo.latitude}</div>
        <div>Lon: {geo.longitude}</div>
      </div>
    );
  }
}
