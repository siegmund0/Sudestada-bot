const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");

module.exports = {
    name: "invitar",
    aliases: ["dis"],
    category: "informacion",
    description: "Invitar bot a otro discord",
    usage: "!invitar",
    run: async(bot, message, args) => {
        console.log("Se utilizo comando INVITE");
        const discordinfo = new Discord.MessageEmbed()
            .setTitle("Hola, Soy Open Source!")
            .setColor("#C7CED4")
            .setFooter("Developed by oaki | Sudestada Army")
            .setThumbnail('https://i.imgur.com/mnSJzVk.jpg')
            .addField("Link de invitacion", `\n https://discord.com/api/oauth2/authorize?client_id=750096858503708723&permissions=8&scope=bot`)
            .addField("Link de GitHub", `\n https://github.com/siegmund0/SteamID64ToGUID-Discord-Bot`)
        message.channel.send(discordinfo);
    }
}