const Discord = require('discord.js');
const client = new Discord.Client();
const conf = require('./ignore/config.json');

let prefix = conf.prefix;

// Lista de roles para (1)
let staffRoles = [""];

client.on("ready", () => {
    console.log("Eres mi nieta pero no recuerdo tu nombre :(");
 });

 client.on('error', console.error);
 
 client.on("message", (message) => {
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    /* * * * * * * * * * * * 
    * COMANDOS: 
    * 1.- Cambiar nick
    * 
    * * * * * * * * * * * * */

    // 1
    if (message.content.startsWith(prefix+'nickname') || message.content.startsWith(prefix+'nick')|| message.content.startsWith(prefix+'mote')) {

        // Valida si el bot tiene permiso para administrar nicks, si no, manda un mensaje
        if (!message.guild.me.hasPermission('MANAGE_NICKNAMES')) return message.channel.send('No tengo permisos para administrar nombres');
        if (message.member.roles.some(role => role.name === 'Staff') || message.member.roles.some(role => role.name === 'Super Admin')) {
            return message.channel.send('No puedo cambiarte el nombre a ti -_-')
        }
        // Guarda el nuevo nick como parte de los argumentos del comando
        let newNick = args.join(" ");
        if (message.member.roles.some(role => role.name === 'Novato')) {
            if (!args) {
                return message.member.setNickname(message.author.username);
            } else {
                message.member.setNickname(newNick);
                return message.channel.send(`No se si ${newNick} es nombre de Chico o Chica, pero buena elección!`);
            }
        }

    }


    if (message.channel.id === '556358295762239494') {
        message.react('✅')
            .then(() => message.react('❎'))
            .catch(() => console.log('x____x!'));
    }

});


 client.login(conf.token)