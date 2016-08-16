/* global document */

import React, {Component} from 'react';
import ValueState from 'Library/ValueState';
import CursorPositionState from 'Library/CursorPositionState';
import SimpleMDE from 'simplemde';
import debounce from 'lodash.debounce';

class Editor extends Component {
  static propTypes = {
    valueState: React.PropTypes.instanceOf(ValueState).isRequired,
    cursorPositionState: React.PropTypes.instanceOf(CursorPositionState).isRequired,
    onValueChange: React.PropTypes.func,
    onValueRevisionChange: React.PropTypes.func,
    onCursorPositionChange: React.PropTypes.func,
    onCursorPositionRevisionChange: React.PropTypes.func,
    options: React.PropTypes.object,
    debounce: React.PropTypes.number,
  };

  static defaultProps = {
    onValueChange: () => {
      // noop
    },
    onValueRevisionChange: () => {
      // noop
    },
    onCursorPositionChange: () => {
      // noop
    },
    onCursorPositionRevisionChange: () => {
      // noop
    },
    debounce: 500,
  };

  constructor(props) {
    super(props);

    this.state = {
      lastValueRevision: 0,
      lastCursorPositionRevision: 0,
      lastValueState: props.valueState,
      lastCursorPositionState: props.cursorPositionState,
    };

    this.debouncedOnChange = debounce(props.onValueChange, props.debounce);
    this.debouncedOnCursorChange = debounce(props.onCursorPositionChange, props.debounce);
  }

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
    const {
      simplemde,
      lastCursorPositionState,
      lastCursorPositionRevision,
      lastValueState,
      lastValueRevision,
    } = this.state;

    const value = simplemde.value();
    if (lastValueState.value !== value) {
      this.setState(
        {lastValueRevision: lastValueRevision + 1},
        () => this.props.onValueRevisionChange(lastValueRevision + 1)
      );
      this.debouncedOnChange(new ValueState(value, lastValueRevision + 1));
    }

    const cursorPosition = simplemde.codemirror.getCursor('head');
    const {line, ch: character} = cursorPosition;
    if (
      lastCursorPositionState.line !== line ||
      lastCursorPositionState.character !== character
    ) {
      this.setState(
        {lastCursorPositionRevision: lastCursorPositionRevision + 1},
        () => this.props.onCursorPositionRevisionChange(lastCursorPositionRevision + 1)
      );
      this.debouncedOnCursorChange(new CursorPositionState(line, character, lastCursorPositionRevision + 1));
    }

    this.setState({
      lastValueState: value,
      lastCursorPositionState: cursorPosition,
    });
  };

  componentDidMount() {
    const defaultOptions = {
      autoDownloadFontAwesome: false,
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
    simplemde.codemirror.setOption('cursorScrollMargin', 3);
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
    const {debounce, valueState, cursorPositionState} = nextProps;

    if (this.props.debounce !== debounce) {
      this.debouncedOnChange = debounce(props.onValueChange, debounce);
      this.debouncedOnCursorChange = debounce(props.onCursorPositionChange, debounce);
    }

    if (this.state.lastValueRevision < valueState.revision) {
      this.setState(
        {
          lastValueRevision: valueState.revision,
          lastValueState: valueState,
        },
        () =>this.props.onValueRevisionChange(valueState.revision)
      );
      this.state.simplemde.value(valueState.value);
    }

    if (this.state.lastCursorPositionRevision < cursorPositionState.revision) {
      const {line, character: ch} = cursorPositionState;
      this.setState(
        {
          lastCursorPositionRevision: cursorPositionState.revision,
          lastCursorPositionState: cursorPositionState,
        },
        () => this.props.onCursorPositionRevisionChange(cursorPositionState.revision)
      );
      this.state.simplemde.codemirror.setCursor({line, ch});
    }
  }

  render() {
    return (
      <div ref="editor" className="editor-container">
        <textarea ref="textarea"/>
      </div>
    );
  }
}

export default Editor;
