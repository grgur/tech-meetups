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

  if (shouldUpdateLocation) {
    cache.coords = { latitude, longitude };
    return receiveLocation({
      latitude,
      longitude,
      isDefault: isDefault
    });
  }

  return {
    type: IGNORE_CHANGE
  };
}

function requestGeolocation() {
  return function(dispatch) {
    dispatch(invalidateGroups());
    dispatch(invalidateDefaultLocation());
    navigator.geolocation.getCurrentPosition(function(position) {
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
