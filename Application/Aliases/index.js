import {MARKDOWN_UPDATE} from 'Actions/Markdown';
import {CURSOR_POSITION_UPDATE} from 'Actions/CursorPosition';
import {TAB_ACTIVATE} from 'Actions/Tabs';

import {markdownUpdate} from './Markdown';
import {cursorPositionUpdate} from './CursorPosition';
import {tabActivate} from './Tabs';

const aliases = {
  [MARKDOWN_UPDATE]: markdownUpdate,
  [CURSOR_POSITION_UPDATE]: cursorPositionUpdate,
  [TAB_ACTIVATE]: tabActivate,
};

export default aliases;
