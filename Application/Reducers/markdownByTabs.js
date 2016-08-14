import cloneDeep from 'lodash.clonedeep';

import {MARKDOWN_UPDATED} from 'Actions/Markdown';

const initialState = {};

const markdownByTabs = (state = initialState, action) => {
  switch (action.type) {
    case MARKDOWN_UPDATED:
      const newState = cloneDeep(state);
      newState[action.payload.tabIndex] = action.payload.markdown;
      return newState;
    default:
      return state;
  }
};

export default markdownByTabs;
