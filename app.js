require("dotenv").config();

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static("public"));

const { callChatGPT } = require("./openai.js");
const { callAzureChatGPT} = require("./openai_azure.js");

app.post("/message", async (req, res) => {
  const messages = req.body.messages;

  try {
    //const answer = await callAzureChatGPT(messages);
    const answer = await callChatGPT(messages);
    res.json({
      answer: answer,
    });
  } catch (error) {
    console.error("ChatGPT call failed");
    console.log(error);
    res.json({
      answer: "ChatGPT 呼び出しでエラーが発生しました",
    });
  }
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
