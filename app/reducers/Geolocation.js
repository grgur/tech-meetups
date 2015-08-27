import { defaultPosition } from '../constants/Geo';
import {
  RECEIVE_LOCATION,
  INVALIDATE_DEFAULT_LOCATION
} from '../constants/Types';

export default function Geolocation(state = defaultPosition, action) {
  switch (action.type) {
  case RECEIVE_LOCATION:
    return {
      ...state,
      ...action.coords,
    };

  case INVALIDATE_DEFAULT_LOCATION:
    return {
      ...state,
      isDefault: false,
    };

  default:
    return state;
  }
}
