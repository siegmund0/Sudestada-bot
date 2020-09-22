const Discord = require('discord.js');
const moment = require('moment');
const { MessageEmbed } = require("discord.js");
const OS = require('os');
const os = require('os');
var oldCPUTime = 0
var oldCPUIdle = 0
moment.locale('America/Argentina/Buenos_Aires');

module.exports = {
    name: 'dedicado',
    category: 'informacion',
    description: 'Muestra informacion servidor dedicado.',
    usage: '!!dedicado',
    run: async (client, message, args) => {
    console.log("Se utilizo comando DEDICADO - Setsi");	
    const inline = true;
    const botAvatar = 'https://i.imgur.com/mnSJzVk.jpg';
    const date = client.user.createdAt;
    const userName = client.user.username;
    const servsize = client.guilds.cache.size;
    const usersize = client.users.cache.size;
    const status = {
      online: '`🟢` Online',
      offline: '`⚫` Offline'
    };

    const embed = new Discord.MessageEmbed()
      .setColor("#C7CED4")
      .setAuthor(message.author.username, "https://cdn.discordapp.com/avatars/"+message.author.id+"/"+message.author.avatar+".png")
      .addFields(
        { name: "CPU", value:'```' + `Intel i5 4690k \n3.5 Ghz - 4.2 Ghz` + '```', inline: true },
        { name: "Uso CPU", value:'```' + `Uso: ${getLoad().CPU} % \nAVG Uso: ${os.loadavg()} %` + '```', inline: true },
        { name: 'Network', value:'```' + '20 Mbps' + '```', inline: true },
        { name: "Memoria", value:'```' + `Total: ${Math.round(OS.totalmem()/1000000)} MB \nLibre: ${Math.round(OS.freemem()/1000000)} MB \nUsado: ${Math.round(OS.totalmem()-OS.freemem())/1000000} MB` + '```', inline: true },
        { name: "OS", value:'```' + `Este bot corre bajo ${os.arch()} exactamente ${os.type()} \nUptime: ${os.uptime()/1000} Hs` + '```', inline: true },
        { name: "Versions", value:'```' + `Node Version: ${process.versions.node} \nv8: ${process.versions.v8}` + '```', inline: true },
        )
      .setFooter(`2020 © ${client.user.username}.`)
      .setTimestamp()

    if (client.user.presence.status) {
      embed.addField(
        '**Status**',
        `${status[client.user.presence.status]}`,
        inline,
        true
      )
    }

    message.channel.send(embed);
  },

  conf: {},
}
/**
 * Formata a data passada para o padrão do Brasil.
 * @param {string} template
 * @param {Date=} [date]
 * @return {string}
 */
function formatDate (template, date) {
  var specs = 'YYYY:MM:DD:HH:mm:ss'.split(':')
  date = new Date(date || Date.now() - new Date().getTimezoneOffset() * 6e4)
  return date.toISOString().split(/[-:.TZ]/).reduce(function (template, item, i) {
    return template.split(specs[i]).join(item)
  }, template)
}
function getLoad(){
    var cpus = OS.cpus()
    var totalTime = -oldCPUTime
    var totalIdle = -oldCPUIdle
    for(var i = 0; i < cpus.length; i++) {
        var cpu = cpus[i]
        for(var type in cpu.times) {
            totalTime += cpu.times[type];
            if(type == "idle"){
                totalIdle += cpu.times[type];
            }
        }
    }

    var CPUload = 100 - Math.round(totalIdle/totalTime*100)
    oldCPUTime = totalTime
    oldCPUIdle = totalIdle

    return {
        CPU:CPUload,
        mem:100 - Math.round(OS.freemem()/OS.totalmem()*100)
    }       
}