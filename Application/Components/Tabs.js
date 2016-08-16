import React, {Component, PropTypes} from 'react';

class Tabs extends Component {
  static propTypes = {
    activeTabId: PropTypes.string.isRequired,
    onTabActivate: PropTypes.func,
    onTabAddClick: PropTypes.func,
    onTabCloseClick: PropTypes.func,
    reverseOrder: PropTypes.bool,
  };

  static defaultProps = {
    onTabActivate: () => {
      /* noop */
    },
    onTabAddClick: () => {
      /* noop */
    },
    onTabCloseClick: () => {
      /* noop */
    },
    reverseOrder: false,
  };

  constructor(props) {
    super(props);

    this.state = {
      currentlyVisibleTabId: props.activeTabId,
    };
  }

  handleTabClick = id => {
    if (this.state.currentlyVisibleTabId === id) {
      return;
    }

    this.setState({currentlyVisibleTabId: id});
    this.props.onTabActivate(id);
  };

  handleTabCloseClick = id => {
    this.props.onTabCloseClick(id);
  };

  bringChildrenIntoOrder(propsChildren) {
    const children = React.Children.toArray(propsChildren);
    if (this.props.reverseOrder === true) {
      children.reverse();
    }

    return children;
  }

  renderChild = (child, id, onlyOneChild) => {
    return React.cloneElement(child, {
      onClick: () => this.handleTabClick(id),
      onCloseClick: () => this.handleTabCloseClick(id),
      active: this.state.currentlyVisibleTabId === id,
      disableClose: onlyOneChild,
    });
  };

  render() {
    const orderedChildren = this.bringChildrenIntoOrder(this.props.children);
    return (
      <ul className="tabs">
        {
          orderedChildren
            .map(child => this.renderChild(
              child,
              child.props.id,
              orderedChildren.length === 1
            ))
        }
        <li className="action add"
            onClick={this.props.onTabAddClick}>
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
