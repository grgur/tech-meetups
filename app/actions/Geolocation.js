import { defaultPosition } from '../constants/Geo';
import { fetchMeetupGroups } from './Meetup';

import {
  RECEIVE_LOCATION,
  INVALIDATE_GROUPS,
  INVALIDATE_DEFAULT_LOCATION,
  IGNORE_CHANGE,
} from '../constants/Types';

const cache = {
  coords: {
    latitude: 0,
    longitude: 0,
  },
  myLocation: {
    latitude: 0,
    longitude: 0,
  }
};

function receiveLocation(pos) {
  return function(dispatch) {
    dispatch({
      type: RECEIVE_LOCATION,
      coords: {
        ...pos
      },
    });
    return dispatch(fetchMeetupGroups(pos));
  };
}

function getDefaultGeolocation() {
  return receiveLocation(defaultPosition);
}

function invalidateGroups() {
  return {
    type: INVALIDATE_GROUPS,
  };
}

function invalidateDefaultLocation() {
  return {
    type: INVALIDATE_DEFAULT_LOCATION,
  };
}

export function setGeoLocation(geoLocation) {
  const { latitude, longitude } = geoLocation;
  const {latitude: defaultLat, longitude: defaultLong} = defaultPosition;
  const {latitude: cacheLat, longitude: cacheLong} = cache.coords;
  const isDefault = defaultLat === latitude && defaultLong === longitude;
  const shouldUpdateLocation = cacheLat !== latitude || cacheLong !== longitude;

  return function(dispatch) {
    if (shouldUpdateLocation) {
      cache.coords = { latitude, longitude };
      return dispatch(receiveLocation({
        latitude,
        longitude,
        isDefault: isDefault
      }));
    }

    return dispatch({
      type: IGNORE_CHANGE
    });
  };
}


function requestGeolocation() {
  const {latitude: myCachedLat, longitude: myCachedLong} = cache.myLocation;

  return function(dispatch) {
    dispatch(invalidateGroups());
    dispatch(invalidateDefaultLocation());

    if (myCachedLat + myCachedLong > 0) {
      return dispatch(setGeoLocation(cache.myLocation));
    }

    navigator.geolocation.getCurrentPosition(function(position) {
      const { latitude, longitude } = position.coords;
      cache.myLocation = { latitude, longitude };
      dispatch(setGeoLocation(position.coords));
    });
  };
}

export function getGeolocation(getDefault) {
  if (getDefault === true || !navigator.geolocation) {
    return getDefaultGeolocation();
  }

  return requestGeolocation();
}
