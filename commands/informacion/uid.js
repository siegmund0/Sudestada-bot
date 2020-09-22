const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const crypto = require("crypto");

module.exports = {
    usage: "!!uid",
    name: "uid",
    category: "informacion",
    description: "Returns the Hash request (Steam Id 64 to base64 hash UID)",
    run: async(client, message, args) => {
		let discordUserTag = message.member.user.tag;
        let discordServer = message.guild.name;
        let tmp = message.content.split(" ");
        let pwd = `${args}`;
        let siEnviarEmbed = new Discord.MessageEmbed();
			if(!args[0]) return message.reply(`Inserta  el numero id64 de la cuenta | -uid <tu id64 aca> | -uid 765611981... \nSi no tienes el id64, por favor ejecuta el siguiente comando\n\`-steam <tu-perfil-de-steam-aca>\`\nExample -steam https://steamcommunity.com/id/siegmundsensi/`)
			.then(msg => {
			  msg.delete({ timeout: 25000 })
			});
            try {
                let hash = crypto.createHash('sha256').update(pwd).digest('base64');
				
                console.log(`Conversion de Guid exitosa`);
                siEnviarEmbed.setDescription("<@" + message.author.id + ">")
					.addField('Tu encriptacion es:', `${hash}`, true)
					.setColor("#F8C300")
					.setFooter(`2020 © Id64ToGuid | Bohemia Interactive - Battleye | siegmund - oaki`)
            } catch(e)
            {
                 console.log(`Error al convertir UID ${e}`);
                 siEnviarEmbed.setTitle(`Error al convertir`)
                 .setColor("#A62019")
                 .setDescription(`Seguro que ingresaste un numero correcto? \nEjecuta !!id64.\nNecesitas encontrar tu SteamId64 765611 .... y luego usa el siguiente comando \`-uid 765611.....\` para devolver el hash.`)
            } finally {message.channel.send(siEnviarEmbed)}
    }
}