import {extensionError} from 'Actions/Error';
import {markdownUpdated} from 'Actions/Markdown';

export const markdownUpdate = action => dispatch => {
  chrome.storage.local.set({
    markdown: action.payload
  }, () => {
    if (chrome.runtime.lastError !== undefined) {
      dispatch(extensionError(chrome.runtime.lastError));
      return;
    }
    dispatch(markdownUpdated(action.payload));
  })
};