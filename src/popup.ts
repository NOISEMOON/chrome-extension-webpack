import '../styles/popup.scss';
import { MessageTypeEnum } from './constant';

document.getElementById('go-to-options').addEventListener('click', () => {
  chrome.runtime.openOptionsPage();
});

document.addEventListener('DOMContentLoaded', function () {
  const translateButton = document.getElementById('translateButton');

  translateButton.addEventListener('click', async function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const activeTab = tabs[0];
      chrome.tabs.sendMessage(activeTab.id, { type: MessageTypeEnum.SELECT_TEXT });
    });
    
  });
});