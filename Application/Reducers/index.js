import {combineReducers} from 'redux';

import markdown from './markdown';
import cursorPosition from './cursorPosition';
import extensionError from './extensionError';

export default combineReducers({
  markdown,
  cursorPosition,
  extensionError,
});
