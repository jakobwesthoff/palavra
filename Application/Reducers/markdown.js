import {MARKDOWN_UPDATED} from 'Actions/Markdown';

const initialState = '';

const markdown = (state = initialState, action) => {
  switch (action.type) {
    case MARKDOWN_UPDATED:
      return action.payload;
    default:
      return state;
  }
};

export default markdown;