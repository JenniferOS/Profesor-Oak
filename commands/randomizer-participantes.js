var request = require("request");
var { challonge } = require('../config.json')
const challongem = require('challonge');

const client = challongem.createClient({
    apiKey: challonge
});


module.exports = {
    name: 'randomizap',
    description: 'Randomiza los participantes para crear el bracket',
    torneo: '',
    execute(message, args) {

        var turl = args[0];

        client.participants.randomize({
            id: turl,
            callback: (err, data) => {
                console.log(err, data);
                if (err) {
                    message.channel.send('Ocurrio un error al randomizar los participantes. Verifica que el torneo no haya empezado y que el comando este bien escrito');
                } else {
                    message.channel.send(`Se han creado los brackets`)

                }
            }
        });

    },
};