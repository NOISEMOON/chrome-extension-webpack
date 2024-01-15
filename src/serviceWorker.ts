import { initializeStorageWithDefaults } from './storage';

function setupContextMenu() {
  chrome.contextMenus.create({
    id: 'translate-in-sidepanel',
    title: 'Translate',
    contexts: ['selection']
  });
}

// Here goes everything you want to execute after extension initialization
chrome.runtime.onInstalled.addListener(async () => {
  setupContextMenu();
  await initializeStorageWithDefaults({});
  console.log('Extension successfully installed!');
});

// Log storage changes, might be safely removed
chrome.storage.onChanged.addListener((changes) => {
  for (const [key, value] of Object.entries(changes)) {
    console.log(
      `"${key}" changed from "${value.oldValue}" to "${value.newValue}"`,
    );
  }
});

chrome.commands.onCommand.addListener(async function (command) {
  if (command === 'translate') {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, async ([tab]) => {

      console.log("enabled = " + chrome.sidePanel.enabled);

      await chrome.sidePanel.open({ tabId: tab.id });
      
      await chrome.sidePanel.setOptions({
        tabId: tab.id,
        path: 'sidePanel.html',
        enabled: true
      });
      
      // await chrome.tabs.sendMessage(tab.id, { type: 'read-selected-text' });
    });
  }
});

chrome.contextMenus.onClicked.addListener((data) => {
  chrome.runtime.sendMessage({
    type: 'translate-in-sidepanel',
    data: { value: data.selectionText }
  });
});