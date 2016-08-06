/* global document, chrome */

import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {Store} from 'react-chrome-redux';

import Palavra from 'Components/Palavra';

// Make sure background is ready before running any init code
chrome.runtime.getBackgroundPage(() => {
  const store = new Store({
    portName: 'Palavra',
  });

  // Render after first store sync
  const unsubscribe = store.subscribe(() => {
    unsubscribe(); // one shot only
    render(
      <Provider store={store}>
        <Palavra />
      </Provider>,
      document.getElementById('palavra')
    );
  });
});

