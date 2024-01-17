import { ActionTypeEnum, MessageTypeEnum, TargetLanguageEnum } from "./constant";

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.type === MessageTypeEnum.SELECT_TEXT) {
        const rangeCount = window.getSelection().rangeCount;
        const range = window.getSelection().getRangeAt(rangeCount - 1);
        const div = document.createElement("div");
        div.innerHTML = message.data.aiResult;
        div.style.color = "red";
        range.insertNode(div);
    }
    return true;
});