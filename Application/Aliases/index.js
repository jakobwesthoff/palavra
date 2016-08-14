import {MARKDOWN_UPDATE} from 'Actions/Markdown';
import {TAB_ACTIVATE} from 'Actions/Tabs';

import {markdownUpdate} from './Markdown';
import {tabActivate} from './Tabs';

const aliases = {
  [MARKDOWN_UPDATE]: markdownUpdate,
  [TAB_ACTIVATE]: tabActivate,
};

export default aliases;
