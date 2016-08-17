import React, {Component, PropTypes} from 'react';
import Popover from 'react-popover';

import CloseQuestion from './Popover/CloseQuestion';
import Configuration from './Popover/Configuration';

class Tabs extends Component {
  static POPOVER_CLOSE_QUESTION = 'popover.question.close';
  static POPOVER_CONFIGURATION = 'popover.configuration';

  static propTypes = {
    activeTabId: PropTypes.string.isRequired,
    onTabActivate: PropTypes.func,
    onTabAdd: PropTypes.func,
    onTabRemove: PropTypes.func,
    reverseOrder: PropTypes.bool,
  };

  static defaultProps = {
    onTabActivate: () => {
      /* noop */
    },
    onTabAdd: () => {
      /* noop */
    },
    onTabRemove: () => {
      /* noop */
    },
    reverseOrder: false,
  };

  constructor(props) {
    super(props);

    this.state = {
      currentlyVisibleTabId: props.activeTabId,
      activePopover: null,
      popoverType: null,
    };
  }

  handleTabClick = id => {
    if (this.state.currentlyVisibleTabId === id) {
      return;
    }

    this.setState({
      activePopover: null,
      currentlyVisibleTabId: id
    });
    this.props.onTabActivate(id);
  };

  handleTabDoubleClick = id => {
    if (this.state.activePopover !== null) {
      return;
    }

    this.setState({
      activePopover: id,
      popoverType: Tabs.POPOVER_CONFIGURATION,
    });
  };

  handleTabCloseClick = id => {
    if (this.state.activePopover !== null) {
      return;
    }

    this.setState({
      activePopover: id,
      popoverType: Tabs.POPOVER_CLOSE_QUESTION,
    });
  };

  handleCloseCancelClick(id) {
    this.setState({
      activePopover: null,
    });
  }

  handleCloseAcceptClick(id) {
    this.setState({
      activePopover: null,
    });
    this.props.onTabRemove(id);
  }

  bringChildrenIntoOrder(propsChildren) {
    const children = React.Children.toArray(propsChildren);
    if (this.props.reverseOrder === true) {
      children.reverse();
    }

    return children;
  }

  renderPopover(id, child) {
    switch (this.state.popoverType) {
      case Tabs.POPOVER_CLOSE_QUESTION:
        return (
          <CloseQuestion onCancel={() => this.handleCloseCancelClick(id)}
                         onAccept={() => this.handleCloseAcceptClick(id)}/>
        );
      case Tabs.POPOVER_CONFIGURATION:
        return (
          <Configuration name={child.props.name}
          />
        );
      default:
        return <div />
    }
  }

  renderTab = (child, id, onlyOneChild) => {
    return (
      <Popover key={id}
               body={this.renderPopover(id, child)}
               isOpen={this.state.activePopover === id}
               preferPlace="below">
        {React.cloneElement(child, {
          onClick: () => this.handleTabClick(id),
          onDoubleClick: () => this.handleTabDoubleClick(id),
          onCloseClick: () => this.handleTabCloseClick(id),
          active: this.state.currentlyVisibleTabId === id,
          disableClose: onlyOneChild,
        })}
      </Popover>
    );
  };

  render() {
    const orderedChildren = this.bringChildrenIntoOrder(this.props.children);

    return (
      <ul className="tabs">
        {
          orderedChildren
            .map(child => this.renderTab(
              child,
              child.props.id,
              orderedChildren.length === 1
            ))
        }
        <li className="action add"
            onClick={this.props.onTabAdd}>
          <i className="fa fa-plus"/>
        </li>
      </ul>
    );
  }

  componentDidMount() {
    this.props.onTabActivate(this.state.currentlyVisibleTabId);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.activeTabId !== this.state.currentlyVisibleTabId) {
      this.setState({currentlyVisibleTabId: newProps.activeTabId});
      this.props.onTabActivate(newProps.activeTabId);
    }
  }
}

export default Tabs;
