import React from 'react';
import { connect } from 'react-redux';
import { fetchMeetupGroups } from '../../actions/Meetup';
import MeetupListItem from './MeetupListItem';
import GeoButton from '../GeoButton';

const { Component, PropTypes } = React;

@connect(state => ({
  meetups: state.meetups,
  geo: state.geo,
}))
export default class MeetupList extends Component {
  static propTypes = {
    meetups: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired,
    geo: PropTypes.object,
  };

  static defaultProps = {
    meetups: [],
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

  getList() {
    const { meetups } = this.props;

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
}
