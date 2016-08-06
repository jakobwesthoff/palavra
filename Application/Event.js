/* global chrome */

import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {wrapStore, alias} from 'react-chrome-redux';

import rootReducer from './Reducers';
import aliases from './Aliases';

chrome.storage.local.get('markdown', storage => {
  let markdown = '';
  if (chrome.runtime.lastError === undefined) {
    markdown = storage.markdown;
  }
  const store = createStore(
    rootReducer,
    {markdown},
    applyMiddleware(
      alias(aliases),
      thunk
    )
  );

  wrapStore(store, {
    portName: 'Palavra',
  });
});

