chrome.runtime.onMessage.addListener(async function (message, sender, sendResponse) {
    if (message.type === 'read-selected-text') {
        const selectedText = window.getSelection().toString();
        chrome.runtime.sendMessage({
            type: 'translate-in-sidepanel',
            data: { value: selectedText }
        });
    }
});