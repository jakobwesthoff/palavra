export const CURSOR_POSITION_UPDATE = 'CURSOR_POSITION_UPDATE';

export const cursorPositionUpdate = (tabIndex, cursorPosition) => ({
  type: CURSOR_POSITION_UPDATE,
  payload: {
    tabIndex,
    cursorPosition
  },
});
