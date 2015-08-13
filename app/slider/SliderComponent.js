import React from 'react';

const { Component, PropTypes } = React;

export default class SliderComponent extends Component {
  static propTypes = {
    value: PropTypes.number,
    label: PropTypes.string,
  };

  static defaultProps = {
    value: 50,
    label: 'Slider',
  };

  onChange(ev) {
    console.log(ev.target.value);
  }

  render() {
    const { label, value } = this.props;

    return (
      <div>
        <label>{label}</label>
        <input
          type="range"
          min="0"
          max="100"
          step="1"
          defaultValue={value}
          onChange={this.onChange}
        />
      </div>
    );
  }

  state = { value: this.props.value };
}
