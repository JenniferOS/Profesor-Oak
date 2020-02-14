var request = require("request");
var { challonge } = require('../config.json')
const challongem = require('challonge');

const client = challongem.createClient({
    apiKey: challonge
});


module.exports = {
    name: 'listap',
    description: 'Lista todos los participantes de un torneo',
    torneo: '',
    execute(message, args) {

        var turl = args[0];
        var arrayParticipantes = [];
        var auxiliar = 1;

        client.participants.index({
            id: turl,
            callback: (err, data) => {
                for (const key in data) {
                    if (auxiliar == 4) {
                        arrayParticipantes.push({
                            name: '\u200b',
                            value: '\u200b',
                        })
                        auxiliar = 0;
                    } else {
                        arrayParticipantes.push({
                            name: `**ID de participante ** ${data[key].participant.id}`,
                            value: `**Nombre **  ${data[key].participant.name}`,
                            inline: true
                        })
                        auxiliar++;
                    }

                }

                var listaParticipantes = {
                    color: 0xB40404,
                    title: 'Lista de Participantes',
                    author: {
                        name: message.author.username,
                        icon_url: message.member.avatarURL,
                        url: 'https://discord.gg/cpokemon',
                    },
                    description: 'Lista de todos los participantes en el torneo',
                    thumbnail: {
                        url: message.member.avatarURL
                    },
                    fields: arrayParticipantes,
                    image: {
                        url: 'https://cdn.discordapp.com/attachments/604163839017353225/625556635657437194/cplogo-hdpi.png',
                    },
                    timestamp: new Date(),
                };

                message.channel.send({ embed: listaParticipantes });

            }
        });

    },
};