require("dotenv").config();

const { Client, Intents } = require("discord.js");

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.on("ready", function (e) {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.login(process.env.DISCORD_TOKEN);

client.on("message", function (msg) {
  if (msg.content.toLowerCase() === "!help") {
    msg.reply("!: prefix for theBot commands");
  }

  if (msg.content.toLowerCase() === "!milk") {
    msg.reply("https://tenor.com/view/milk-milk-man-fresh-milk-gif-22164239");
  } else if (msg.content.startsWith("!")) {
    msg.reply('Unknown command, please type "!help" for a list of commands');
  }
});
