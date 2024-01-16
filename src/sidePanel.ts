import { MessageTypeEnum } from "./constant";

document.addEventListener('DOMContentLoaded', function () {
    const submitButton = document.getElementById('submitButton');
    submitButton.addEventListener('click', () => {
        document.body.querySelector('#aiResult').innerText = "Generating...";

        const input = document.body.querySelector('#originalText').value;
        const actionType = document.body.querySelector('#actionType').value;
        const targetLanguage = document.body.querySelector('#targetLanguage').value;

        chrome.runtime.sendMessage(
            {
                type: MessageTypeEnum.GENERATE,
                data: {
                    input: input,
                    actionType: actionType,
                    targetLanguage: targetLanguage
                }
            },
            function (response) {
                document.body.querySelector('#aiResult').innerText = response;
            });
    });
});