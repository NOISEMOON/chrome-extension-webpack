import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
import { ActionTypeEnum } from "./constant";

const MODEL_NAME = "gemini-pro";
const generationConfig = {
    temperature: 0.9,
    topK: 1,
    topP: 1,
    maxOutputTokens: 2048,
};

const safetySettings = [
    {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
    },
];

export async function callGeminiProAPI(input: string, actionType: ActionTypeEnum, targetLanguage: string, API_KEY: string) {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    let text = input;
    if (actionType === ActionTypeEnum.TRANSLATE) {
        text = "Tranlsate this text to " + targetLanguage + ": \n" + input;
    } 

    const parts = [
        { text: text },
    ];

    const result = await model.generateContent({
        contents: [{ role: "user", parts }],
        generationConfig,
        safetySettings,
    });

    const aiResponse = result.response.text();
    return aiResponse;
}