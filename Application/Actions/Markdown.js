export const MARKDOWN_UPDATE = 'MARKDOWN_UPDATE';
export const MARKDOWN_UPDATED = 'MARKDOWN_UPDATED';

export const markdownUpdate = (tabIndex, markdown) => ({
  type: MARKDOWN_UPDATE,
  payload: {tabIndex, markdown},
});

export const markdownUpdated = (tabIndex, markdown) => ({
  type: MARKDOWN_UPDATED,
  payload: {tabIndex, markdown},
});
