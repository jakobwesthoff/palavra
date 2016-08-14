/* global chrome */

import cloneDeep from 'lodash.clonedeep';

import {markdownUpdated} from 'Actions/Markdown';
import {tabActivated} from 'Actions/Tabs';
import ValueState from 'Library/ValueState';

export const tabActivate = action => (dispatch, getStore) => {
  const store = getStore();
  const tabIndex = action.payload;
  const oldValueState = store.markdownByTabs[tabIndex];

  let valueState = new ValueState();
  if (oldValueState !== undefined) {
    valueState = new ValueState(oldValueState.value);
  }

  // Dispatch markdown update to force refresh without revision
  console.log('dispatch tabActivated: ', tabIndex);
  dispatch(tabActivated(tabIndex));
  console.log('dispatch markdownUpdated: ', valueState.toJSON());
  dispatch(markdownUpdated(tabIndex, valueState.toJSON()));
};
