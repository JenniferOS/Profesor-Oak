var request = require("request");
var { challonge } = require('../config.json')
const challongem = require('challonge');

const client = challongem.createClient({
    apiKey: challonge
});


module.exports = {
    name: 'eliminap',
    description: 'Elimina a un participante del torneo',
    torneo: '',
    execute(message, args) {

        var turl = args[0];
        var participante = args[1];

        client.participants.destroy({
            id: turl,
            participantId: participante,
            callback: (err, data) => {
                console.log(err, data);
                if (err) {
                    message.channel.send('Ocurrio un error al eliminar el participante de este torneo. Es posible que ya no se encuentre registrado, si esto sigue ocurriendo verifica que este bien escrito el comando y el id del torneo y participante');
                } else {
                    message.channel.send(`El participante ha sido eliminado`);
                }
            }
        });

    },
};