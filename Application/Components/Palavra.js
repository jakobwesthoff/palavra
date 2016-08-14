import React, {Component} from 'react';
import {connect} from 'react-redux';

import {tabActivated} from 'Actions/Tabs';
import {markdownUpdate} from 'Actions/Markdown';
import {cursorPositionUpdate} from 'Actions/CursorPosition';

import Editor from 'Components/Editor';
import Tabs from 'Components/Tabs';
import Tab from 'Components/Tab';

class Palavra extends Component {
  handleTabChanged = (newIndex) => {
    const {dispatch} = this.props;
    dispatch(tabActivated(newIndex));
  };

  handleMarkdownChanged = newMarkdown => {
    const {dispatch, activeTab} = this.props;
    dispatch(markdownUpdate(activeTab, newMarkdown));
  };

  handleCursorChanged = newPosition => {
    const {dispatch, activeTab} = this.props;
    dispatch(cursorPositionUpdate(activeTab, newPosition));
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
        <Editor value={this.props.markdown}
                cursorPosition={this.props.cursorPosition}
                onChange={this.handleMarkdownChanged}
                onCursorChange={this.handleCursorChanged}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const {activeTab, markdownByTabs, cursorPositionByTabs} = state;
  let markdown = '';
  let cursorPosition = {line: 0, ch: 0};

  if (markdownByTabs[activeTab] !== undefined) {
    markdown = markdownByTabs[activeTab];
  }

  if (cursorPositionByTabs[activeTab] !== undefined) {
    cursorPosition = cursorPositionByTabs[activeTab];
  }

  return {
    markdown,
    cursorPosition,
    activeTab,
  };
};

export default connect(mapStateToProps)(Palavra);
