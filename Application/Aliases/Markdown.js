/* global chrome */

import onlyLeader from 'Library/onlyLeader';
import cloneDeep from 'lodash.clonedeep';

import {extensionError} from 'Actions/Error';
import {markdownUpdated} from 'Actions/Markdown';

const markdownUpdatedOnlyLeader = onlyLeader(
  (action, dispatch, store, next) => {
    const {tabIndex, markdown} = action.payload;
    console.log("markdown: ", markdown);
    const markdownByTabs = cloneDeep(store.markdownByTabs);
    markdownByTabs[tabIndex] = markdown;

    chrome.storage.local.set(
      {markdownByTabs},
      () => next(dispatch, markdown, tabIndex)
    );
  },
  (dispatch, markdown, tabIndex) => {
    if (chrome.runtime.lastError !== undefined) {
      dispatch(extensionError(chrome.runtime.lastError));
      return;
    }
    console.log("dispatching: ", markdown);
    dispatch(markdownUpdated(tabIndex, markdown));
  }
);

/* eslint-disable import/prefer-default-export */
export const markdownUpdate = action => (dispatch, getStore) => markdownUpdatedOnlyLeader(action, dispatch, getStore());
/* eslint-enable */
