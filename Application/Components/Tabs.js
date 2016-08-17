import React, {Component, PropTypes} from 'react';
import Popover from 'react-popover';

class Tabs extends Component {
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
      openCloseQuestion: null,
    };
  }

  handleTabClick = id => {
    if (this.state.currentlyVisibleTabId === id) {
      return;
    }

    this.setState({
      openCloseQuestion: null,
      currentlyVisibleTabId: id
    });
    this.props.onTabActivate(id);
  };

  handleTabDoubleClick = id => {
    console.log('double click: ', id);
  };

  handleTabCloseClick = id => {
    this.setState({openCloseQuestion: id});
  };

  handleCloseCancelClick(id) {
    this.setState({openCloseQuestion: null});
  }

  handleCloseAcceptClick(id) {
    this.props.onTabRemove(id);
  }

  bringChildrenIntoOrder(propsChildren) {
    const children = React.Children.toArray(propsChildren);
    if (this.props.reverseOrder === true) {
      children.reverse();
    }

    return children;
  }

  renderRemoveQuestion(id) {
    return (
      <div className="dialog">
        <div className="header">
          Remove this tab
        </div>
        <div className="body">
          Are you sure you want to irrevocably remove this tab and all of its contents?
        </div>
        <div className="buttons">
          <button onClick={() => this.handleCloseCancelClick(id)}>Cancel</button>
          <button onClick={() => this.handleCloseAcceptClick(id)}>Remove</button>
        </div>
      </div>
    );
  }

  renderTab = (child, id, onlyOneChild) => {
    return (
      <Popover key={id}
               body={this.renderRemoveQuestion(id)}
               isOpen={this.state.openCloseQuestion === id}
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
