import React, {Component, PropTypes} from 'react';

class Popover extends Component {
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

  onActivation() {
    /* noop */
  };
}

export default Popover;