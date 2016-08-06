import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {wrapStore, alias} from 'react-chrome-redux';

import rootReducer from './Reducers';
import aliases from './Aliases';

const store = createStore(
  rootReducer,
  applyMiddleware(
    alias(aliases),
    thunk
  )
);

wrapStore(store, {
  portName: 'Palavra',
});
