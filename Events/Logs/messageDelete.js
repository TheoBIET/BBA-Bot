const { MessageEmbed } = require('discord.js')

module.exports = async (client, message) => {
    let {
        logsChannelId
    } = require('../../Commands/Configuration/logsChannel')
    const fetchGuildAuditLogs = await message.guild.fetchAuditLogs({
        limit : 1,
        type : 'MESSAGE_CREATE'
    });

    const latestMessageDeleted = fetchGuildAuditLogs.entries.first();
    const { executor } = latestMessageDeleted;

    getChannelType = (type) => {
        if (type === 'text') {
            return 'Textuel'
        } else {
            return 'Vocal'
        }
    }

    let embed = new MessageEmbed()
        .setColor(`#9807AF`)
        .setDescription(`**Auteur:** ${message.author}\n **Message:** ${message.content}`)
        .setAuthor(`Un message a été supprimé par ${executor.username}!`)
        .setThumbnail(executor.displayAvatarURL())
        .setTimestamp();
    if (logsChannelId !== undefined) {
        client.channels.cache.get(logsChannelId).send(embed)
    }
}