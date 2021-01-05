const Discord = require("discord.js");
const client = new Discord.Client();
const { BOT_TOKEN } = require("./config");

async function createAPIMessage(interaction, content) {
  const apiMessage = await discord.APIMessage.create(
    client.channels.resolve(interaction.channel_id),
    content
  )
    .resolveData()
    .resolveFiles();
  return { ...apiMessage.data };
}

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
      if (command == "echo") {
        const description = args.find(
          (arg) => arg.name.toLowerCase() == "content"
        ).vaule;
        const embed = new Discord.MessageEmbed()
          .setTitle("Echo!")
          .setDescription(description)
          .setAuthor(interaction.member.user.username);
        client.api
          .interactions(interaction.id, interaction.token)
          .callback.post({
            data: {
              type: 4,
              data: await createAPIMessage(interaction, embed),
            },
          });
      }
    }
  });
});

client.on("message", (msg) => {
  if (msg.content == "Ping" || msg.content == "ping") {
    msg.reply("Pong");
  }
});

client.login(BOT_TOKEN);
