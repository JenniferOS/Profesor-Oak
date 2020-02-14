var request = require("request");
var { challonge } = require('../config.json');
var mongoose = require('mongoose');


module.exports = {
    name: 'reparticion',
    description: '',
    execute(message, args) {
        
        mongoose.connect('mongodb+srv://jennette:<momoqueen>@oak-uwrrw.mongodb.net/test?retryWrites=true&w=majority');
        var db = mongoose.connection;
        
        db.on('error', console.error.bind(console, 'connection error:'));

        db.once('open', function(){
            console.log('Conexion exitosa');

            // define Schema
            var reparticiones = mongoose.Schema({
                discord: String,
                trainer: String,
                code: Number,
                description: String
            });

        });

        const client = new MongoClient(uri, { useNewUrlParser: true });
        client.connect(err => {
            const collection = client.db("centropokemon").collection("test");
            // perform actions on the collection object
            client.close();
        });

    },
};