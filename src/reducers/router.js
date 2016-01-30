import { CONTAINER_YIELD } from '../constants/ActionTypes';

const initialState = {
  currentView: null,
};

export default function application(state = initialState, action) {
  switch (action.type) {
    case CONTAINER_YIELD:
      return {
        ...state,
        currentView: action.container,
      };

    default:
      return state;
  }
}
