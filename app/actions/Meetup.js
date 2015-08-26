import fetchJsonp from 'fetch-jsonp';
import { apiKey } from '../constants/Meetup';

import {
  RECEIVE_GROUPS,
  REQUEST_GROUPS,
} from '../constants/Types';

let cache = {
  latitude: 0,
  longitude: 0,
};

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
  const { latitude: cacheLat, longitude: cacheLong} = cache;

  cache = conf;

  if (cacheLat === latitude && cacheLong === longitude) {
    // we already have the data, let's skip fetching and reuse
    return false;
  }

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
