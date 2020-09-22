const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js")

module.exports = {
        name: "serverinfo",
        description: "Devuelve Informacion del servidor",
        usage: "!!serverinfo",
        category: "informacion",
		run: async (client, message, args) => {
			const onlineMembers = message.guild.members.cache.filter(m => m.presence.status !== "offline").size;
			let sEmbed = new Discord.MessageEmbed()
			.setColor("#C7CED4")
			.setTitle("Server Info")
			.setThumbnail('https://i.imgur.com/mnSJzVk.jpg')
			.setAuthor(`${message.guild.name} Info`)
			.addField("**Nombre:**", `${message.guild.name}`, true)
			.addField("**Creador:**", `${message.guild.owner}`, true)
			//.addField("**Cantidad de Miembros:**", `${message.guild.memberCount}`, true)
			.addField("**👥 Miembros:**", `**${message.guild.memberCount}** (**${onlineMembers}** ${onlineMembers === 1 ? " " : " "} online)`, true)
			.addField("**⌨️ Texto:**", `**${message.guild.channels.cache.filter(c => c.type === "text").size}**`, true)
			.addField("**🔉 Voz:**", `**${message.guild.channels.cache.filter(c => c.type === "voice").size}**`, true)
			.addField("**📁 Categorias:**", `**${message.guild.channels.cache.filter(c => c.type === "category").size}**`, true)
			.setFooter(`Setsi | oaki`);
		message.channel.send(sEmbed);
    }
}