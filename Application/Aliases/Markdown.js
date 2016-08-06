import {EXTENSION_ERROR} from 'Actions/Error';

export const markdownUpdate = action => dispatch => {
  chrome.storage.local.set({
    markdown: action.payload
  }, () => {
    if (runtime.lastError !== undefined) {
      dispatch({
        type: EXTENSION_ERROR,
        payload: runtime.lastError,
      });
      return;
    }

    dispatch(action);
  })
};