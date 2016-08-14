export const TAB_ACTIVATE = 'TAB_ACTIVATE';
export const TAB_ACTIVATED = 'TAB_ACTIVATED';

export const tabActivate = tabIndex => ({
  type: TAB_ACTIVATE,
  payload: tabIndex,
});

export const tabActivated = activeIndex => ({
  type: TAB_ACTIVATED,
  payload: activeIndex,
});
