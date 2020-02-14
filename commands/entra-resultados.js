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
        var matchId = args [1];
        var matchResult = args[2];
        var winner = args[3];

        client.matches.update({
            id: turl,
            matchId: matchId,
            match: {
              scoresCsv: matchResult,
              winnerId: winner
            },
            callback: (err, data) => {
              console.log(err, data);
            }
          });
    },
};