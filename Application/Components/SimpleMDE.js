/* global document */

import React, {Component} from 'react';
import SimpleMDE from 'simplemde';
import isEqual from 'lodash.isequal';

class SimpleMDEComponent extends Component {
  constructor(props) {
    super(props);

    this._changedByUser = false;

    this.state = {
      lastValue: props.value,
      lastCursorPosition: props.cursorPosition,
    };
  }

  static propTypes = {
    value: React.PropTypes.string.isRequired,
    cursorPosition: React.PropTypes.object.isRequired,
    onChange: React.PropTypes.func,
    onCursorChange: React.PropTypes.func,
    options: React.PropTypes.object,
  };

  static defaultProps = {
    onChange: () => {
      // noop
    },
    onCursorChange: () => {
      // noop
    },
  };

  handleVisibilityChanged = () => {
    const {simplemde} = this.state;
    if (document.hidden !== true) {
      simplemde.codemirror.focus();
    }
  };


  handleDocumentBodyClicked = () => {
    this.state.simplemde.codemirror.focus();
  };

  handleEditorKeyUpOrMouseUp = () => {
    const {simplemde, lastCursorPosition, lastValue} = this.state;

    this._changedByUser = true;

    const value = simplemde.value();
    if (lastValue !== value) {
      this.props.onChange(value);
    }

    const cursorPosition = simplemde.codemirror.getCursor('head');
    if (!isEqual(lastCursorPosition, cursorPosition)) {
      this.props.onCursorChange(cursorPosition);
    }

    this.setState({
      lastValue: value,
      lastCursorPosition: cursorPosition,
    });
  };

  componentDidMount() {
    const defaultOptions = {
      spellChecker: false,
      status: false,
      toolbar: false,
      forceSync: false,
      shortcuts: {
        /* eslint-disable quote-props */
        'toggleBlockquote': null,
        'toggleBold': null,
        'cleanBlock': null,
        'toggleHeadingSmaller': null,
        'toggleItalic': null,
        'drawLink': null,
        'toggleUnorderedList': null,
        'togglePreview': null,
        'toggleCodeBlock': null,
        'drawImage': null,
        'toggleOrderedList': null,
        'toggleHeadingBigger': null,
        'toggleSideBySide': null,
        'toggleFullScreen': null,
        /* eslint-enable */
      },
    };

    const priorityOptions = {
      element: this.refs.textarea,
    };

    const simplemde = new SimpleMDE(
      Object.assign({}, defaultOptions, this.props.options, priorityOptions)
    );
    simplemde.codemirror.setOption('viewportMargin', Infinity);
    simplemde.value(this.props.value);

    /*
     * The events on the editor container are fired AFTER the internal
     * codemirror has handled the event, which makes them ideal for our purposes.
     */
    this.refs.editor.addEventListener('keyup', this.handleEditorKeyUpOrMouseUp, false);
    this.refs.editor.addEventListener('mouseup', this.handleEditorKeyUpOrMouseUp, false);

    this.setState({simplemde});

    document.addEventListener('click', this.handleDocumentBodyClicked);
    document.addEventListener('visibilitychange', this.handleVisibilityChanged);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleDocumentBodyClicked);
    document.removeEventListener('visibilitychange', this.handleVisibilityChanged);
  }

  componentWillReceiveProps(nextProps) {
    if (this._changedByUser === true) {
      this._changedByUser = false;
      return;
    }

    this.state.simplemde.value(nextProps.value);
    this.state.simplemde.codemirror.setCursor(nextProps.cursorPosition);
  }

  render() {
    return (
      <div ref="editor" className="editor-container">
        <textarea ref="textarea"/>
      </div>
    );
  }
}

export default SimpleMDEComponent;
