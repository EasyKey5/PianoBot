const Discord = require("discord.js");
const client = new Discord.Client();
const { BOT_TOKEN } = require("./config");

client.on("ready", () => {
  console.log("Bot is active");
  client.api
    .applications(client.user.id)
    .guilds("775112162246787083")
    .commands.post({
      data: {
        name: "hello",
        description: "Replies with Hello World!",
      },
    });
  client.api
    .applications(client.user.id)
    .guilds("775112162246787083")
    .commands.post({
      data: {
        name: "echo",
        description: "Echos your text as an embed",
        options: [
          {
            name: "content",
            description: "Content of the embed",
            type: 3,
            required: true,
          },
        ],
      },
    });
  client.ws.on("INTERACTION_CREATE", async (interaction) => {
    const command = interaction.data.name.toLowerCase();
    const args = interaction.data.options;

    if (command == "hello") {
      interaction.client.api
        .interaction(interaction.id, interaction.token)
        .callback.post({
          data: {
            type: 4,
            data: {
              content: "Hello World!",
            },
          },
        });
    }
  });
});

client.on("message", (msg) => {
  if (msg.content == "Ping" || msg.content == "ping") {
    msg.reply("Pong");
  }
});

client.login(BOT_TOKEN);
