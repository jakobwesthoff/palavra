import React, {Component} from 'react';
import {connect} from 'react-redux';

import Editor from 'Components/Editor';

class Palavra extends Component {
  render() {
    return (
      <div>
        <h1>Palavra Application</h1>
        <Editor />
      </div>
    );
  }
}

export default Palavra;