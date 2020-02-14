var request = require("request");
var { challonge } = require('../config.json')
const challongem = require('challonge');

const client = challongem.createClient({
    apiKey: challonge
});

// if 
module.exports = {
    name: 'tfinalizar',
    description: 'Finaliza un torneo cuando todos los matches hayan terminado y hayan sido enviados',
    torneo: '',
    execute(message, args) {

        turl = args[0];

        client.tournaments.finalize({
            id: turl,
            callback: (err, data) => {
                console.log(err, data);
                if (err) {
                    message.channel.send('Ocurrio un error al concluir el torneo, intentalo de nuevo. Verifica que este bien escrito el comando y el id');
                } else {
                    message.channel.send(`El torneo ${data.tournament.name} ha finalizado correctamente y su estado ha cambiado`)
                }
            }
        });

    },
};