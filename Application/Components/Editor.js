import React, {Component, PropTypes} from 'react';

import {markdownUpdate} from 'Actions/Markdown';
import {cursorPositionUpdate} from 'Actions/CursorPosition';

import SimpleMDE from 'Components/SimpleMDE';

class Editor extends Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    cursorPosition: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
  };

  handleMarkdownChanged = newMarkdown => {
    this.props.dispatch(markdownUpdate(newMarkdown));
  };

  handleCursorChanged = newPosition => {
    this.props.dispatch(cursorPositionUpdate(newPosition));
  };

  render() {
    return (
      <SimpleMDE value={this.props.value}
                 cursorPosition={this.props.cursorPosition}
                 onChange={this.handleMarkdownChanged}
                 onCursorChange={this.handleCursorChanged}
      />
    );
  }
}

export default Editor;
