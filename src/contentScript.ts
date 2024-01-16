import { MessageTypeEnum } from "./constant";

chrome.runtime.onMessage.addListener(async function (message, sender, sendResponse) {
    if (message.type === MessageTypeEnum.SELECT_TEXT) {
        const selectedText = window.getSelection().toString();
        chrome.runtime.sendMessage({
            type: MessageTypeEnum.TRANSLATE,
            data: { value: selectedText }
        });
    }
});