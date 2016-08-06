import {MARKDOWN_UPDATE} from 'Actions/Markdown';

const initialState = '';

const markdown = (state = initialState, action) => {
  switch (action.type) {
    case MARKDOWN_UPDATE:
      return action.payload;
    default:
      return state;
  }
};

export default markdown;