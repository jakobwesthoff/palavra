import {
  TAB_ADDED,
  TAB_REMOVED,
  TAB_RENAMED,
} from 'Actions/Tabs';

const initialState = [{
  id: 'EF6759FA-980E-447D-AA79-C279B4C64903',
  name: 'New Tab',
}];

const tabs = (state = initialState, action) => {
  let newState = null;

  switch (action.type) {
    case TAB_ADDED:
      return [...state, {
        id: action.payload.id,
        name: action.payload.name,
      }];
    case TAB_REMOVED:
      return [...state]
        .filter(tab => tab.id !== action.payload.id);
    case TAB_RENAMED:
      newState = [...state];
      newState.find(tab => tab.id === action.payload.id)
        .name = action.payload.newName;
      return newState;
    default:
      return state;
  }
};

export default tabs;
