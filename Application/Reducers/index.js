import {combineReducers} from 'redux';

import markdown from './markdown';
import extensionError from './extensionError';

export default combineReducers({
  markdown,
  extensionError,
});
