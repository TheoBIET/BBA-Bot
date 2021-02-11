const {
    MessageEmbed
} = require("discord.js");

module.exports.run = (client, message, args) => {
    let { logsChannelId } = require('./logsChannel.js')

    // Récupération et stockage de l'utilisateur mentionné dans la variable 'user'
    const user = message.mentions.users.first();
    // Récupération des arguments présents après la mention
    let reason = args.splice(1).join(' ') || 'Aucune raison spécifiée';

    // Si l'utlisateur mentionné existe alors on envoie un embed avec les informations concernées
    if (user) {
        let embed = new MessageEmbed()
            .setColor(`#BB0B0B`)
            .setTitle(`${reason}`)
            .setAuthor(`${user.username} à été banni!`)
            .setThumbnail(user.displayAvatarURL())
            .setFooter(`${message.author.username}`, message.author.displayAvatarURL())
            .setTimestamp();
        message.delete()
        console.log(logsChannelId);
        if(logsChannelId === undefined) {
            message.channel.send(embed)
        }else {
            client.channels.cache.get(logsChannelId).send(embed)
        }
        message.guild.member(user).ban(reason)
    }else {
        message.channel.send('L\'utilisateur mentionné n\'existe pas, veuillez réessayer');
    }
}

module.exports.help = {
    name: 'ban',
    aliases: ['ban'],
    description: 'Banni l\'utilisateur mentionné',
    cooldown: 1,
    usage: 'exemple: **?ban @BBA**',
    isUserAdmin: true,
    permissions: true,
    args: true,
}