import React from 'react';
import { connect } from 'react-redux';
import { getGeolocation } from '../actions/Geolocation';

const { Component, PropTypes } = React;

@connect(state => ({
  geo: state.geo
}))
export default class GeoButton extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  };

  onGeoGetterClick() {
    const { dispatch } = this.props;
    dispatch(getGeolocation());
  }

  onDefaultGeoClick() {
    const { dispatch } = this.props;
    dispatch(getGeolocation(true));
  }

  showGeoGetter() {
    return (
      <button className="geobutton" onClick={this.onGeoGetterClick.bind(this)}>
        Meetups close to me
      </button>
    );
  }

  showDefaultGeo() {
    return (
      <button className="geobutton" onClick={this.onDefaultGeoClick.bind(this)}>
        Default Geolocation
      </button>
    );
  }

  render() {
    const { geo } = this.props;

    if (geo.isDefault === true) {
      return this.showGeoGetter();
    }

    return this.showDefaultGeo();
  }
}
