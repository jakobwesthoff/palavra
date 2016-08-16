import uuid from 'uuid';

import {markdownUpdated} from 'Actions/Markdown';
import {cursorPositionUpdated} from 'Actions/CursorPosition';
import {
  tabActivate as tabActivateAction,
  tabActivated,
  tabAdded,
  tabRemoved,
} from 'Actions/Tabs';

import ValueState from 'Library/ValueState';
import CursorPositionState from 'Library/CursorPositionState';

export const tabActivate = action => (dispatch, getStore) => {
  const store = getStore();
  const tabId = action.payload;

  chrome.storage.local.set({activeTab: tabId}, () => {
    if (chrome.runtime.lastError !== undefined) {
      dispatch(extensionError(chrome.runtime.lastError));
    }
  });

  const oldValueState = store.markdownByTabs[tabId];
  let valueState = new ValueState(undefined, store.revisions.value + 1);
  if (oldValueState !== undefined) {
    valueState = new ValueState(oldValueState.value, store.revisions.value + 1);
  }

  const oldCursorPositionState = store.cursorPositionByTabs[tabId];
  let cursorPositionState = new CursorPositionState(undefined, undefined, store.revisions.cursorPosition + 1);
  if (oldCursorPositionState !== undefined) {
    cursorPositionState = new CursorPositionState(
      oldCursorPositionState.line,
      oldCursorPositionState.character,
      store.revisions.cursorPosition + 1
    );
  }

  // Dispatch updates with new revision to force refresh
  dispatch(tabActivated(tabId));
  dispatch(markdownUpdated(tabId, valueState.toJSON()));
  dispatch(cursorPositionUpdated(tabId, cursorPositionState.toJSON()));
};

export const tabAdd = action => (dispatch, getStore) => {
  const store = getStore();
  const {name, id} = action.payload;
  const tabs = [...store.tabs, {id, name}];

  chrome.storage.local.set({tabs}, () => {
    if (chrome.runtime.lastError !== undefined) {
      dispatch(extensionError(chrome.runtime.lastError));
    }
  });

  dispatch(tabAdded(id, name));
  dispatch(tabActivateAction(id));
};

export const tabRemove = action => (dispatch, getStore) => {
  const store = getStore();
  const {id} = action.payload;

  const tabs = [...store.tabs].filter(tab => tab.id !== id);

  chrome.storage.local.set({tabs}, () => {
    if (chrome.runtime.lastError !== undefined) {
      dispatch(extensionError(chrome.runtime.lastError));
    }
  });

  dispatch(tabRemoved(id));
};
