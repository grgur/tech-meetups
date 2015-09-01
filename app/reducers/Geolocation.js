import { defaultPosition } from '../constants/Geo';
import {
  RECEIVE_LOCATION,
  INVALIDATE_DEFAULT_LOCATION,
  GEO_PENDING,
} from '../constants/Types';

export default function Geolocation(state = defaultPosition, action) {
  switch (action.type) {
  case RECEIVE_LOCATION:
    return {
      ...state,
      ...action.coords,
      geoPending: false,
    };

  case INVALIDATE_DEFAULT_LOCATION:
    return {
      ...state,
      isDefault: false,
    };

  case GEO_PENDING:
    return {
      ...state,
      geoPending: true,
    };

  default:
    return state;
  }
}
