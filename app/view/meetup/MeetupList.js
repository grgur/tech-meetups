import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { setGeoLocation } from '../../actions/Geolocation';
import MeetupListItem from './MeetupListItem';
import GeoButton from '../GeoButton';

const { array, bool, func, object } = PropTypes;

@connect(state => ({
  meetups: state.meetup.groups.data,
  isLoading: state.meetup.groups.isLoading,
  test: state.meetups,
  geoPending: state.geo.geoPending,
}))
export default class MeetupList extends Component {
  static propTypes = {
    meetups: array.isRequired,
    isLoading: bool.isRequired,
    dispatch: func.isRequired,
    geo: object,
    params: object,
    location: object,
    geoPending: bool,
  };

  static defaultProps = {
    meetups: [],
    geoPending: false,
  };

  componentWillMount() {
    this.sendRequestIfNeeded(this.props);
  }

  componentWillReceiveProps(nextProps) {
    const { pathname: nextPath } = nextProps.location.pathname;
    const { pathname: currentPath } = this.props.location.pathname;

    if (nextPath !== currentPath) {
      this.sendRequestIfNeeded(nextProps);
    }
  }

  getEmptyList() {
    return (
      <div className="emptyList">
        No meetups in your area 🙈<br />
        Maybe you should start one
      </div>
    );
  }

  getLoadingIndicator() {
    return (
      <div className="loading">
        <i className="ionicons ion-load-c"></i>
      </div>
    );
  }

  getGeoPendingIndicator() {
    return (
      <div className="loading">
        <i className="ionicons ion-android-compass"></i>
      </div>
    );
  }

  getList() {
    const { meetups, isLoading, geoPending } = this.props;

    if (geoPending === true) {
      return this.getGeoPendingIndicator();
    }

    if (isLoading === true) {
      return this.getLoadingIndicator();
    }

    if (!meetups.length) {
      return this.getEmptyList();
    }
    return (
      <div>
        {meetups.map((meetup, i) =>
          <MeetupListItem
            name={meetup.name}
            link={meetup.link}
            description={meetup.description}
            group_photo={meetup.group_photo}
            organizer={meetup.organizer}
            id={meetup.urlname}
            key={i}
          />
        )}
      </div>
    );
  }

  render() {
    const list = this.getList();

    return (
      <div className="main-content">
        <GeoButton />
        {list}
      </div>
    );
  }

  urlCoordsToObj(strCoords) {
    const arrUrlCoords = strCoords ? strCoords.split(',') : [];

    return {
      latitude: parseFloat(arrUrlCoords[0]),
      longitude: parseFloat(arrUrlCoords[1]),
    };
  }

  /**
   * Only send request if coords are new
   * @param  {Object} props Properties
   */
  sendRequestIfNeeded(props) {
    const { dispatch, params } = props;
    const { coords } = params;
    const objCoords = this.urlCoordsToObj(coords);

    dispatch(setGeoLocation(objCoords));
  }
}
