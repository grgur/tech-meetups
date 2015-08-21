import fetchJsonp from 'fetch-jsonp';
import { apiKey } from '../constants/Meetup';

import {
  RECEIVE_GROUPS,
  REQUEST_GROUPS,
} from '../constants/Types';

function receiveMeetupGroups(json) {
  return {
    type: RECEIVE_GROUPS,
    groups: json.data
  };
}

function requestMeetupGroups() {
  return {
    type: REQUEST_GROUPS
  };
}

export function fetchMeetupGroups(conf) {
  const { latitude, longitude } = conf;

  return function(dispatch) {
    dispatch(requestMeetupGroups());
    return fetchJsonp(`https://api.meetup.com/find/groups?&sign=true&photo-host=public&lon=${longitude}&text=js&category=34&lat=${latitude}&page=20&key=${apiKey}`, {
      jsonpCallback: 'callback'
    })
      .then(req => req.json())
      .then(json => dispatch(receiveMeetupGroups(json)))
      .catch(function(err) {console.warn(err); });
  };
}
