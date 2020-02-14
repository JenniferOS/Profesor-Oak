var request = require("request");
var { challonge } = require('../config.json')
const challongem = require('challonge');

const client = challongem.createClient({
    apiKey: challonge
});


module.exports = {
    name: 'mlist',
    description: 'Muestra la lista de match del torneo',
    torneo: '',
    execute(message, args) {

        var turl = args[0];

        client.matches.index({
            id: turl,
            callback: (err, data) => {
              console.log(err, data);
            }
          });
    },
};