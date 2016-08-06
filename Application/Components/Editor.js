import React, {Component} from 'react';
import {connect} from 'react-redux';

import {markdownUpdate} from 'Actions/Markdown';

import SimpleMDE from 'Components/SimpleMDE';

class Editor extends Component {
  static propTypes = {
    value: React.PropTypes.string.isRequired,
  };

  handleMarkdownChanged = newMarkdown => {
    console.log("changed: ", newMarkdown);
    this.props.dispatch(markdownUpdate(newMarkdown));
  };

  render() {
    return (
      <SimpleMDE value={this.props.value}
                 onChange={this.handleMarkdownChanged}
      />
    );
  }
}

const mapStateToProps = state => ({
  value: state.markdown,
});

export default connect(mapStateToProps)(Editor);