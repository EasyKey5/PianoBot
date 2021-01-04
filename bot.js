const Discord = require('discord.js');
const client = new Discord.Client();
const { BOT_TOKEN } = require('./config');


console.log(BOT_TOKEN);
client.login(BOT_TOKEN);



client.on('ready', () => console.log('Bot is active'));

client.on('message', (msg) => {

  if ((msg.content == 'Ping' || msg.content == 'ping') && msg.channel.id == '775112162246787083') {
      msg.reply('Pong');
  }

});
