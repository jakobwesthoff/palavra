import React, {Component, PropTypes} from 'react';

import ValueState from 'Library/ValueState';
import CursorPositionState from 'Library/CursorPositionState';

import SimpleMDE from 'Components/SimpleMDE';

class Editor extends Component {
  static propTypes = {
    valueState: React.PropTypes.instanceOf(ValueState).isRequired,
    cursorPositionState: React.PropTypes.instanceOf(CursorPositionState).isRequired,
    onChange: PropTypes.func,
    onCursorChange: PropTypes.func,
  };

  static defaultProps = {
    onChange: () => {
      /* noop */
    },
    onCursorChange: () => {
      /* noop */
    },
  };

  render() {
    return (
      <SimpleMDE valueState={this.props.valueState}
                 cursorPositionState={this.props.cursorPositionState}
                 onChange={this.props.onChange}
                 onCursorChange={this.props.onCursorChange}
      />
    );
  }
}

export default Editor;
