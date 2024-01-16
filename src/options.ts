import '../styles/options.scss';

document.addEventListener("DOMContentLoaded", function () {
  const saveButton = document.getElementById("saveButton");
  const apiKeyInput = document.getElementById("apiKeyInput");

  chrome.storage.local.get("apiKey", async function (data) {
    const apiKey = data.apiKey;
    apiKeyInput.value = apiKey;
  });

  saveButton.addEventListener("click", function () {
    const apiKey = apiKeyInput.value;
    chrome.storage.local.set({ "apiKey": apiKey }, function () {
      alert("API Key saved");
    });
  });
});
