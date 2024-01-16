import { callGeminiProAPI } from './gemini';

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.type === 'translate-in-sidepanel') {
        const input = message.data.value;
        doGenerate(input, "Translate");
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const submitButton = document.getElementById('submitButton');
    submitButton.addEventListener('click', () => {
        const input = document.body.querySelector('#originalText').value;
        const actionType = document.body.querySelector('#actionType').value;
        doGenerate(input, actionType);
    });
});

function doGenerate(input: string, actionType: string) {
    const targetLanguage = document.body.querySelector('#targetLanguage').value;
    document.body.querySelector('#originalText').value = input;
    document.body.querySelector('#aiResult').innerText = "Generating..."
    chrome.storage.local.get("apiKey", async function (data) {
        const apiKey = data.apiKey;
        const aiResult = await callGeminiProAPI(input, actionType, targetLanguage, apiKey);
        document.body.querySelector('#aiResult').innerText = aiResult;
    });
}