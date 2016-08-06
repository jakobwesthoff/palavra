export const EXTENSION_ERROR = 'EXTENSION_ERROR';

export const extensionError = error => ({
  type: EXTENSION_ERROR,
  payload: error
});