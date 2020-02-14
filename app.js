// Configurations
const fs = require('fs');

const Discord = require('discord.js');
const client = new Discord.Client();
const { prefix, token } = require('./config.json');

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.on('ready', () => {
    console.log(`Bienvenido al mundo Pokemon`);
});

client.on('message', message =>{

    if (!message.content.startsWith(prefix) || message.author.bot) return; 
 
	const args = message.content.slice(prefix.length).split(/ +/); 
	const command = args.shift().toLowerCase(); 
    if (!client.commands.has(command)) return; 
    console.log(prefix, token); 
 
    if (message.channel.id === '556358295762239494') { 
        message.react('✅')
            .then(() => message.react('❎'))
            .catch(() => console.log('x____x!'));
    }

    if(message.content.includes(":")){var e = message.content.slice(message.content.indexOf(":")+1);
    var ext = e.slice(0, e.indexOf(":"));
    var emote = client.emojis.find(emoji => emoji.name == ext)
    var es = message.guild.emojis.find(emoji => emoji.name == ext)
    if(message.author.bot){} else {
        if(emote){if(es){}
            else{message.channel.send(`${emote}`)}}}}

    try {
        client.commands.get(command).execute(message, args, client);
    } catch (error) {
        console.error(error);
        message.reply('El cómando que escribiste es inválido o no existe');
    }
    
});

 client.login(token)
