const {
    MessageEmbed
} = require("discord.js");

module.exports.run = (client, message, args) => {
    let { logsChannelId } = require('../Configuration/logsChannel.js')
    const user = message.mentions.users.first();
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
        if(logsChannelId === undefined) {
            message.channel.send(embed)
        }else {
            client.channels.cache.get(logsChannelId).send(embed)
        }
        message.guild.member(user).ban({
            reason: reason
        });
    }else {
        message.channel.send('L\'utilisateur mentionné n\'existe pas, veuillez réessayer');
    }
}

module.exports.help = {
    name: 'ban',
    aliases: ['ban'],
    description: 'Banni l\'utilisateur mentionné',
    cooldown: 1,
    usage: 'exemple: **?ban @user**',
    isUserAdmin: true,
    permissions: true,
    args: true,
}