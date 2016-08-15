import {markdownUpdated} from 'Actions/Markdown';
import {cursorPositionUpdate} from 'Actions/CursorPosition';
import {tabActivated} from 'Actions/Tabs';
import ValueState from 'Library/ValueState';
import CursorPositionState from 'Library/CursorPositionState';

export const tabActivate = action => (dispatch, getStore) => {
  const store = getStore();
  const tabIndex = action.payload;

  const oldValueState = store.markdownByTabs[tabIndex];
  let valueState = new ValueState(undefined, store.revisions.value + 1);
  if (oldValueState !== undefined) {
    valueState = new ValueState(oldValueState.value, store.revisions.value + 1);
  }

  const oldCursorPositionState = store.cursorPositionByTabs[tabIndex];
  let cursorPositionState = new CursorPositionState(undefined, undefined, store.revisions.cursorPosition + 1);
  if (oldCursorPositionState !== undefined) {
    cursorPositionState = new CursorPositionState(
      oldCursorPositionState.line,
      oldCursorPositionState.character,
      store.revisions.cursorPosition + 1
    );
  }

  // Dispatch updates with new revision to force refresh
  dispatch(tabActivated(tabIndex));
  dispatch(markdownUpdated(tabIndex, valueState.toJSON()));
  dispatch(cursorPositionUpdate(tabIndex, cursorPositionState.toJSON()));
};
