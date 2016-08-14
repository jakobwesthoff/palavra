import React, {Component} from 'react';
import {connect} from 'react-redux';

import Editor from 'Components/Editor';

class Palavra extends Component {
  render() {
    return (
      <Editor value={this.props.value}
              cursorPosition={this.props.cursorPosition}
              dispatch={this.props.dispatch}/>
    );
  }
}

const mapStateToProps = state => ({
  value: state.markdown,
  cursorPosition: state.cursorPosition,
});

export default connect(mapStateToProps)(Palavra);
