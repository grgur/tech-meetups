import React from 'react';
import { connect } from 'react-redux';
import { fetchMeetupGroups } from '../../actions/Meetup';
import { Link } from 'react-router';
import MeetupListItem from './MeetupListItem';
import GeoButton from '../GeoButton';

const { Component, PropTypes } = React;

@connect(state => ({
  meetups: state.meetups.groups,
  isLoading: state.meetups.isLoading,
  geo: state.geo,
}))
export default class MeetupList extends Component {
  static propTypes = {
    meetups: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired,
    geo: PropTypes.object,
  };

  static defaultProps = {
    meetups: {
      groups: [],
      isLoading: true
    },
  };

  componentWillMount() {
    const { dispatch, geo } = this.props;

    dispatch(fetchMeetupGroups(geo));
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
        <ul>
          <li><Link to="home">Meetups</Link></li>
          <li><Link to="about">About</Link></li>
        </ul>
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
}
