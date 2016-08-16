export const TAB_ACTIVATE = 'TAB_ACTIVATE';
export const TAB_ACTIVATED = 'TAB_ACTIVATED';
export const TAB_ADD = 'TAB_ADD';
export const TAB_ADDED = 'TAB_ADDED';
export const TAB_REMOVE = 'TAB_REMOVE';
export const TAB_REMOVED = 'TAB_REMOVED';
export const TAB_RENAME = 'TAB_RENAME';

export const tabActivate = tabId => ({
  type: TAB_ACTIVATE,
  payload: tabId,
});

export const tabActivated = tabId => ({
  type: TAB_ACTIVATED,
  payload: tabId,
});

export const tabAdd = (id, name) => ({
  type: TAB_ADD,
  payload: {id, name},
});

export const tabAdded = (id, name) => ({
  type: TAB_ADDED,
  payload: {id, name},
});

export const tabRemove = id => ({
  type: TAB_REMOVE,
  payload: {id},
});

export const tabRemoved = id => ({
  type: TAB_REMOVED,
  payload: {id},
});

export const tabRename = (tabIndex, newName) => ({
  type: TAB_RENAME,
  payload: {tabIndex, newName},
});
