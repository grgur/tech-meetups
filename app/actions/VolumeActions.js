import { CHANGE_VOLUME } from '../constants/Types';

export function onSliderChangeVolume(ev) {
  const level = parseInt(ev.target.value, 10);

  return {
    type: CHANGE_VOLUME,
    level,
  };
}
