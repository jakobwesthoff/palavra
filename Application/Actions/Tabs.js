export const TAB_ACTIVATED = 'TAB_ACTIVATED';

export const tabActivated = activeIndex => ({
  type: TAB_ACTIVATED,
  payload: activeIndex,
});
