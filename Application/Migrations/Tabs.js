import ChromeStorage from 'Library/ChromeStorage';
import uuid from 'uuid';

class Tabs {
  constructor() {
    this._storage = new ChromeStorage();
  }

  _migrateOldMarkdown() {
    return Promise.resolve()
      .then(() => this._storage.get('markdown'))
      .then(({markdown}) => {
        const newId = uuid.v4({
          rng: uuid.whatwgRNG,
        });

        return Promise.resolve()
          .then(() => this._injectNewMarkdown(newId, markdown))
          .then(() => this._injectNewCursorPosition(newId, 0, 0))
          .then(() => this._injectNewTab(newId))
          .then(() => this._activateTab(newId));
      })
      .then(() => this._removeOldMarkdown());
  }

  _activateTab(newId) {
    return this._storage.set({activeTab: newId});
  }

  _injectNewTab(newId) {
    return Promise.resolve()
      .then(() => this._storage.has('tabs'))
      .then(hasTabs => {
        if (hasTabs === true) {
          return this._storage.get('tabs');
        }
        return Promise.resolve({tabs: []});
      })
      .then(({tabs}) => {
        tabs.push({id: newId, name: 'New Tab'});
        return this._storage.set({tabs});
      })
  }

  _injectNewMarkdown(newId, markdown) {
    return Promise.resolve()
      .then(() => this._storage.has('markdownByTabs'))
      .then(hasMarkdownByTabs => {
        if (hasMarkdownByTabs === true) {
          return this._storage.get('markdownByTabs');
        }
        return Promise.resolve({markdownByTabs: {}});
      })
      .then(({markdownByTabs}) => {
        markdownByTabs[newId] = {value: markdown, revision: 0};
        return this._storage.set({markdownByTabs});
      })
  }

  _injectNewCursorPosition(newId, line, character) {
    return Promise.resolve()
      .then(() => this._storage.has('cursorPositionByTabs'))
      .then(cursorPositionByTabs => {
        if (cursorPositionByTabs === true) {
          return this._storage.get('cursorPositionByTabs');
        }
        return Promise.resolve({cursorPositionByTabs: {}});
      })
      .then(({cursorPositionByTabs}) => {
        cursorPositionByTabs[newId] = {line, character, revision: 0};
        return this._storage.set({cursorPositionByTabs});
      })
  }

  _removeOldMarkdown() {
    return this._storage.remove('markdown');
  }

  run() {
    return Promise.resolve()
      .then(() => this._storage.has('markdown'))
      .then(hasOldMarkdown => {
        if (hasOldMarkdown === true) {
          return this._migrateOldMarkdown();
        }
      })
  }
}

export default Tabs;
