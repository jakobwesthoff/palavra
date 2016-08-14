/* global chrome */

import cloneDeep from 'lodash.clonedeep';

import {extensionError} from 'Actions/Error';
import {markdownUpdated} from 'Actions/Markdown';

export const markdownUpdate = action => (dispatch, getStore) => {
  const store = getStore();
  const {tabIndex, valueState} = action.payload;
  const markdownByTabs = cloneDeep(store.markdownByTabs);
  markdownByTabs[tabIndex] = valueState;

  chrome.storage.local.set({markdownByTabs}, () => {
    if (chrome.runtime.lastError !== undefined) {
      dispatch(extensionError(chrome.runtime.lastError));
      return;
    }
    dispatch(markdownUpdated(tabIndex, valueState));
  });
};
