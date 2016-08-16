import {
  TAB_ADDED,
  TAB_REMOVED
} from 'Actions/Tabs';

const initialState = [{
  id: 'EF6759FA-980E-447D-AA79-C279B4C64903',
  name: 'New Tab 1',
}];

const tabs = (state = initialState, action) => {
  switch (action.type) {
    case TAB_ADDED:
      return [...state, {
        id: action.payload.id,
        name: action.payload.name,
      }];
    case TAB_REMOVED:
      return [...state]
        .filter(tab => tab.id !== action.payload.id);
    default:
      return state;
  }
};

export default tabs;
