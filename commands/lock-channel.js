var request = require("request");
var { challonge } = require('../config.json')

module.exports = {
    name: 'lock',
    description: 'Bloquea un canal',
    torneo: '',
    execute(message, args, client) {

        if(message.member.roles.some(role => role.name === 'Staff') || message.member.roles.some(role => role.name === 'Moderador') || message.member.roles.some(role => role.name === 'Super Admin') || message.member.roles.some(role => role.name === 'Admins')) {

            
            let channel = client.channels.find('name', args[0]);
            console.log(args[0]);
            
            let roles = message.guild.roles;
    
            let role1 = roles.find('name', 'Scorbunny');
            let role2 = roles.find('name', 'Sobble');
            let role3 = roles.find('name', 'Grookey');

            channel.overwritePermissions(
                role1,
                {
                    'SEND_MESSAGES': false,
                    'VIEW_CHANNEL': false
                }
            )
            .then(console.log('error'))
            .catch(console.log('error'));

            channel.overwritePermissions(
                role2,
                {
                    'SEND_MESSAGES': false,
                    'VIEW_CHANNEL': false
                }
            )
            .then(console.log('error'))
            .catch(console.log('error'));

            channel.overwritePermissions(
                role3,
                {
                    'SEND_MESSAGES': false,
                    'VIEW_CHANNEL': false
                }
            )
            .then(console.log('error'))
            .catch(console.log('error'));

            message.channel.send('Canal bloqueado');

        } else {
            message.channel.send('No tienes los permisos para usar este comando');
        }

    },
};