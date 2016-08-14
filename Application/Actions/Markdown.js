export const MARKDOWN_UPDATE = 'MARKDOWN_UPDATE';
export const MARKDOWN_UPDATED = 'MARKDOWN_UPDATED';

export const markdownUpdate = (tabIndex, valueState) => ({
  type: MARKDOWN_UPDATE,
  payload: {tabIndex, valueState},
});

export const markdownUpdated = (tabIndex, valueState) => ({
  type: MARKDOWN_UPDATED,
  payload: {tabIndex, valueState},
});
