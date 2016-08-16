import {combineReducers} from 'redux';

import markdownByTabs from './markdownByTabs';
import cursorPositionByTabs from './cursorPositionByTabs';
import extensionError from './extensionError';
import activeTab from './activeTab';
import revisions from './revisions';
import tabs from './tabs';

export default combineReducers({
  markdownByTabs,
  cursorPositionByTabs,
  extensionError,
  activeTab,
  revisions,
  tabs,
});
