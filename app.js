const Discord = require('discord.js');
const client = new Discord.Client();
const conf = require('./ignore/config.json');

let prefix = conf.prefix;

// Lista de roles para (1)
let staffRoles = [""];

client.on("ready", () => {
    console.log("Eres mi nieta pero no recuerdo tu nombre :(");
 });

 client.on('error', console.error);
 
 client.on("message", (message) => {
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    /* * * * * * * * * * * * * * * * * 
    * COMANDOS:                      *
    * 1.- Cambiar nick               *
    * 2.- reporte de usuarios        *
    * 3.- Sugerencias                *
    * 4.- Emotes (Legacy)            *
    * * * * * * * * * * * * * * * * */

    // 1
    if (message.content.startsWith(prefix+'nickname') || message.content.startsWith(prefix+'nick')|| message.content.startsWith(prefix+'mote')) {

        // Valida si el bot tiene permiso para administrar nicks, si no, manda un mensaje
        if (!message.guild.me.hasPermission('MANAGE_NICKNAMES')) return message.channel.send('No tengo permisos para administrar nombres');
        if (message.member.roles.some(role => role.name === 'Staff') || message.member.roles.some(role => role.name === 'Super Admin')) {
            return message.channel.send('No puedo cambiarte el nombre a ti -_-')
        }
        // Guarda el nuevo nick como parte de los argumentos del comando
        let newNick = args.join(" ");
        if (message.member.roles.some(role => role.name === 'Novato')) {
            if (!newNick) {
                 message.member.setNickname(message.author.username);
                 return message.channel.send(`Tu nombre es entonces ${message.author.username}? Genial!`);
            } else {
                message.member.setNickname(newNick);
                return message.channel.send(`No se si ${newNick} es nombre de Chico o Chica, pero buena elecciÃ³n!`);
            }
        }

    }

    //2
    if (message.content.startsWith(`${prefix}report`)){
        //obtiene el nombre del usuario
        let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        let member = message.mentions.users.first(); 
        //Si no etiquetas a nadie te informa de que debes hacerlo
        if(!rUser) return message.channel.send("Â¡Tienes que etiquetar a un usuario!");
        let reason = args.join(" ").slice(22);
         
        let report = new Discord.RichEmbed()
         .setColor("#F13F0F")
         .setTitle("Reporte de usuarios")
         .setDescription("Reporte")
         .setThumbnail(member.avatarURL)
         .addField("**Usuario reportado**", `*${rUser}*`, true)
         .addField("**Reportado por:**", `*${message.author}*`, true)
         .addField("**Canal**:", `*${message.channel}*`, true)
         .addField("**Razon:**", `*${reason}*`,  true)
         .addField("**Hora de reporte:**", `${message.createdAt}`, true);
         
        let staff = message.guild.channels.find(`name`, "staff");
 
        message.delete().catch(_O_o=>{}); //borra el ultimo mensaje enviado NOTA: REQUIERE PERMISOS
        staff.send(report);
 
        return message.channel.send("*El reporte ha sido mandado al staff*");
     }


    if (message.channel.id === '556358295762239494') {
        message.react('âœ…')
            .then(() => message.react('âŽ'))
            .catch(() => console.log('x____x!'));
    }


    //3
     if (message.content.includes(":")) {
       if(message.content.includes("<")) { } else {
         var e = message.content.slice(message.content.indexOf(":") + 1);
         var ext = e.slice(0, e.indexOf(":"));
         var emote = client.emojis.find(emoji => emoji.name == ext)
         var es = message.guild.emojis.find(emoji => emoji.name == ext)
         if (message.author.bot) { } else {
             if (emote) {
                 if (es) { }
                 else { message.channel.send(`${emote}`) 
             }
           }
         }
       } 
     }

});


 client.login(conf.token)
