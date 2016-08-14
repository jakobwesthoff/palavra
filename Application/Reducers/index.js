import {combineReducers} from 'redux';

import markdownByTabs from './markdownByTabs';
import cursorPositionByTabs from './cursorPositionByTabs';
import extensionError from './extensionError';
import activeTab from './activeTab';

export default combineReducers({
  markdownByTabs,
  cursorPositionByTabs,
  extensionError,
  activeTab,
});
