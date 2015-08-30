import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import './meetup.less';

export default class MeetupListItem extends Component {
  static propTypes = {
    name: PropTypes.string,
    link: PropTypes.string,
    description: PropTypes.string,
    group_photo: PropTypes.object,
    organizer: PropTypes.object,
    id: PropTypes.string
  };

  render() {
    const { id, name, description } = this.props;
    const path = `/meetup/${id}`;

    // strip html tags
    const noTagsDesc = description.replace(/<\/?[^>]+(>|$)/g, '');

    return (
      <article className="meetup">
        <div className="meetup-name"><Link to={path}>{name}</Link></div>
        <div className="meetup-description" dangerouslySetInnerHTML={{__html: noTagsDesc}}></div>
      </article>
    );
  }
}
