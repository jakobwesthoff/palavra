export const MARKDOWN_UPDATE = 'MARKDOWN_UPDATE';
export const MARKDOWN_UPDATED = 'MARKDOWN_UPDATED';

export const markdownUpdate = markdown => ({
    type: MARKDOWN_UPDATE,
    payload: markdown
});

export const markdownUpdated = markdown => ({
    type: MARKDOWN_UPDATED,
    payload: markdown
});
