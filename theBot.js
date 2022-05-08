const Discord = require("discord.js");
const dotenv = require("dotenv");
const { REST } = require("@discordjs/rest");
const { Routes } = require("@discord-api-types/v9");
const fs = require("fs");
const { Player } = require("discord-player");

dotenv.config();
const TOKEN = process.env.TOKEN;

const LOAD_SLIASH = process.argv[2] == "load";
const CLIENT_ID = process.env.CLIENT_ID;
const GUILD_ID = process.env.GUILD_ID;

const client = new Discord.Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.GUILD_VOICE_STATES,
  ],
});

client.slashcommands = new Discord.Collection();
client.player = new Player(
  (client = {
    ytdlOptions: {
      quality: "highestaudio",
      highWaterMark: 1 << 25,
    },
  })
);

let commands = [];

const slashFiles = fs
  .readdirSync("./slash")
  .filter((file) => file.endsWith(".js"));
for (const file of slashFiles) {
  const slashcmd = require(`./slash/${file}`);
  client.slashcommands.set(slashcmd.data.name, slashcmd);
  if (LOAD_SLIASH) commands.push(slashcmd.data.toJSON());
}

if (LOAD_SLIASH) {
  const rest = new REST({ version: "9" }).setToken(TOKEN);
  console.log("Loading Slash Commands...");
  rest
    .put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
      body: { commands },
    })
    .then(() => {
      console.log("Loaded Slash Commands!");
      process.exit(0);
    })
    .catch((err) => {
      if (err) {
        console.log(err);
        process.exit(1);
      }
    });
} else {
  client.on("ready", () => {
    console.log("Logged in as ${client.user.tag}");
  });
}
