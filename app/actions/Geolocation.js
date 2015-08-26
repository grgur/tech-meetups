import { defaultPosition } from '../constants/Geo';
import { fetchMeetupGroups } from './Meetup';

import {
  RECEIVE_LOCATION,
  INVALIDATE_GROUPS,
  IGNORE_CHANGE
} from '../constants/Types';

let cache = {
  latitude: 0,
  longitude: 0,
};

function getDefaultGeolocation() {
  return function(dispatch) {
    dispatch({
      type: RECEIVE_LOCATION,
      coords: {
        ...defaultPosition
      },
    });

    return dispatch(fetchMeetupGroups(defaultPosition));
  };
}

function invalidateGroups() {
  return {
    type: INVALIDATE_GROUPS,
  };
}

export function setGeoLocation(geoLocation) {
  const { latitude, longitude } = geoLocation;
  const { latitude: cacheLat, longitude: cacheLong} = cache;

  cache = geoLocation;

  if (cacheLat === latitude && cacheLong === longitude) {
    // we already have the data, let's skip fetching and reuse
    return {type: IGNORE_CHANGE};
  }

  return function(dispatch) {
    dispatch({
      type: RECEIVE_LOCATION,
      coords: {
        latitude,
        longitude,
        isDefault: false,
      },
    });

    dispatch(fetchMeetupGroups({latitude, longitude}));
  };
}

function requestGeolocation() {
  return function(dispatch) {
    navigator.geolocation.getCurrentPosition(function(position) {
      dispatch(setGeoLocation(position.coords));
    });
  };
}

export function getGeolocation(getDefault) {
  return function(dispatch) {
    dispatch(invalidateGroups());

    if (getDefault === true || !navigator.geolocation) {
      return dispatch(getDefaultGeolocation());
    }
    return dispatch(requestGeolocation());
  };
}
