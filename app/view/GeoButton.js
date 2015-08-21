import React from 'react';
import { connect } from 'react-redux';
import { getGeolocation } from '../actions/Geolocation';

const { Component, PropTypes } = React;

@connect()
export default class GeoButton extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  };

  onButtonClick() {
    const { dispatch } = this.props;
    dispatch(getGeolocation());
  }

  render() {
    return (
      <button className="geobutton" onClick={this.onButtonClick.bind(this)}>
        Meetups close to me
      </button>
    );
  }
}
