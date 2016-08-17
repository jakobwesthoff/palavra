import React, {Component, PropTypes} from 'react';
import cx from 'classnames';
import debounce from 'lodash.debounce';

class Tab extends Component {
  constructor(props) {
    super(props);

    this._secondClick = false;
    this._closeButton = null;
  }

  static propTypes = {
    id: PropTypes.string.isRequired,
    active: PropTypes.bool,
    disableClose: PropTypes.bool,
    onClick: PropTypes.func,
    onDoubleClick: PropTypes.func,
    onCloseClick: PropTypes.func,
  };

  static defaultProps = {
    active: false,
    disableClose: false,
    onClick: () => {
      /** noop **/
    },
    onDoubleClick: () => {
      /** noop **/
    },
    onCloseClick: () => {
      /** noop **/
    },
  };

  _removeSecondClickFlagAfterDelay = debounce(() => {
    this._secondClick = false;
  }, 300);

  handleTabSingleClick = event => {
    this.props.onClick(this.props.id);
  };

  handleTabDoubleClick = event => {
    this.props.onDoubleClick(this.props.id);
  };

  handleTabClick = event => {
    if (this._secondClick === true) {
      this._secondClick = false;
      this._removeSecondClickFlagAfterDelay.cancel();
      this.handleTabDoubleClick(event);
    } else {
      this.handleTabSingleClick(event);
      this._secondClick = true;
      this._removeSecondClickFlagAfterDelay();
    }
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
        <i className="fa fa-times-circle"/>
      </button>
    );

    return (
      <li className={cx('tab', {active: this.props.active})}
          onClick={this.handleTabClick}>
        {this.props.children}
        {!this.props.disableClose ? closeButton : null}
      </li>
    );
  }
}

export default Tab;
