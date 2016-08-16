export const CURSOR_POSITION_UPDATE = 'CURSOR_POSITION_UPDATE';
export const CURSOR_POSITION_UPDATED = 'CURSOR_POSITION_UPDATED';

export const cursorPositionUpdate = (tabIndex, cursorPositionState) => ({
  type: CURSOR_POSITION_UPDATE,
  payload: {
    tabIndex,
    cursorPositionState
  },
});

export const cursorPositionUpdated = (tabIndex, cursorPositionState) => ({
  type: CURSOR_POSITION_UPDATED,
  payload: {
    tabIndex,
    cursorPositionState
  },
});
