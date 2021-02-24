const {
    MessageEmbed
} = require('discord.js');

module.exports = (client, messageReaction, user) => {
    let {
        logsChannelId
    } = require('../../Commands/Configuration/logsChannel.js')
    let {
        authChannelId
    } = require('../../Commands/Configuration/authChannel.js');
    let {
        authRoleId
    } = require('../../Commands/Configuration/authRole.js');
    const message = messageReaction.message;
    const member = message.guild.members.cache.get(user.id);
    const emoji = messageReaction.emoji.name
    const channel = message.guild.channels.cache.find(c => c.id === authChannelId)

    if (member.user.bot) return;
    if ((authRoleId || authChannelId) === undefined) return;

    if (['✅', '❌'].includes(emoji) && message.channel.id === channel.id) {
        switch (emoji) {
            case '✅':
                member.roles.add(authRoleId).catch(console.error)
                if (logsChannelId !== undefined) {
                    let embed = new MessageEmbed()
                        .setColor(`#096a09`)
                        .setTitle(`Un nouveau membre a été vérifié`)
                        .setAuthor(`${user.username} vient d'être vérifié!`)
                        .setThumbnail(user.displayAvatarURL())
                        .setTimestamp();
                    client.channels.cache.get(logsChannelId).send(embed)
                }
                break;
            case '❌':
                message.guild.member(user).kick('N\'a pas accepté la vérification!')
                if (logsChannelId !== undefined) {
                    let embed = new MessageEmbed()
                        .setColor(`#FFA500`)
                        .setTitle('N\'a pas accepté la vérification!')
                        .setAuthor(`${user.username} à été kick!`)
                        .setThumbnail(user.displayAvatarURL())
                        .setTimestamp();
                    client.channels.cache.get(logsChannelId).send(embed)
                }
                break;
        }
    }

}