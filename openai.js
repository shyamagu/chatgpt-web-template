const { Configuration, OpenAIApi } = require("openai");
const prompts = require("./prompts.js");
const axios = require('axios');

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

async function callChatGPT(messages){

    const system_prompt = {"role": "system", "content": prompts.health_master}

    messages.unshift(system_prompt);

    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: messages,
        temperature: 1.0,
        presence_penalty: 0,
        frequency_penalty: 0,
        top_p: 1.0,
    });
    return completion.data.choices[0].message.content
}

// モジュールとしてエクスポートする
module.exports = {callChatGPT};