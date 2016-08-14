import React, {Component} from 'react';
import {connect} from 'react-redux';

import {tabActivate} from 'Actions/Tabs';
import {markdownUpdate} from 'Actions/Markdown';
import {cursorPositionUpdate} from 'Actions/CursorPosition';

import ValueState from 'Library/ValueState';
import CursorPositionState from 'Library/CursorPositionState';

import Editor from 'Components/Editor';
import Tabs from 'Components/Tabs';
import Tab from 'Components/Tab';

class Palavra extends Component {
  handleTabChanged = (newIndex) => {
    const {dispatch} = this.props;
    dispatch(tabActivate(newIndex));
  };

  handleValueChanged = newValueState => {
    const {dispatch, activeTab} = this.props;
    dispatch(markdownUpdate(activeTab, newValueState.toJSON()));
  };

  handleCursorPositionChanged = newPositionState => {
    const {dispatch, activeTab} = this.props;
    dispatch(cursorPositionUpdate(activeTab, newPositionState.toJSON()));
  };


  render() {
    return (
      <div>
        <Tabs onTabActivate={this.handleTabChanged}
              reverseOrder={true}>
          <Tab>Foo</Tab>
          <Tab>Bar</Tab>
          <Tab>Baz</Tab>
        </Tabs>
        <Editor valueState={this.props.valueState}
                cursorPositionState={this.props.cursorPositionState}
                onChange={this.handleValueChanged}
                onCursorChange={this.handleCursorPositionChanged}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const {activeTab, markdownByTabs, cursorPositionByTabs} = state;
  let valueState = new ValueState();
  let cursorPositionState = new CursorPositionState();

  console.log('mapping: ', activeTab, markdownByTabs[activeTab], markdownByTabs);

  if (markdownByTabs[activeTab] !== undefined) {
    valueState = ValueState.fromJSON(markdownByTabs[activeTab]);
  }

  if (cursorPositionByTabs[activeTab] !== undefined) {
    cursorPositionState = CursorPositionState.fromJSON(cursorPositionByTabs[activeTab]);
  }

  return {
    valueState,
    cursorPositionState,
    activeTab,
  };
};

export default connect(mapStateToProps)(Palavra);
