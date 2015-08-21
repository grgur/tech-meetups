import { RECEIVE_LOCATION, INVALIDATE_GROUPS } from '../constants/Types';
import { defaultPosition } from '../constants/Geo';
import { fetchMeetupGroups } from './Meetup';

function requestGeolocation() {
  return function(dispatch) {
    navigator.geolocation.getCurrentPosition(function(position) {
      const { latitude, longitude } = position.coords;

      dispatch({
        type: RECEIVE_LOCATION,
        coords: {
          latitude,
          longitude,
          isDefault: false,
        },
      });

      dispatch(fetchMeetupGroups({latitude, longitude}));
    });
  };
}

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

export function getGeolocation(getDefault) {
  return function(dispatch) {
    dispatch(invalidateGroups());

    if (getDefault === true || !navigator.geolocation) {
      return dispatch(getDefaultGeolocation());
    }
    return dispatch(requestGeolocation());
  };
}
