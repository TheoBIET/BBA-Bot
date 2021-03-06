const { MESSAGES } = require('../../Util/constants')
const {
    MessageEmbed
} = require("discord.js");

module.exports.run = async (client, message, args, settings) => {
    let logsChannelId = settings.logsChannel
    let authRoleId = settings.authRole
    const user = message.guild.member(message.mentions.users.first());
    const embedUser = user.user
    let muteRole = message.guild.roles.cache.find(r => r.name === 'muted');
    let reason = args.splice(1).join(' ') || 'Aucune raison spécifié'

    if (authRoleId == 'none') {
        return message.reply('**Le serveur n\'a pas correctement été paramétré pour la commande `mute`**.\nVeuillez définir l\'id du rôle principal avec la commande `setauth`')
    } else {
        user.roles.add(authRoleId).catch((e) => console.log(e.message))
    }
    user.roles.remove(muteRole.id).catch((e) => console.log(e.message))
    if (user) {
        let embed = new MessageEmbed()
            .setColor(`#050505`)
            .setTitle(reason)
            .setAuthor(`${embedUser.username} est démute!`)
            .setThumbnail(embedUser.displayAvatarURL())
            .setFooter(`${message.author.username}`, message.author.displayAvatarURL())
            .setTimestamp();
        message.delete();
        if (logsChannelId === 'none') {
            message.channel.send(embed);
        } else {
            client.channels.cache.get(logsChannelId).send(embed);
        }
    } else {
        message.channel.send('L\'utilisateur mentionné n\'existe pas, veuillez réessayer');
    };
};

module.exports.help = MESSAGES.COMMANDS.MODERATION.UNMUTE;