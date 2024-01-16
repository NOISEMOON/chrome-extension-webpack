import { ActionTypeEnum, MessageTypeEnum, TargetLanguageEnum } from "./constant";

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.type === MessageTypeEnum.SELECT_TEXT) {
        alert(message.data.aiResult);
    }
    return true;
});