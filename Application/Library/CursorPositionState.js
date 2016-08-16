class CursorPositionState {
  static fromJSON = json => {
    let {line, character, revision} = json;
    if (line === undefined || character === undefined || revision === undefined) {
      throw new Error('Malformed document transformed');
    }
    return new CursorPositionState(
      line,
      character,
      revision
    );
  };

  constructor(line = 0, character = 0, revision = 0) {
    this.line = line;
    this.character = character;
    this.revision = revision;
  }

  toJSON() {
    const {line, character, revision} = this;
    return {
      line,
      character,
      revision,
    };
  }
}

export default CursorPositionState;