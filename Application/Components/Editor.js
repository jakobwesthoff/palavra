import React, {Component, PropTypes} from 'react';

import ValueState from 'Library/ValueState';
import CursorPositionState from 'Library/CursorPositionState';

import SimpleMDE from 'Components/SimpleMDE';

class Editor extends Component {
  static propTypes = {
    valueState: React.PropTypes.instanceOf(ValueState).isRequired,
    cursorPositionState: React.PropTypes.instanceOf(CursorPositionState).isRequired,
    onValueChange: PropTypes.func,
    onValueRevisionChange: PropTypes.func,
    onCursorPositionChange: PropTypes.func,
    onCursorPositionRevisionChange: PropTypes.func,
  };

  static defaultProps = {
    onValueChange: () => {
      /* noop */
    },
    onValueRevisionChange: () => {
      /* noop */
    },
    onCursorPositionChange: () => {
      /* noop */
    },
    onCursorPositionRevisionChange: () => {
      /* noop */
    },
  };

  render() {
    return (
      <SimpleMDE valueState={this.props.valueState}
                 cursorPositionState={this.props.cursorPositionState}
                 onValueChange={this.props.onValueChange}
                 onValueRevisionChange={this.props.onValueRevisionChange}
                 onCursorPositionChange={this.props.onCursorPositionChange}
                 onCursorPositionRevisionChange={this.props.onCursorPositionRevisionChange}
      />
    );
  }
}

export default Editor;
