import { CHANGE_VOLUME } from '../constants/VolumeTypes';

const initialState = {
  level: 30,
};

export default function volumeLevels(state = initialState, action) {
  switch (action.type) {
  case CHANGE_VOLUME:
    return {
      level: action.level,
    };

  default:
    return state;
  }
}
