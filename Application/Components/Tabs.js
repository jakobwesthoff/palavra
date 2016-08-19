import React, {Component, PropTypes} from 'react';
import {findDOMNode} from 'react-dom';

import Popover from 'react-popover';

import getRelativeElementGeometry from 'Library/getRelativeElementGeometry';

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
    onTabRename: PropTypes.func,
    reverseOrder: PropTypes.bool,
    children: PropTypes.array,
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
    onTabRename: () => {
      /* noop */
    },
    reverseOrder: false,
  };

  constructor(props) {
    super(props);

    this._tabReferences = new Map();
    this._activePopoverComponent = null;

    this.state = {
      currentlyVisibleTabId: props.activeTabId,
      popoverTabId: null,
      popoverType: null,
      popoverBlindGeometry: {},
      popoverIsActive: false,
    };
  }

  handleTabClick = id => {
    if (this.state.currentlyVisibleTabId === id) {
      return;
    }

    this.deactivatePopover();
    this.setState({
      currentlyVisibleTabId: id
    });
    this.props.onTabActivate(id);
  };

  handleTabConfigureClick = id => {
    this.activatePopover(id, Tabs.POPOVER_CONFIGURATION);
  };

  handleTabCloseClick = id => {
    this.activatePopover(id, Tabs.POPOVER_CLOSE_QUESTION);
  };

  handleCancelClick(id) {
    this.deactivatePopover();
  }

  handleCloseAcceptClick(id) {
    this.deactivatePopover(Tabs.POPOVER_CLOSE_QUESTION);
    this.props.onTabRemove(id);
  }

  handleConfigurationAcceptClick(id, newName) {
    this.deactivatePopover(Tabs.POPOVER_CONFIGURATION);
    this.props.onTabRename(id, newName);
  }

  bringChildrenIntoOrder(propsChildren) {
    const children = React.Children.toArray(propsChildren);
    if (this.props.reverseOrder === true) {
      children.reverse();
    }

    return children;
  }

  renderPopover(id, {tabName = ''}) {
    switch (this.state.popoverType) {
      case Tabs.POPOVER_CLOSE_QUESTION:
        return (
          <CloseQuestion ref={component => this._activePopoverComponent = component}
                         onCancel={() => this.handleCancelClick(id)}
                         onAccept={() => this.handleCloseAcceptClick(id)}/>
        );
      case Tabs.POPOVER_CONFIGURATION:
        return (
          <Configuration ref={component => this._activePopoverComponent = component}
                         name={tabName}
                         onCancel={() => this.handleCancelClick(id)}
                         onAccept={newName => this.handleConfigurationAcceptClick(id, newName)}/>
        );
      default:
        return <div />
    }
  }

  renderPopoverBlind(tabRef) {
    // Might be null upon initial render
    const tabId = this.state.popoverTabId;

    let tabName = undefined;
    if (tabRef !== undefined) {
      tabName = tabRef.props.name;
    }

    return (
      <Popover key="popoverblind"
               body={this.renderPopover(tabId, {tabName})}
               isOpen={this.state.popoverIsActive}
               preferPlace="below">
        <li style={{
          ...this.state.popoverBlindGeometry,
          position: 'absolute',
          visibility: 'hidden',
          display: tabId === null ? 'none' : 'block',
          zIndex: -1,
        }}/>
      </Popover>
    );
  }

  renderTab = (child, id, onlyOneChild) => {
    return React.cloneElement(child, {
      key: id,
      ref: reference => this._tabReferences.set(id, reference),
      onClick: () => this.handleTabClick(id),
      onConfigureClick: () => this.handleTabConfigureClick(id),
      onCloseClick: () => this.handleTabCloseClick(id),
      active: this.state.currentlyVisibleTabId === id,
      disableClose: onlyOneChild,
    });
  };

  render() {
    this._tabReferences = new Map();
    const orderedChildren = this.bringChildrenIntoOrder(this.props.children);
    const tabs = orderedChildren
      .map(child => this.renderTab(
        child,
        child.props.id,
        orderedChildren.length === 1
      ));

    return (
      <ul className="tabs">
        {tabs}
        <li key="action-add"
            className="action add"
            onClick={this.props.onTabAdd}>
          <i className="fa fa-plus"/>
        </li>
        {this.renderPopoverBlind(
          tabs.find(tab => tab.props.id === this.state.popoverTabId)
        )}
      </ul>
    );
  }

  activatePopover(tabId, type) {
    if (this.state.popoverIsActive) {
      return;
    }

    this.setState({
      popoverIsActive: true,
      popoverTabId: tabId,
      popoverType: type,
      popoverBlindGeometry: getRelativeElementGeometry(
        findDOMNode(
          this._tabReferences.get(tabId)
        )
      ),
    });
  }

  deactivatePopover(type = null) {
    if (type !== null && this.state.popoverType !== type) {
      return;
    }

    this.setState({
      popoverIsActive: false,
    });
  }


  componentDidMount() {
    this.props.onTabActivate(this.state.currentlyVisibleTabId);
  }

  componentDidUpdate(previousProps, previousState) { /* eslint-disable-line no-unused-vars */
    if (
      (
        this.state.popoverIsActive !== previousState.popoverIsActive ||
        this.state.popoverTabId !== previousState.popoverTabId ||
        this.state.popoverType !== previousState.popoverType
      ) &&
      this._activePopoverComponent !== null
    ) {
      this._activePopoverComponent.onActivation();
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.activeTabId !== this.state.currentlyVisibleTabId) {
      this.setState({currentlyVisibleTabId: newProps.activeTabId});
      this.props.onTabActivate(newProps.activeTabId);
    }
  }
}

export default Tabs;
