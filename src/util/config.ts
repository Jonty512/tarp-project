export function getConfig(): Promise<any> {
  return new Promise((resolve) => {
    chrome.storage.sync.get(['userid', 'level', 'text', 'videos', 'images'], (items) => {
      resolve(items);
    });
  });
}

export function setConfig(items: any) {
  return new Promise((resolve) => {
    chrome.storage.sync.set(items, () => {
      resolve(true);
    });
  });
}
