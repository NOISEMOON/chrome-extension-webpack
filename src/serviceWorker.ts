import { CommandTypeEnum, MessageTypeEnum } from './constant';
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

// open sidepanel
chrome.commands.onCommand.addListener(async function (command) {
  if (command === CommandTypeEnum.TRANSLATE) {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, async ([tab]) => {
      await chrome.sidePanel.open({ tabId: tab.id });
      await chrome.sidePanel.setOptions({
        tabId: tab.id,
        path: 'sidePanel.html',
        enabled: true
      });
    });
  }
});

chrome.contextMenus.onClicked.addListener((data) => {
  chrome.runtime.sendMessage({
    type: MessageTypeEnum.TRANSLATE,
    data: { value: data.selectionText }
  });
});