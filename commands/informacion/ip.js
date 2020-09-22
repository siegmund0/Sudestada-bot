const { MessageEmbed, Discord } = require('discord.js');
const ping = require('ping');

let res = [];
module.exports = {
    name: "ip",
    description: "Hace Ping a una ip especifica",
    usage: "!!ip",
    category: "informacion",
    accessableby: "Members",
    aliases: ["ip"],
    run: async(client, message, args) => {
        let hosts = '0.0.0.0';
        for (let host of hosts) {
            let res = await ping.promise.probe(host);
            console.log(res);
        }
        message.channel.send(res);
    }
}