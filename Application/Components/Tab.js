import React, {Component, PropTypes} from 'react';
import cx from 'classnames';

class Tab extends Component {
  static propTypes = {
    active: PropTypes.bool,
    onClick: PropTypes.func,
  };

  static defaultProps = {
    active: false,
    onClick: () => {
      /** noop **/
    },
  };

  handleTabActivated = () => {
    this.props.onClick();
  };

  render() {
    return (
      <li className={cx('tab', {active: this.props.active})}
          onClick={this.handleTabActivated}>
        {this.props.children}
      </li>
    );
  }
}

export default Tab;
