import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getGeolocation } from '../actions/Geolocation';

@connect(state => ({
  geo: state.geo,
  isLoading: state.meetups.isLoading,
}))
export default class GeoButton extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    geo: PropTypes.object.isRequired,
  };

  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  onGeoGetterClick() {
    const { dispatch } = this.props;
    dispatch(getGeolocation());
  }

  onDefaultGeoClick() {
    const { dispatch } = this.props;
    dispatch(getGeolocation(true));
  }

  getButton(locateMe) {
    const { isLoading } = this.props;
    const text = locateMe ? 'Meetups close to me' : 'Default Geolocation';
    const cb = locateMe ? this.onGeoGetterClick : this.onDefaultGeoClick;

    return (
      <button disabled={isLoading} className="geobutton" onClick={cb.bind(this)}>
        {text}
      </button>
    );
  }

  componentWillReceiveProps(nextProps) {
    const { geo } = nextProps;
    const { router } = this.context;
    const { latitude, longitude } = geo;
    const newPath = `/geo/${latitude},${longitude}`;

    if (router.state.location.pathname !== newPath) {
      this.context.router.transitionTo(newPath);
    }
  }

  render() {
    const { geo } = this.props;

    return this.getButton(geo.isDefault);
  }
}
