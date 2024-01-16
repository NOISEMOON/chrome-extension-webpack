import { ActionTypeEnum, CommandTypeEnum, MessageTypeEnum, TargetLanguageEnum } from './constant';
import { initializeStorageWithDefaults } from './storage';
import { callGeminiProAPI } from './gemini';

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
    if (command === CommandTypeEnum.OPEN_SIDEPANEL) {
        chrome.tabs.query({ active: true, lastFocusedWindow: true }, async ([tab]) => {
            await chrome.sidePanel.open({ tabId: tab.id });
            await chrome.sidePanel.setOptions({
                tabId: tab.id,
                path: 'sidePanel.html',
                enabled: true
            });
        });
    }
    return true;
});

// right-click menu
chrome.contextMenus.onClicked.addListener((data) => {
    (async () => {
        const aiResult = await doGenerate(data.selectionText, ActionTypeEnum.TRANSLATE, TargetLanguageEnum.CHINESE);
        const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
        const response = await chrome.tabs.sendMessage(
            tab.id, 
            {
                type: MessageTypeEnum.SELECT_TEXT,
                data: {
                    input: data.selectionText,
                    aiResult: aiResult,
                    actionType: ActionTypeEnum.TRANSLATE,
                    targetLanguage: TargetLanguageEnum.CHINESE
                }
            }
            );
    })();

    return true;
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    (async () => {
        if (message.type === MessageTypeEnum.GENERATE) {
            const input = message.data.input;
            const actionType = message.data.actionType;
            const targetLanguage = message.data.targetLanguage;

            doGenerate(input, actionType, targetLanguage)
                .then((resp) => sendResponse(resp));
        }
    })();
    return true;
});

async function doGenerate(input: string, actionType: ActionTypeEnum, targetLanguage: TargetLanguageEnum) {
    const data = await chrome.storage.local.get("apiKey");
    return await callGeminiProAPI(input, actionType, targetLanguage, data.apiKey);
}

function setupContextMenu() {
    chrome.contextMenus.create({
        id: 'translate-in-sidepanel',
        title: 'Translate',
        contexts: ['selection']
    });
}