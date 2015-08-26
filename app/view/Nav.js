import React from 'react';
import createFragment from 'react-addons-create-fragment';
import { Link } from 'react-router';
import { connect } from 'react-redux';

const { Component, PropTypes } = React;

@connect(state => ({
  geo: state.geo
}))
export default class GeoButton extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    geo: PropTypes.object.isRequired,
  };

  render() {
    const { children, geo } = this.props;
    const { latitude, longitude } = geo;
    const geoString = `/geo/${latitude},${longitude}`;

    return (
      <div>
        <ul>
          <li><Link to={geoString}>Meetups</Link></li>
          <li><Link to="/about">About</Link></li>
        </ul>
        {createFragment({ a: <div />, b: children })}
      </div>
    );
  }
}
