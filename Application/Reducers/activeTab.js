import {TAB_ACTIVATED} from 'Actions/Tabs';

const initialState = 'EF6759FA-980E-447D-AA79-C279B4C64903';

const activeTab = (state = initialState, action) => {
  switch (action.type) {
    case TAB_ACTIVATED:
      return action.payload;
    default:
      return state;
  }
};

export default activeTab;
