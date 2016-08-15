export const REVISION_CURSOR_POSITION_SET = 'REVISION_CURSOR_POSITION_SET';
export const REVISION_VALUE_SET = 'REVISION_VALUE_SET';

export const revisionCursorPositionSet = newRevision => ({
  type: REVISION_CURSOR_POSITION_SET,
  payload: {newRevision},
});

export const revisionValueSet = newRevision => ({
  type: REVISION_VALUE_SET,
  payload: {newRevision},
});
