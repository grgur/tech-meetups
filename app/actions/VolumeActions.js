import { CHANGE_VOLUME } from '../constants/VolumeTypes';

export function changeVolume(level) {
  return {
    type: CHANGE_VOLUME,
    level,
  };
}
