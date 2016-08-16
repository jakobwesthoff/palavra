/* global chrome */

import cloneDeep from 'lodash.clonedeep';

import {extensionError} from 'Actions/Error';
import {cursorPositionUpdated} from 'Actions/CursorPosition';

export const cursorPositionUpdate = action => (dispatch, getStore) => {
  const store = getStore();
  const {tabIndex, cursorPositionState} = action.payload;
  const cursorPositionByTabs = cloneDeep(store.cursorPositionByTabs);
  cursorPositionByTabs[tabIndex] = cursorPositionState;

  chrome.storage.local.set({cursorPositionByTabs}, () => {
    if (chrome.runtime.lastError !== undefined) {
      dispatch(extensionError(chrome.runtime.lastError));
      return;
    }
    dispatch(cursorPositionUpdated(tabIndex, cursorPositionState));
  });
};
