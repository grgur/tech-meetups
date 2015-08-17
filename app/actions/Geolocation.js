import { REQUEST_LOCATION } from '../constants/Types';
import { defaultPosition } from '../constants/Geo';

function requestGeolocation() {
  return function(dispatch) {
    navigator.geolocation.getCurrentPosition(function(position) {
      dispatch({
        type: REQUEST_LOCATION,
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
    // nothing should happen anyway since defaultPosition obj never mutated
    return {
      type: REQUEST_LOCATION,
      ...defaultPosition,
    };
  }
  return dispatch => dispatch(requestGeolocation());
}
