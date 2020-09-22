const Discord = require('discord.js');
const SteamAPI = require('steamapi');
const steam = new SteamAPI('E08AF820767E21FA788EEB609AE23096');

let id64Resolve = [];
module.exports = {
    name: "id64",
    aliases: ["id64"],
    category: "informacion",
    description: "Returns Steam ID 64",
    usage: "!id64",
    run: async(client, message, args) => {
        if (!args[0]) return message.reply('Insert account url | -id64 <your steam account url here> ')
            .then(msg => {
                msg.delete({ timeout: 10000 })
            })
        else {
            let resolve = await steam.resolve(`${args}`).then(id => {
                id64Resolve = id;
                if (id64Resolve.toString().length != 17)
                    return message.reply('Algo salio mal, por favor intente de nuevo')
                        .then(msg => {
                            msg.delete({ timeout: 10000 })
                        });
                return id64Resolve;
            });
            let getSummary = steam.getUserSummary(resolve).then(summary => {
                //console.log(summary);
                if (summary.gameServerIP, summary.gameServerSteamID, summary.gameExtraInfo, summary.gameID === undefined) {
                    const embed1 = new Discord.MessageEmbed()
                        .setTitle(`Steam Information`)
                        .setColor("#C7CED4")
                        .addField("General:", `Nickname: \`${summary.nickname}\` \nReal Name: \`${summary.realName}\` \nCountry Code: \`${summary.countryCode}\``)
                        .addField("Extra Information:", `Steam ID: \`${summary.steamID}\``)
                        .setThumbnail(`${summary.avatar.large}`)
                        .setFooter(`2020 © Steam Api Not official | Developed by oaki`)
                        .setTimestamp();
                    message.channel.send(embed1);
                } else {
                    const embed2 = new Discord.MessageEmbed()
                        .setTitle(`Steam Information`)
                        .setColor("#C7CED4")
                        .addField("General:", `Nickname: \`${summary.nickname}\` \nReal Name: \`${summary.realName}\` \nCountry Code: \`${summary.countryCode}\``)
                        .addField("Extra Information:", `Steam ID: \`${summary.steamID}\``)
                        .addField("Is Playing?", `Game Server IP: \`${summary.gameServerIP}\` \nGame Server ID: \`${summary.gameServerSteamID}\` \nGame Info: \`${summary.gameExtraInfo}\` \nGame AppId: \`${summary.gameID}\``)
                        .setThumbnail(`${summary.avatar.large}`)
                        .setFooter(`2020 © Steam Api Not official | Developed by oaki`)
                        .setTimestamp();
                    message.channel.send(embed2);
                }
            });
        }
    }
}