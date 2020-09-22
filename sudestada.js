const { steamapi } = require('./config.json');
const { MessageEmbed } = require("discord.js");
const axios = require('axios');
const { Client, Collection } = require("discord.js");
const { config } = require("dotenv");
const fs = require("fs");

const client = new Client({
    disableEveryone: true
});

client.commands = new Collection();
client.aliases = new Collection();
client.categories = fs.readdirSync("./commands/");
config({
    path: __dirname + "/.env"
});

["command"].forEach(handler => {
    require(`./handler/${handler}`)(client);
});

client.on("ready", () => {
    console.log(`Estoy online, mi nombre es ${client.user.username}`);
    client.user.setActivity(`!!help | Sudestada ARG`, { type: "WATCHING" });
	//client.guilds.forEach(guild => {
	//guild.channels.first().createInvite()
    //.then(inv => console.log(`${guild.name} | ${inv.url}`));
    // Outputs the guild name + the invite URL
});

client.on("guildMemberAdd", member =>{
    const channel = member.guild.channels.cache.find(channel => channel.name === "🔰bienvenida🔰");
    if(!channel) return;
    channel.send(`${member} Bienvenido a Sudestada ARG. Recuerda mantener el orden y no faltar el respeto a otro usuario.`);
});

client.on("message", async message => {
    const prefix = process.env.PREFIX;
    if (message.author.bot) return;
    if (!message.guild) return;
    if (!message.content.startsWith(prefix)) return;
    if (!message.member) message.member = await message.guild.fetchMember(message);

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    if (cmd.lenght === 0) return;

    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));

    if (command)
        command.run(client, message, args);

});

client.login(process.env.TOKEN);