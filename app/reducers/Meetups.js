import { RECEIVE_GROUPS } from '../constants/Types';

export default function volumeLevels(state = [], action) {
  switch (action.type) {
  case RECEIVE_GROUPS:
    return action.groups;

  default:
    return state;
  }
}
