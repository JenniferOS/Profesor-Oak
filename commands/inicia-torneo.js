var request = require("request");
var { challonge } = require('../config.json')
const challongem = require('challonge');

const client = challongem.createClient({
    apiKey: challonge
});


module.exports = {
    name: 'tiniciar',
    description: 'Da inicio a un torneo',
    torneo: '',
    execute(message, args) {

        turl = args[0];

        client.tournaments.start({
            id: turl,
            callback: (err, data) => {
                console.log(err, data);
                if (err) {
                    message.channel.send('Ocurrio un error al comenzar el torneo, intentalo de nuevo. Verifica que este bien escrito el comando y el id');
                } else {
                    message.channel.send(`El torneo ${data.tournament.name} ha dado inicio`);
                }
            }
        });

    },
};