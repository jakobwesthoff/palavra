import cloneDeep from 'lodash.clonedeep';

import {
  REVISION_CURSOR_POSITION_SET,
  REVISION_VALUE_SET
} from 'Actions/Revision';

const initialState = {
  cursorPosition: 0,
  value: 0,
};

const revisions = (state = initialState, action) => {
  switch (action.type) {
    case REVISION_CURSOR_POSITION_SET:
      const newCursorPositionState = cloneDeep(state);
      newCursorPositionState.cursorPosition = action.payload.newRevision;
      return newCursorPositionState;
    case REVISION_VALUE_SET:
      const newValueState = cloneDeep(state);
      newValueState.value = action.payload.newRevision;
      return newValueState;
    default:
      return state;
  }
};

export default revisions;
