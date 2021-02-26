const { MESSAGES } = require('../../Util/constants')

const {
    MessageEmbed
} = require("discord.js");

module.exports.run = (client, message, args, settings) => {
    let logsChannelId = settings.logsChannel
    const user = message.mentions.users.first();
    let reason = args.splice(1).join(' ') || 'Aucune raison spécifiée';

    if (user) {
        let embed = new MessageEmbed()
            .setColor(`#BB0B0B`)
            .setTitle(`${reason}`)
            .setAuthor(`${user.username} à été banni!`)
            .setThumbnail(user.displayAvatarURL())
            .setFooter(`${message.author.username}`, message.author.displayAvatarURL())
            .setTimestamp();
        message.delete()
        if(logsChannelId === 'none') {
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

module.exports.help = MESSAGES.COMMANDS.MODERATION.BAN