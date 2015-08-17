import { CHANGE_VOLUME } from '../constants/Types';

const initialState = {
  level: 30,
};

export default function volumeLevels(state = initialState, action) {
  switch (action.type) {
  case CHANGE_VOLUME:
    return {
      ...state,
      level: action.level,
    };

  default:
    return state;
  }
}
