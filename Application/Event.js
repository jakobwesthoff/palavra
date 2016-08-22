/* global chrome */

import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {wrapStore, alias} from 'react-chrome-redux';

import rootReducer from './Reducers';
import aliases from './Aliases';

import migrations from './Migrations';

function removeRevision(storage) {
  if (typeof storage === 'object' && storage.revision !== undefined) {
    storage.revision = 0;
    return;
  }

  Object.keys(storage).forEach(key => {
    if (typeof storage[key] === 'object') {
      removeRevision(storage[key]);
    }
  });
}

const loadedStateKeys = [
  'markdownByTabs',
  'cursorPositionByTabs',
  'tabs',
  'activeTab',
];

window.__palavra_ready_ = migrations.run()
  .then(() => new Promise(
    (resolve, reject) => chrome.storage.local.get(loadedStateKeys, storage => {
      if (chrome.runtime.lastError !== undefined) {
        // @TODO: handle error
      }

      removeRevision(storage);

      const store = createStore(
        rootReducer,
        storage,
        applyMiddleware(
          alias(aliases),
          thunk
        )
      );

      wrapStore(store, {
        portName: 'Palavra',
      });

      resolve();
    })
  )
);
