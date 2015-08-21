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
          inProgress: false,
        },
      });

      dispatch(fetchMeetupGroups({latitude, longitude}));
    });
  };
}

function getDefaultGeolocation() {
  return {
    type: RECEIVE_LOCATION,
    ...defaultPosition,
  };
}

export function getGeolocation() {
  return function(dispatch) {
    if (!navigator.geolocation) {
      return dispatch(getDefaultGeolocation());
    }
    return dispatch(requestGeolocation());
  };
}
