import React from 'react';
import { connect } from 'react-redux';
import { fetchMeetupGroups } from '../../actions/Meetup';
import GroupListComponent from './GroupListComponent';
import GeoButton from '../GeoButton';

const { Component, PropTypes } = React;

@connect(state => ({
  meetups: state.meetups,
  geo: state.geo,
}))
export default class GroupListContainer extends Component {
  static propTypes = {
    meetups: PropTypes.array,
    dispatch: PropTypes.func,
    geo: PropTypes.object,
  };

  static defaultProps = {
    meetups: [],
  };

  componentWillMount() {
    const { dispatch, geo } = this.props;
    const apiKey = 'e34b186d2611597b496f049f5c52';

    dispatch(fetchMeetupGroups({apiKey, ...geo}));
  }

  render() {
    const { meetups } = this.props;
    return (
      <div>
        <GeoButton />
        {meetups.map((meetup, i) =>
          <GroupListComponent
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
}
