import React, {Component} from 'react';
import {markdownUpdate} from 'Actions/Markdown';
import SimpleMDE from 'simplemde';

class SimpleMDEComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentEditorValue: props.value
    };
  }

  static propTypes = {
    onChange: React.PropTypes.func,
    value: React.PropTypes.string,
  };

  static defaultProps = {
    onChange: () => {
      // noop
    },
    value: "",
  };

  componentDidMount() {
    const defaultOptions = {
      spellChecker: false,
      status: false,
      toolbar: false,
      forceSync: false,
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
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.state.currentEditorValue) {
      this.state.simplemde.value(nextProps.value);
    }
  }

  render() {
    return (
      <div ref="editor">
        <textarea ref="textarea" />
      </div>
    );
  }
}

export default SimpleMDEComponent;