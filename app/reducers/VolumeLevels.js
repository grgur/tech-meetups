import { CHANGE_VOLUME } from '../constants/VolumeTypes';

const initialState = [{
  level: 30,
}];

export default function volumeLevels(state = initialState, action) {
  switch (action.type) {
  case CHANGE_VOLUME:
    return [{
      id: (state.length === 0) ? 0 : state[0].id + 1,
      level: action.level,
    }, ...state];

  default:
    return state;
  }
}
