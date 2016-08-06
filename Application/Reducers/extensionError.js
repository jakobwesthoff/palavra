import {EXTENSION_ERROR} from 'Actions/Error';

const initialState = null;

const extensionError = (state = initialState, action) => {
  switch (action.type) {
    case EXTENSION_ERROR:
      return action.payload;
    default:
      return state;
  }
};

export default extensionError;
