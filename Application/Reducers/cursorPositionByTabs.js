import cloneDeep from 'lodash.clonedeep';

import {CURSOR_POSITION_UPDATE} from 'Actions/CursorPosition';

const initialState = {};

const cursorPositionByTabs = (state = initialState, action) => {
  switch (action.type) {
    case CURSOR_POSITION_UPDATE:
      const newState = cloneDeep(state);
      newState[action.payload.tabIndex] = action.payload.cursorPositionState;
      return newState;
    default:
      return state;
  }
};

export default cursorPositionByTabs;
