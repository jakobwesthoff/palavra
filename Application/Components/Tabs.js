import React, {Component, PropTypes} from 'react';

class Tabs extends Component {
  static propTypes = {
    activeTabIndex: PropTypes.number.isRequired,
    onTabActivate: PropTypes.func,
    reverseOrder: PropTypes.bool,
  };

  static defaultProps = {
    onTabActivate: () => {
      /* noop */
    },
    reverseOrder: false,
  };

  constructor(props) {
    super(props);

    this.state = {
      currentlyVisibleTabIndex: props.activeTabIndex,
    };
  }

  handleTabClicked = index => {
    if (this.state.currentlyVisibleTabIndex === index) {
      return;
    }

    this.setState({currentlyVisibleTabIndex: index});
    this.props.onTabActivate(index);
  };

  bringChildrenIntoOrder(propsChildren) {
    const children = React.Children.toArray(propsChildren);
    if (this.props.reverseOrder === true) {
      children.reverse();
    }

    return children;
  }

  renderChild = (child, index) => {
    return React.cloneElement(child, {
      onClick: () => this.handleTabClicked(index),
      active: this.state.currentlyVisibleTabIndex === index,
    });
  };

  render() {
    return (
      <ul className="tabs">
        {this.bringChildrenIntoOrder(this.props.children).map(this.renderChild)}
        <li className="action add">
          <i className="fa fa-plus"/>
        </li>
      </ul>
    );
  }

  componentDidMount() {
    this.props.onTabActivate(this.state.currentlyVisibleTabIndex);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.activeTabIndex !== this.state.currentlyVisibleTabIndex) {
      this.setState({currentlyVisibleTabIndex: newProps.activeTabIndex});
      this.props.onTabActivate(newProps.activeTabIndex);
    }
  }
}

export default Tabs;
