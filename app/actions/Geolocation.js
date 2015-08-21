import { RECEIVE_LOCATION } from '../constants/Types';
import { defaultPosition } from '../constants/Geo';
import { fetchMeetupGroups } from './Meetup';

function requestGeolocation() {
  return function(dispatch) {
    navigator.geolocation.getCurrentPosition(function(position) {
      const { latitude, longitude } = position.coords;

      dispatch({
        type: RECEIVE_LOCATION,
        coords: {
          latitude: latitude,
          longitude: longitude,
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

export function getGeolocation(getDefault) {
  return function(dispatch) {
    if (getDefault === true || !navigator.geolocation) {
      return dispatch(getDefaultGeolocation());
    }
    return dispatch(requestGeolocation());
  };
}
