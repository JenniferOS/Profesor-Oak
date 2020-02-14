var request = require("request");
var { challonge } = require('../config.json')
const challongem = require('challonge');

const client = challongem.createClient({
    apiKey: challonge
});


module.exports = {
    name: 'tinfo',
    description: 'Comando mostrar la informacion de un torneo especifico',
    torneo: '',
    execute(message, args) {

        if (!args[0]) return;

        var turl = args[0];

        client.tournaments.show({
            id: turl,
            callback: (err, data) => {
                console.log(err, data);

                var status;
                var descrip;
                if (data.tournament.state == 'pending') {
                    status = 'Pendiente';
                } else if (data.tournament.state == 'underway'){
                    status = 'En marcha';
                } else if (data.tournament.state == 'complete') {
                    status = 'Finalizado'
                } else {
                    status = data.tournament.state;
                }

                if(data.tournament.description == ''){
                    descrip = 'Sin descripcion proporcionada';
                } else {
                    descrip = data.tournament.description;
                }

                var listaTorneos = {
                    color: 0xF0FC52,
                    title: data.tournament.name,
                    url: data.tournament.fullChallongeUrl,
                    author: {
                        name: message.author.username,
                        icon_url: message.member.avatarURL,
                        url: 'https://discord.gg/cpokemon',
                    },
                    description: `Informacion completa de ${data.tournament.name}`,
                    thumbnail: {
                        url: message.member.avatarURL
                    },
                    fields: [
                        {
                            name: `ID`,
                            value: `${data.tournament.url}`,
                            inline: true
                        },
                        {
                            name: 'Progreso',
                            value: `${data.tournament.progressMeter}%`,
                            inline: true
                        },
                        {
                            name: 'Status',
                            value: `${status}`,
                            inline: true
                        },
                        {
                            name: `Descripcion`,
                            value: `${descrip}`
                        },
                        {
                            name: `Formato`,
                            value: `Eliminacion directa`
                        },
                        {
                            name: '\u200b',
                            value: '\u200b',
                        },
                        {
                            name: `Fecha de creacion`,
                            value: `${data.tournament.createdAt}`,
                            inline: true
                        },
                        {
                            name: `Última actualización`,
                            value: `${data.tournament.updatedAt}`,
                            inline: true
                        },
                        {
                            name: '\u200b',
                            value: '\u200b',
                        },
                        {
                            name: `Puntos por Victoria`,
                            value: `${data.tournament.ptsForMatchWin}`,
                            inline: true
                        },
                        {
                            name: `Puntos por Empate`,
                            value: `${data.tournament.ptsForMatchTie}`,
                            inline: true
                        },
                        {
                            name: `Puntos necesarios para avanzar`,
                            value: `${data.tournament.ptsForBye}`,
                            inline: true
                        },
                        {
                            name: '\u200b',
                            value: '\u200b',
                        },
                        {
                            name: `Sigue el torneo en vivo`,
                            value: `${data.tournament.liveImageUrl}`,
                        },

                    ],
                    timestamp: new Date(),
                    footer: {
                        text: '¿Me recuerdas tu nombre?',
                        icon_url: message.member.avatarURL,
                    },
                };

                message.channel.send({ embed: listaTorneos });

            }
        });

    },
};