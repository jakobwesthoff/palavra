class ValueState {
  static fromJSON = json => {
    let {value, revision} = json;
    if (revision === null) {
      revision = Infinity;
    }
    return new ValueState(value, revision);
  };

  constructor(value = '', revision = Infinity) {
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