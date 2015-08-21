import {
  RECEIVE_GROUPS,
  REQUEST_GROUPS,
  INVALIDATE_GROUPS,
} from '../constants/Types';

const defaultState = {
  groups: [],
  isLoading: true,
};

export default function volumeLevels(state = defaultState, action) {
  switch (action.type) {
  case RECEIVE_GROUPS:
    return {
      groups: action.groups,
      isLoading: false
    };

  case REQUEST_GROUPS:
    return defaultState;

  case INVALIDATE_GROUPS:
    return defaultState;

  default:
    return state;
  }
}
