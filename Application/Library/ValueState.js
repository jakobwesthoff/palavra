class ValueState {
  static fromJSON = json => {
    let {value, revision} = json;
    if (value === undefined || revision === undefined) {
      throw new Error('Malformed document transformed');
    }
    return new ValueState(value, revision);
  };

  constructor(value = '', revision = 0) {
    this.value = value;
    this.revision = revision;
  }

  toJSON() {
    const {value, revision} = this;
    return {
      value,
      revision
    };
  }
}

export default ValueState;