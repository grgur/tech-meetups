import React from 'react';

const { Component, PropTypes } = React;

export default class DisplayComponent extends Component {
  static propTypes = {
    value: PropTypes.number,
  };

  static defaultProps = {
    value: 0,
  };

  render() {
    const { value } = this.props;

    return (
      <div>
        <output>{value}</output>
      </div>
    );
  }

   state = { value: this.props.value };
}
