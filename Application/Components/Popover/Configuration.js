import React, {PropTypes} from 'react';
import Popover from './Popover';

class Configuration extends Popover {
  static propTypes = {
    ...Popover.propTypes,
    name: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);

    this._nameInput = null;

    this.state = {
      newName: props.name,
    }
  }

  onActivation = () => {
    this._nameInput.select();
  };

  handleAccept = () => {
    const {newName} = this.state;
    this.props.onAccept(newName);
  };

  handleNameChange = event => {
    const newName = event.target.value;
    this.setState({newName});
  };

  handleSubmit = event => {
    event.preventDefault();
    this.handleAccept();
  };

  render() {
    return (
      <div className="dialog configuration">
        <div className="header">
          Configure this tab
        </div>
        <div className="body">
          <form onSubmit={this.handleSubmit}>
            <label>Name</label>
            <input ref={input => this._nameInput = input}
                   type="text"
                   value={this.state.newName}
                   onChange={this.handleNameChange}
            />
          </form>
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