import React, {Component, PropTypes} from 'react';

class CloseQuestion extends Component {
  static propTypes = {
    onAccept: PropTypes.func,
    onCancel: PropTypes.func,
  };

  static defaultProps = {
    onAccept: () => {
      /* noop */
    },
    onCancel: () => {
      /* noop */
    },
  };

  onActivation = () => {
    /* noop */
  };

  render() {
    return (
      <div className="dialog">
        <div className="header">
          Remove this tab
        </div>
        <div className="body">
          Are you sure you want to irrevocably remove this tab and all of its contents?
        </div>
        <div className="buttons">
          <button onClick={this.props.onCancel}>Cancel</button>
          <button onClick={this.props.onAccept}>Remove</button>
        </div>
      </div>
    );
  }
}

export default CloseQuestion;