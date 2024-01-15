import { callGeminiProAPI } from './gemini';

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.type === 'translate-in-sidepanel') {
        const input = message.data.value;
        doTranslate(input);
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const translateButton = document.getElementById('translateButton');
    translateButton.addEventListener('click', () => {
        const input = document.body.querySelector('#originalText').value;
        doTranslate(input);
    });
});

function doTranslate(input: string) {
    const targetLanguage = document.body.querySelector('#targetLanguage').value;
    document.body.querySelector('#originalText').value = input;
    document.body.querySelector('#translatedText').innerText = "Translating..."
    chrome.storage.local.get("apiKey", async function (data) {
        const apiKey = data.apiKey;
        const translation = await callGeminiProAPI(input, targetLanguage, apiKey);
        document.body.querySelector('#translatedText').innerText = translation;
    });
}