import React, {Component, PropTypes} from 'react';

class Tabs extends Component {
  static propTypes = {};

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

    console.log("Tab activated: ", index);
    this.setState({activeTabIndex: index});
  };

  renderChild = (child, index) => {
    return React.cloneElement(child, {
      onClick: () => this.handleTabClicked(index),
      active: this.state.activeTabIndex === index,
    });
  };

  render() {
    return (
      <ul className="tabs">
        {React.Children.map(this.props.children, this.renderChild)}
      </ul>
    );
  }
}

export default Tabs;
