class Tabs {
  run() {
    Promise.resolve()
      .then(() => {
        return new Promise((resolve, reject) => {
          chrome.storage.local.get('markdown', markdown => {
            if (chrome.runtime.lastError !== undefined) {
              return reject(chrome.runtime.lastError);
            }
            return resolve(markdown);
          });
        });
      })
      .then(markdown => {
        return new Promise(resolve => {
          chrome.storage.local.set({
            markdownByTabs: {
              '745cd7ed-fc15-4150-ae8b-9f84622936f0': {value: markdown, revision: 0},
            },
            cursorPositionByTabs: {
              '745cd7ed-fc15-4150-ae8b-9f84622936f0': {line: 0, character: 0, revision: 0},
            },
            tabs: [{
              id: '745cd7ed-fc15-4150-ae8b-9f84622936f0',
              name: 'New Tab',
            }],
            activeTab: '745cd7ed-fc15-4150-ae8b-9f84622936f0',
          }, () => resolve());
        });
      })
      .then(() => {
        return new Promise(resolve => {
          chrome.storage.local.remove('markdown', () => resolve());
        });
      })
      .catch(() => {
        // No `markdown` means we are already finished
      });
  }
}

export default Tabs;
