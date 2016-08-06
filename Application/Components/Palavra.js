import React, {Component} from 'react';
import {connect} from 'react-redux';

import Editor from 'Components/Editor';

class Palavra extends Component {
  render() {
    return (
      <Editor />
    );
  }
}

export default Palavra;