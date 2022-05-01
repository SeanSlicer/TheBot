require("dotenv").config();

const { Client, Intents } = require("discord.js");

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.on("ready", function (e) {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.login(process.env.DISCORD_TOKEN);

const prefix = "!";

const cheerio = require("cheerio");

client.on("message", function (msg) {
  if (msg.content.toLowerCase() === prefix + "help") {
    msg.reply(
      '!: prefix for theBot commands\n !play "youtube link here": plays youtube audio\n !image "images to search for": finds an image based on your query.'
    );
    return;
  }

  if (msg.content.toLowerCase() === prefix + "milk") {
    msg.reply("https://tenor.com/view/milk-milk-man-fresh-milk-gif-22164239");
    return;
  }
  if (msg.content.toLowerCase() === prefix + "play") {
    msg.reply("skadoosh");
    return;
  }
  if (msg.content.toLowerCase() === prefix + "image") {
    msg.reply("Feature under construction...");
    return;
  } else if (msg.content.startsWith(prefix)) {
    msg.reply('Unknown command, please type "!help" for a list of commands');
  }
});
