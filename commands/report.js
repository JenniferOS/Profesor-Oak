var request = require("request");
var { challonge } = require('../config.json')

module.exports = {
    name: 'report',
    description: 'Reporta usuarios por mal comportamiento',
    execute(message, args) {
        if (message.content.startsWith(`${prefix}report`)){
            //obtiene el nombre del usuario
            let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
            let member = message.mentions.user.first(); 
            //Si no etiquetas a nadie te informa de que debes hacerlo
            if(!rUser) return message.channel.send("¡Tienes que etiquetar a un usuario!");
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
    },
};