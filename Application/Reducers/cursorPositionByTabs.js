import cloneDeep from 'lodash.clonedeep';

import {CURSOR_POSITION_UPDATED} from 'Actions/CursorPosition';
import {TAB_REMOVED} from 'Actions/Tabs';

const initialState = {};

const cursorPositionByTabs = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case CURSOR_POSITION_UPDATED:
      newState = cloneDeep(state);
      newState[action.payload.tabIndex] = action.payload.cursorPositionState;
      return newState;
    case TAB_REMOVED:
      newState = cloneDeep(state);
      if (newState[action.payload.id] !== undefined) {
        delete newState[action.payload.id];
      }
      return newState;
    default:
      return state;
  }
};

export default cursorPositionByTabs;
