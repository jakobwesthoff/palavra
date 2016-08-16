import {MARKDOWN_UPDATE} from 'Actions/Markdown';
import {CURSOR_POSITION_UPDATE} from 'Actions/CursorPosition';
import {
  TAB_ACTIVATE,
  TAB_ADD,
  TAB_REMOVE,
} from 'Actions/Tabs';

import {markdownUpdate} from './Markdown';
import {cursorPositionUpdate} from './CursorPosition';
import {
  tabActivate,
  tabAdd,
  tabRemove,
} from './Tabs';

const aliases = {
  [MARKDOWN_UPDATE]: markdownUpdate,
  [CURSOR_POSITION_UPDATE]: cursorPositionUpdate,
  [TAB_ACTIVATE]: tabActivate,
  [TAB_ADD]: tabAdd,
  [TAB_REMOVE]: tabRemove,
};

export default aliases;
