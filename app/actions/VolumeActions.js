import { CHANGE_VOLUME } from '../constants/VolumeTypes';

export function onSliderChangeVolume(ev) {
  const level = ev.target.value;

  return {
    type: CHANGE_VOLUME,
    level,
  };
}
