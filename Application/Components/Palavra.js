import React, {Component} from 'react';
import {connect} from 'react-redux';
import uuid from 'uuid';

import {tabActivate, tabAdd, tabRemove} from 'Actions/Tabs';
import {markdownUpdate} from 'Actions/Markdown';
import {cursorPositionUpdate} from 'Actions/CursorPosition';
import {revisionValueSet, revisionCursorPositionSet} from 'Actions/Revision';

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

  handleTabAdd = () => {
    const {dispatch} = this.props;
    const newName = 'New Tab';
    const newId = uuid.v4({
      rng: uuid.whatwgRNG,
    });
    dispatch(tabAdd(newId, newName));
  };

  handleTabRemove = (id) => {
    const {dispatch} = this.props;
    if (this.props.tabs.length === 1) {
      return;
    }
    const position = this.props.tabs.findIndex(tab => tab.id === id);
    // Fix rendering bug
    if (position === 0) {
      const newId = this.props.tabs[1].id;
      dispatch(tabRemove(id));
      dispatch(tabActivate(newId));
    } else {
      dispatch(tabActivate(this.props.tabs[position - 1].id));
      dispatch(tabRemove(id));
    }
  };

  handleValueChanged = newValueState => {
    const {dispatch, activeTab} = this.props;
    dispatch(markdownUpdate(activeTab, newValueState.toJSON()));
  };

  handleValueRevisionChanged = newRevision => {
    const {dispatch} = this.props;
    dispatch(revisionValueSet(newRevision));
  };

  handleCursorPositionChanged = newPositionState => {
    const {dispatch, activeTab} = this.props;
    dispatch(cursorPositionUpdate(activeTab, newPositionState.toJSON()));
  };

  handleCursorPositionRevisionChanged = newRevision => {
    const {dispatch} = this.props;
    dispatch(revisionCursorPositionSet(newRevision));
  };

  renderTab(tab, index) {
    return (
      <Tab key={tab.id}
           id={tab.id}
           name={tab.name}
      />
    );
  }

  render() {
    return (
      <div>
        <Tabs onTabActivate={this.handleTabChanged}
              onTabAdd={this.handleTabAdd}
              onTabRemove={this.handleTabRemove}
              reverseOrder={true}
              activeTabId={this.props.activeTab}>
          {this.props.tabs.map(this.renderTab)}
        </Tabs>
        <Editor valueState={this.props.valueState}
                cursorPositionState={this.props.cursorPositionState}
                onValueChange={this.handleValueChanged}
                onValueRevisionChange={this.handleValueRevisionChanged}
                onCursorPositionChange={this.handleCursorPositionChanged}
                onCursorPositionRevisionChange={this.handleCursorPositionRevisionChanged}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const {
    activeTab,
    markdownByTabs,
    cursorPositionByTabs,
    tabs,
  } = state;

  let valueState = new ValueState();
  let cursorPositionState = new CursorPositionState();

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
    tabs,
  };
};

export default connect(mapStateToProps)(Palavra);
