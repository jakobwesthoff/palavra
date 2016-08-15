/* global chrome */

import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {wrapStore, alias} from 'react-chrome-redux';

import rootReducer from './Reducers';
import aliases from './Aliases';

chrome.storage.local.get('markdownByTabs', storage => {
  let markdownByTabs = {};
  if (chrome.runtime.lastError === undefined) {
    markdownByTabs = storage.markdownByTabs;
    // Remove revisions after initial load
    Object.keys(markdownByTabs).forEach(
      tabIndex => markdownByTabs[tabIndex].revision = 0
    );
  }
  const store = createStore(
    rootReducer,
    {markdownByTabs},
    applyMiddleware(
      alias(aliases),
      thunk
    )
  );

  wrapStore(store, {
    portName: 'Palavra',
  });
});

