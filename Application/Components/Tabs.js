import React, {Component, PropTypes} from 'react';

class Tabs extends Component {
  static propTypes = {
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
      activeTabIndex: 0,
    };
  }

  handleTabClicked = index => {
    if (this.state.activeTabIndex === index) {
      return;
    }

    this.props.onTabActivate(index);

    this.setState({activeTabIndex: index});
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
      active: this.state.activeTabIndex === index,
    });
  };

  render() {
    return (
      <ul className="tabs">
        {this.bringChildrenIntoOrder(this.props.children).map(this.renderChild)}
      </ul>
    );
  }
}

export default Tabs;
