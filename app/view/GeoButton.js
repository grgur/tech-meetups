import React from 'react';
import { getGeolocation } from '../actions/Geolocation';

const { Component } = React;

export default class GeoButton extends Component {
  onButtonClick() {
    getGeolocation();
  }

  render() {
    return (
      <button className="geobutton" onClick={this.onButtonClick.bind(this)}>
        Meetups close to me
      </button>
    );
  }
}
