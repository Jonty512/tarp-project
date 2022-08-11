import { nanoid } from 'nanoid';

const blurrerReport = () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id!, { data: 'start-overlay' });
  });
};

chrome.contextMenus.create({
  title: 'Report to Blurrer',
  contexts: ['all'],
  onclick: blurrerReport,
});

const uid = nanoid(16);
chrome.storage.sync.get(['userid', 'level', 'text', 'videos', 'images'], (items) => {
  console.log(items);
  if (items.userid === undefined) {
    chrome.storage.sync.set({ userid: uid });
    console.log('generated new user id');
  }

  if (items.level === undefined) {
    chrome.storage.sync.set({ level: 66.666 });
  }

  if (items.text === undefined) {
    chrome.storage.sync.set({ text: true });
  }

  if (items.videos === undefined) {
    chrome.storage.sync.set({ videos: true });
  }

  if (items.images === undefined) {
    chrome.storage.sync.set({ images: true });
  }

  console.log('read from config');
});
