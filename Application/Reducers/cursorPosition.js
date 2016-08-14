import {CURSOR_POSITION_UPDATE} from 'Actions/CursorPosition';

const initialState = {line: 0, ch: 0};

const cursorPosition = (state = initialState, action) => {
  switch (action.type) {
    case CURSOR_POSITION_UPDATE:
      return action.payload;
    default:
      return state;
  }
};

export default cursorPosition;
