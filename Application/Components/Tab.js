import React, {Component, PropTypes} from 'react';
import cx from 'classnames';

class Tab extends Component {
  constructor(props) {
    super(props);

    this._closeButton = null;
  }
  static propTypes = {
    id: PropTypes.string.isRequired,
    active: PropTypes.bool,
    disableClose: PropTypes.bool,
    onClick: PropTypes.func,
    onCloseClick: PropTypes.func,
  };

  static defaultProps = {
    active: false,
    disableClose: false,
    onClick: () => {
      /** noop **/
    },
    onCloseClick: () => {
      /** noop **/
    },
  };

  handleTabActivated = () => {
    this.props.onClick(this.props.id);
  };

  handleCloseClick = () => {
    // Only issue click if element was visible
    const computed = window.getComputedStyle(
      this._closeButton,
      null
    );
    const opacity = computed.getPropertyValue('opacity');

    if (opacity > .9) {
      this.props.onCloseClick();
    }
  };

  render() {
    const closeButton = (
      <button ref={button => this._closeButton = button}
              className="close"
              onClick={this.handleCloseClick}>
        <i className="fa fa-times-circle" />
      </button>
    );

    return (
      <li className={cx('tab', {active: this.props.active})}
          onClick={this.handleTabActivated}>
        {this.props.children}
        {!this.props.disableClose ? closeButton : null}
      </li>
    );
  }
}

export default Tab;
