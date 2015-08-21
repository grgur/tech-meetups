import { RECEIVE_LOCATION } from '../constants/Types';
import { defaultPosition } from '../constants/Geo';

export default function Geolocation(state = defaultPosition, action) {
  switch (action.type) {
  case RECEIVE_LOCATION:
    return {
      ...state,
      ...action.coords,
    };

  default:
    return state;
  }
}
