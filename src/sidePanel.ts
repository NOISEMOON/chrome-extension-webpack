import { callGeminiProAPI } from './gemini';

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.type === 'translate-in-sidepanel') {
        const input = message.data.value;
        document.body.querySelector('#originalText').innerText = input;
        document.body.querySelector('#translatedText').innerText = "Translating..."
        chrome.storage.local.get("apiKey", async function (data) {
            const apiKey = data.apiKey;
            const translation = await callGeminiProAPI(input, apiKey);
            document.body.querySelector('#translatedText').innerText = translation;
        });
    }
});
