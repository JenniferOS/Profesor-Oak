var request = require("request");
var { challonge } = require('../config.json')
const challongem = require('challonge');

const client = challongem.createClient({
    apiKey: challonge
});


module.exports = {
    name: 'ctorneo',
    description: 'Comando para crear un torneo',
    torneo: '',
    descripcion_torneo: '',
    execute(message, args) {

        if (message.member.roles.some(role => role.name === 'Staff') || message.member.roles.some(role => role.name === 'Super Admin') || message.member.roles.some(role => role.name === 'Organizador')) {

            const filter = m => m.author.id === message.author.id;

            message.reply(`Escribe el nombre del torneo `)
                .then(() => {
                    message.channel.awaitMessages(filter, {
                        max: 1,
                        time: 30000,
                        errors: ['time'],
                    })
                        .then((collected) => {
                            this.torneo = collected.first().content;
                            message.reply(`Agrega una breve descripcion del torneo `)
                                .then(() => {
                                    message.channel.awaitMessages(filter, {
                                        max: 1,
                                        time: 10000,
                                        errors: ['time'],
                                    })
                                        .then((collected) => {
                                            this.descripcion_torneo = collected.first().content;

                                            function randomStr(len, arr) {
                                                var ans = '';
                                                for (var i = len; i > 0; i--) {
                                                    ans +=
                                                        arr[Math.floor(Math.random() * arr.length)];
                                                }
                                                return ans;
                                            }

                                            let urlt = randomStr(8, 'abcdefghijklmnopqrstuvwxyz123456789');
                                            console.log(urlt);

                                            client.tournaments.create({
                                                tournament: {
                                                    name: this.torneo,
                                                    description: this.descripcion_torneo,
                                                    tournamentType: 'single elimination',
                                                    url: urlt
                                                },
                                                callback: (err, data) => {
                                                    //console.log(this.torneo);

                                                    console.log(err, data);
                                                }
                                            })

                                        })
                                        .catch()
                                })
                        })
                        .catch()
                })

        } else {
            return message.channel.send('No tienes los permisos para crear un torneo');
        }

    },
};