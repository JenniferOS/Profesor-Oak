var request = require("request");
var { challonge } = require('../config.json')
const challongem = require('challonge');

const client = challongem.createClient({
    apiKey: challonge
});


module.exports = {
    name: 'inscripcion',
    description: 'Comando para listar los torneos actuales',
    execute(message, args) {

        var turl = args[0];

        client.participants.create({
            id: turl,
            participant: {
              name: message.author.username
            },
            callback: (err, data) => {
              if (err && data.statusCode == 422) {
                  message.reply("Ya estas inscrito a este torneo");
              }else {
                  message.reply('Te inscribiste a este torneo, mucha suerte!');
              }
            }
          });

    },
};