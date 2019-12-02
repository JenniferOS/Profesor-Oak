var request = require("request");
var { challonge } = require('../config.json')

module.exports = {
    name: 'nick',
    description: 'Cambia el nombre de usuario en el servidor',
    execute(message, args) {
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
    },
};