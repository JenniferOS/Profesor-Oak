var request = require("request");
var { challonge } = require('../config.json')
const challongem = require('challonge');

const client = challongem.createClient({
    apiKey: challonge
});


module.exports = {
    name: 'treiniciar',
    description: 'Reinicia un torneo, se pueden agregar, eliminar y editar participantes antes de que el torneo comience de nuevo',
    torneo: '',
    execute(message, args) {

        turl = args[0];

        client.tournaments.reset({
            id: turl,
            callback: (err, data) => {
                console.log(err, data);
                if (err) {
                    message.channel.send('Ocurrio un error al reiniciar el torneo, intentalo de nuevo. Verifica que este bien escrito el comando y el id');
                } else {
                    message.channel.send(`El torneo ${data.tournament.name} ha sido reiniciado. Debes empezarlo nuevamente. El status ha cambiado`);
                }
            }
        });

    },
};