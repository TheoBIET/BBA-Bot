const {
    MessageEmbed
} = require("discord.js");

module.exports.run = async (client, message, args) => {
    let {
        logsChannelId
    } = require('../Configuration/logsChannel.js');
    let {
        authRoleId
    } = require('../Configuration/authRole.js');
    const user = message.guild.member(message.mentions.users.first());
    const embedUser = user.user
    let muteRole = message.guild.roles.cache.find(r => r.name === 'muted');
    let reason = args.splice(1).join(' ') || 'Aucune raison spécifié'

    if (authRoleId == undefined) {
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
        if (logsChannelId === undefined) {
            message.channel.send(embed)
        } else {
            client.channels.cache.get(logsChannelId).send(embed)
        }
    } else {
        message.channel.send('L\'utilisateur mentionné n\'existe pas, veuillez réessayer');
    };
};

module.exports.help = {
    name: 'unmute',
    aliases: ['unmute'],
    description: 'Démute un utilisateur mentionné',
    cooldown: 1,
    usage: 'exemple: **?unmute @user <time> <reason>**',
    isUserAdmin: true,
    permissions: true,
    args: true,
}