import debounce from 'lodash.debounce';
import {extensionError} from 'Actions/Error';
import {markdownUpdated} from 'Actions/Markdown';

const markdownUpdatedDebounced = debounce((action, dispatch) => {
  chrome.storage.local.set({
    markdown: action.payload
  }, () => {
    if (chrome.runtime.lastError !== undefined) {
      dispatch(extensionError(chrome.runtime.lastError));
      return;
    }
    dispatch(markdownUpdated(action.payload));
  })
}, 500);

export const markdownUpdate = action => dispatch => markdownUpdatedDebounced(action, dispatch);