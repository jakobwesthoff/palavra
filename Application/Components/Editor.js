import React, {Component, PropTypes} from 'react';

import SimpleMDE from 'Components/SimpleMDE';

class Editor extends Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    cursorPosition: PropTypes.object.isRequired,
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
      <SimpleMDE value={this.props.value}
                 cursorPosition={this.props.cursorPosition}
                 onChange={this.props.onChange}
                 onCursorChange={this.props.onCursorChange}
      />
    );
  }
}

export default Editor;
