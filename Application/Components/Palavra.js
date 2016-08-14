import React, {Component} from 'react';
import {connect} from 'react-redux';

import Editor from 'Components/Editor';
import Tabs from 'Components/Tabs';
import Tab from 'Components/Tab';

class Palavra extends Component {
  handleTabChanged = (...args) => {
    console.log(...args);
  };

  render() {
    return (
      <div>
        <Tabs>
          <Tab>Foo</Tab>
          <Tab>Bar</Tab>
          <Tab>Baz</Tab>
        </Tabs>
        <Editor value={this.props.value}
                cursorPosition={this.props.cursorPosition}
                dispatch={this.props.dispatch}/>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  value: state.markdown,
  cursorPosition: state.cursorPosition,
});

export default connect(mapStateToProps)(Palavra);
