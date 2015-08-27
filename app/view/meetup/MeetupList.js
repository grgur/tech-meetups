import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { setGeoLocation } from '../../actions/Geolocation';
import MeetupListItem from './MeetupListItem';
import GeoButton from '../GeoButton';

@connect(state => ({
  meetups: state.meetups.groups,
  isLoading: state.meetups.isLoading
}))
export default class MeetupList extends Component {
  static propTypes = {
    meetups: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired,
    geo: PropTypes.object,
    params: PropTypes.object,
  };

  static defaultProps = {
    meetups: [],
  };

  componentWillMount() {
    this.sendRequestIfNeeded(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.sendRequestIfNeeded(nextProps);
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
        ⚛Loading⚛
      </div>
    );
  }

  getList() {
    const { meetups, isLoading } = this.props;

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
            key={i}
          />
        )}
      </div>
    );
  }

  render() {
    const list = this.getList();

    return (
      <div>
        <GeoButton />
        {list}
      </div>
    );
  }

  areUrlCoordsUpdated(urlCoords, geoCords) {
    if (!geoCords) {
      return true;
    }

    if (typeof urlCoords === 'string') {
      urlCoords = this.urlCoordsToObj(urlCoords);
    }

    return urlCoords.longitude !== geoCords.longitude || urlCoords.latitude !== geoCords.latitude;
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
   * @param  {Boolean} force force request
   */
  sendRequestIfNeeded(props) {
    const { dispatch, params } = props;
    const { coords } = params;
    const objCoords = this.urlCoordsToObj(coords);

    dispatch(setGeoLocation(objCoords));
  }
}
