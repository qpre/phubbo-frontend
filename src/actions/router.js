import * as types from '../constants/ActionTypes';

export function yieldContainer(container) {
  return {
    type: types.CONTAINER_YIELD,
    container,
  };
};
