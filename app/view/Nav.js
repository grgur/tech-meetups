import React from 'react';
import createFragment from 'react-addons-create-fragment';
import { Link } from 'react-router';

const { Component, PropTypes } = React;

export default class GeoButton extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired
  };

  render() {
    const { children } = this.props;

    return (
      <div>
        <ul>
          <li><Link to="/meetups">Meetups</Link></li>
          <li><Link to="/about">About</Link></li>
        </ul>
        {createFragment({ a: <div />, b: children })}
      </div>
    );
  }
}
