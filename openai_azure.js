
const axios = require('axios');
const prompts = require("./prompts.js");

async function callAzureChatGPT(messages) {

    const system_prompt = {"role": "system", "content": prompts.health_master}
    
    messages.unshift(system_prompt);

    const response = await axios.post(process.env.AOAI_ENDPOINT, 
        {"messages":messages,
        "max_tokens": 800,
        "temperature": 1.0,
        "frequency_penalty": 0,
        "presence_penalty": 0,
        "top_p": 1.0},
        {headers: {
        'Content-Type': 'application/json',
        'api-key': process.env.AOAI_API_KEY
        }
      });

    return response.data.choices[0].message.content
}

// モジュールとしてエクスポートする
module.exports = {callAzureChatGPT};