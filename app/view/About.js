import React from 'react';
import { connect } from 'react-redux';

const { Component, PropTypes } = React;

@connect(state => ({
  geo: state.geo
}))
export default class GeoButton extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    geo: PropTypes.object,
  };

  render() {
    const { geo } = this.props;

    return (
      <div className="about">
        It's all about that base
        {geo}
      </div>
    );
  }
}
