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

    let content = message.content || 'Inconnu'
    let embed = new MessageEmbed()
        .setColor(`#9807AF`)
        .setDescription(`**Auteur:** ${message.author}\n **Message:** ${content}`)
        .setAuthor(`Un message a été supprimé par ${executor.username}!`)
        .setThumbnail(executor.displayAvatarURL())
        .setTimestamp();
    if (logsChannelId !== undefined) {
        client.channels.cache.get(logsChannelId).send(embed)
    }
}