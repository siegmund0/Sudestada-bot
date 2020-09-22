const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { createHash } = require("crypto");
//const { getMember, formatDate } = require("../../functions.js");
//const steamId = 76561198120289934n;
let bytes = [];
module.exports = {
    usage: "!!guid",
    name: "guid",
    category: "information",
    description: "Retorna la peticion de Hash (Steam Id 64 a MD5 hash GUID)",
    run: async(client, message, args) => {
        let tmp = message.content.split(" ");
        let siEnviarEmbed = new Discord.MessageEmbed();
        try { 
            for (let i = 0; i < 8; i++) {
                bytes.push(Number((BigInt(tmp[1]) >> (8n * BigInt(i))) & 0xFFn));
            }
            let guid = createHash('md5').update(Buffer.from([0x42, 0x45, ...bytes])).digest('hex');
            bytes = [];
            
            siEnviarEmbed.setDescription("<@" + message.author.id + ">")
                .setColor("#C7CED4")
                .addField('Tu GUID es:', `${guid}`, true)
                .setThumbnail('https://i.imgur.com/mnSJzVk.jpg')
				.setFooter(`Setsi | Metodo de conversion Hash MD5 | oaki`);
        } catch(e)
        {
             console.log(`Error al convertir GUID`);
             siEnviarEmbed.setTitle(`Error al convertir`)
             .setColor("#CD6565")
             .setDescription(`Esta seguro que introdujo un numero correcto? \nIngresa a esta pagina https://steamid.io/ y pon tu Link de Steam. \nTienes que buscar tu SteamId64 765611.... y luego utilizarlo con el comando \`-guid 765611.....\` para que devuelva el hash.`)
             .setThumbnail('https://i.imgur.com/mnSJzVk.jpg')
			 .setFooter(`Setsi | Metodo de conversion Hash MD5 | oaki`);
        } finally {message.channel.send(siEnviarEmbed)}
    }
}