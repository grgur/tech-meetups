import fetchJsonp from 'fetch-jsonp';
import { setMeetups, getMeetup } from '../middleware/Data';
import { apiKey } from '../constants/Meetup';

import {
  RECEIVE_GROUPS,
  REQUEST_GROUPS,
  GET_MEETUP,
} from '../constants/Types';

const cache = {
  coords: {
    latitude: 0,
    longitude: 0,
  },
  data: []
};

function receiveMeetupGroups(json, key) {
  const { data } = json;

  cache.data[key] = data;

  setMeetups(data);

  return {
    type: RECEIVE_GROUPS,
    groups: data
  };
}

function requestMeetupGroups() {
  return {
    type: REQUEST_GROUPS
  };
}

export function fetchMeetupGroups(conf) {
  const { latitude, longitude } = conf;
  const { latitude: cacheLat, longitude: cacheLong} = cache.coords;
  const key = `${latitude},${latitude}`;

  cache.coords = conf;

  if (cacheLat === latitude && cacheLong === longitude) {
    // we already have the data, let's skip fetching and reuse
    return null;
  }

  if (cache.data[key]) {
    return receiveMeetupGroups({data: cache.data[key]}, key);
  }

  return function(dispatch) {
    dispatch(requestMeetupGroups());
    return fetchJsonp(`https://api.meetup.com/find/groups?&sign=true&photo-host=public&lon=${longitude}&text=js&category=34&lat=${latitude}&page=20&key=${apiKey}`, {
      jsonpCallback: 'callback'
    })
      .then(req => req.json())
      .then(json => dispatch(receiveMeetupGroups(json, key)))
      .catch(function(err) {console.warn(err); });
  };
}

export function getMeetupById(id, data) {
  const fromCache = data || getMeetup(id);

  if (fromCache) {
    return {
      type: GET_MEETUP,
      meetup: fromCache,
    };
  }

  return function(dispatch) {
    const url = `https://api.meetup.com/${id}?photo-host=public&page=20&sign=true&key=${apiKey}`;
    return fetchJsonp(url, {
      jsonpCallback: 'callback'
    })
      .then(req => req.json())
      .then(json => dispatch(getMeetupById(null, json.data)))
      .catch(function(err) {console.warn(err); });
  };
}
