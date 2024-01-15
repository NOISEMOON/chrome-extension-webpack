import '../styles/options.scss';

document.addEventListener("DOMContentLoaded", function() {
    const saveButton = document.getElementById("saveButton");
  
    saveButton.addEventListener("click", function() {
      const apiKeyInput = document.getElementById("apiKeyInput");
      const apiKey = apiKeyInput.value;
  
      chrome.storage.local.set({ "apiKey": apiKey }, function() {
        console.log("API Key saved:", apiKey);
      });
    });
  });
  