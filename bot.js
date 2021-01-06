const Discord = require("discord.js");
const client = new Discord.Client();
const { BOT_TOKEN } = require("./config");

client.on("ready", () => {
  console.log("ready");

  client.on("message", (msg) => {
    if (msg.content == "Ping" || msg.content == "ping") {
      msg.reply("Pong");
    }
  });
});

client.login(BOT_TOKEN);
