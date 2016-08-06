/* global document */

import React, {Component} from 'react';
import SimpleMDE from 'simplemde';

class SimpleMDEComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentEditorValue: props.value,
    };
  }

  static propTypes = {
    onChange: React.PropTypes.func,
    value: React.PropTypes.string,
    options: React.PropTypes.object,
  };

  static defaultProps = {
    onChange: () => {
      // noop
    },
    value: '',
  };

  handleDocumentBodyClicked = () => {
    this.state.simplemde.codemirror.focus();
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
    simplemde.codemirror.on('change', () => {
      const value = simplemde.value();
      this.setState({currentEditorValue: value});
      this.props.onChange(value);
    });

    this.setState({simplemde});

    document.addEventListener('click', this.handleDocumentBodyClicked);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleDocumentBodyClicked);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.state.currentEditorValue) {
      this.state.simplemde.value(nextProps.value);
    }
  }

  render() {
    return (
      <div ref="editor" className="editor-container">
        <textarea ref="textarea" />
      </div>
    );
  }
}

export default SimpleMDEComponent;
