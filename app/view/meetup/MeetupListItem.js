import React, { Component, PropTypes } from 'react';

export default class MeetupListItem extends Component {
  static propTypes = {
    name: PropTypes.string,
    link: PropTypes.string,
    description: PropTypes.string,
    group_photo: PropTypes.object,
    organizer: PropTypes.object,
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
    const { name, link, description, organizer } = this.props;
    return (
      <article className="meetup">
        {this.getGroupPhoto()}
        <div className="meetup-name"><a href={link}>{name}</a></div>
        <div className="meetup-description" dangerouslySetInnerHTML={{__html: description}}></div>

        <aside className="meetup-organizer">
          <div className="meetup-organizer-name">{organizer.name}</div>
        </aside>
      </article>
    );
  }
}
