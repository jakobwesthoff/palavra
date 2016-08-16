import cloneDeep from 'lodash.clonedeep';

import {MARKDOWN_UPDATED} from 'Actions/Markdown';
import {TAB_REMOVED} from 'Actions/Tabs';

const initialState = {};

const markdownByTabs = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case MARKDOWN_UPDATED:
      newState = cloneDeep(state);
      newState[action.payload.tabIndex] = action.payload.valueState;
      return newState;
    case TAB_REMOVED:
      newState = cloneDeep(state);
      if (newState[action.payload.id] !== undefined) {
        delete newState[action.payload.id];
      }
      return newState;
    default:
      return state;
  }
};

export default markdownByTabs;
