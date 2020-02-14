var request = require("request");
var { challonge } = require('../config.json')
const challongem = require('challonge');

const client = challongem.createClient({
    apiKey: challonge
});


module.exports = {
    name: 'teliminar',
    description: 'Elimina un torneo de la cuenta',
    torneo: '',
    execute(message, args) {

        var turl = args[0];

        client.tournaments.destroy({
            id: turl,
            callback: (err, data) => {
              console.log(err, data);
              if (err) {
                  message.channel.send('Ocurrio un error al eliminar el torneo, intentalo de nuevo. Verifica que este bien escrito el comando y el id');
              }else {
                  message.channel.send(`A Rotom le entró virus y ha eliminado el torneo ${data.tournament.name}`)

              }
            }
          });

    },
};