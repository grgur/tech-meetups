import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class MeetupListItem extends Component {
  static propTypes = {
    name: PropTypes.string,
    link: PropTypes.string,
    description: PropTypes.string,
    group_photo: PropTypes.object,
    organizer: PropTypes.object,
    id: PropTypes.number
  };

  static defaultProps = {
    group_photo: {},
  };

  getGroupPhoto() {
    const { name, group_photo } = this.props;

    if (group_photo.thumb_link) {
      return (
        <figure>
          <img src={group_photo.thumb_link} alt={name}/>
        </figure>
      );
    }

    return '';
  }

  render() {
    const { id, name, description, organizer } = this.props;
    const path = `/meetup/${id}`;

    return (
      <article className="meetup">
        {this.getGroupPhoto()}
        <div className="meetup-name"><Link to={path}>{name}</Link></div>
      </article>
    );
  }
}
