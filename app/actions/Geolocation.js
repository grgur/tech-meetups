import { RECEIVE_LOCATION } from '../constants/Types';
import { defaultPosition } from '../constants/Geo';
import store from '../stores';

function requestGeolocation() {
  return function(dispatch) {
    navigator.geolocation.getCurrentPosition(function(position) {
      dispatch({
        type: RECEIVE_LOCATION,
        coords: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          inProgress: false,
        },
      });
    });
  };
}

export function getGeolocation() {
  if (!navigator.geolocation) {
    return store.dispatch({
      type: RECEIVE_LOCATION,
      ...defaultPosition,
    });
  }
  return store.dispatch(requestGeolocation());
}
