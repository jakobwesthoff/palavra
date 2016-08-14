/* global chrome */

import debounce from 'lodash.debounce';
import onlyLeader from 'Library/onlyLeader';
import {extensionError} from 'Actions/Error';
import {markdownUpdated} from 'Actions/Markdown';

const markdownUpdatedOnlyLeader = onlyLeader(
  (action, dispatch, next) => chrome.storage.local.set({
    markdown: action.payload,
  }, () => next(action, dispatch)),
  (action, dispatch) => {
    if (chrome.runtime.lastError !== undefined) {
      dispatch(extensionError(chrome.runtime.lastError));
      return;
    }
    dispatch(markdownUpdated(action.payload));
  }
);

/* eslint-disable import/prefer-default-export */
export const markdownUpdate = action => dispatch => markdownUpdatedOnlyLeader(action, dispatch);
/* eslint-enable */
