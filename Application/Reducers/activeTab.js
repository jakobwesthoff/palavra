import {TAB_ACTIVATED} from 'Actions/Tabs';

const initialState = 0;

const activeTab = (state = initialState, action) => {
  switch (action.type) {
    case TAB_ACTIVATED:
      console.log('activeTab reduced: ', action.payload);
      return action.payload;
    default:
      return state;
  }
};

export default activeTab;
