import { callGeminiProAPI } from './gemini';

chrome.runtime.onMessage.addListener(async function (request, sender, sendResponse) {
    if (request.action === 'translateSelectedText') {
        console.log("translate ...")
        const selectedText = window.getSelection().toString();
        if (selectedText === "") {
            alert("Empty input");
            return;
        }
        chrome.storage.local.get("apiKey", async function(data) {
            const apiKey = data.apiKey;
            const translation = await callGeminiProAPI(selectedText, apiKey);
            alert(translation);
        });
    }
});
