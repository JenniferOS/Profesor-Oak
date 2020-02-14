var request = require("request");
var { challonge } = require('../config.json')
const challongem = require('challonge');

const client = challongem.createClient({
    apiKey: challonge
});


module.exports = {
    name: 'lstorneos',
    description: 'Comando para listar los torneos actuales',
    torneo: '',
    descripcion_torneo: '',
    execute(message, args) {

        client.tournaments.index({
            callback: (err, data) => {
                //console.log(err, data);

                var arrayCampos = [];

                for (let key in data) {
                    if (data[key].tournament.state == 'pending') {
                        arrayCampos.push({
                            name: `**Torneo ** ${data[key].tournament.name}`,
                            value: `**ID de inscripcion: ** ${data[key].tournament.url}`
                        }) 
                    }
                }


                //message.channel.send(data['0'].tournament.name);

                var listaTorneos = {
                    color: 0xB40404,
                    title: 'Lista de Torneos',
                    url: 'https://discord.gg/cpokemon',
                    author: {
                        name: message.author.username,
                        icon_url: message.member.avatarURL,
                        url: 'https://discord.gg/cpokemon',
                    },
                    description: 'Lista de los torneos activos a los que puedes participar',
                    thumbnail: {
                        url: message.member.avatarURL
                    },
                    fields: arrayCampos,
                    image: {
                        url: 'https://cdn.discordapp.com/attachments/604163839017353225/625556635657437194/cplogo-hdpi.png',
                    },
                    timestamp: new Date(),
                    footer: {
                        text: 'Intenta ser siempre el mejor!!',
                        icon_url: message.member.avatarURL,
                    },
                };

                message.channel.send({ embed: listaTorneos });

            }
        });

    },
};