import React, {Component, PropTypes} from 'react';

class Configuration extends Component {
  static propTypes = {
    onAccept: PropTypes.func,
    onCancel: PropTypes.func,
    name: PropTypes.string.isRequired,
  };

  static defaultProps = {
    onAccept: () => {
      /* noop */
    },
    onCancel: () => {
      /* noop */
    },
  };

  constructor(props) {
    super(props);

    this.state = {
      newName: props.name,
    }
  }

  handleAccept = () => {
    const {newName} = this.state;
    this.props.onAccept(newName);
  };

  handleNameChange = event => {
    const newName = event.target.value;
    this.setState({newName});
  };

  render() {
    return (
      <div className="dialog">
        <div className="header">
          Configure this tab
        </div>
        <div className="body">
          <label>Name</label>
          <input type="text"
                 value={this.state.newName}
                 onChange={this.handleNameChange}
          />
        </div>
        <div className="buttons">
          <button onClick={this.props.onCancel}>Cancel</button>
          <button onClick={this.handleAccept}>Save</button>
        </div>
      </div>
    );
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      newName: newProps.name
    });
  }
}

export default Configuration;