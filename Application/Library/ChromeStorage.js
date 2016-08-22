/* global chrome*/

class ChromeStorage {
  static LOCAL = 'local';
  static SYNC = 'sync';
  static MANAGED = 'managed';

  constructor(type = ChromeStorage.LOCAL) {
    /**
     * @type {string}
     * @private
     */
    this._type = type;
    /**
     * @type {chrome.StorageArea}
     */
    this._storage = chrome.storage[type];
  }

  /**
   * @param {string|array.<string>} itemOrItems
   * @returns {Promise.<Object>}
   */
  get(itemOrItems) {
    return new Promise(
      (resolve, reject) => this._storage.get(itemOrItems, items => {
        if (chrome.runtime.lastError !== undefined) {
          return reject(chrome.runtime.lastError.message);
        }
        resolve(items);
      })
    );
  }

  /**
   * @param {string|array.<string>} itemOrItems
   * @returns {Promise.<boolean>}
   */
  has(itemOrItems) {
    return new Promise(
      (resolve, reject) => this._storage.get(itemOrItems, items => {
        if (chrome.runtime.lastError !== undefined) {
          return reject(chrome.runtime.lastError.message);
        }
        resolve(this._isItemOrItemsInResultSet(itemOrItems, items));
      })
    );
  }

  /**
   * @param {Object} items
   * @returns {Promise.<boolean>}
   */
  set(items) {
    return new Promise(
      (resolve, reject) => this._storage.set(items, () => {
        if (chrome.runtime.lastError !== undefined) {
          return reject(chrome.runtime.lastError.message);
        }
        resolve(true);
      })
    );
  }

  remove(itemOrItems) {
    return new Promise(
      (resolve, reject) => this._storage.remove(itemOrItems, () => {
        if (chrome.runtime.lastError !== undefined) {
          return reject(chrome.runtime.lastError.message);
        }
        resolve(true);
      })
    );
  }

  _isItemOrItemsInResultSet(itemOrItems, resultSet) {
    if (typeof itemOrItems === 'string') {
      return resultSet[itemOrItems] !== undefined;
    }

    return Object.keys(itemOrItems).reduce(
      (previous, key) => previous && resultSet[key] !== undefined,
      true
    );
  }
}

export default ChromeStorage;
