const { MessageEmbed } = require('discord.js')

module.exports = async (client, message) => {
    const settings = await client.getGuild(message.guild);
    let logsChannelId = settings.logsChannel
    const fetchGuildAuditLogs = await message.guild.fetchAuditLogs({
        limit : 1,
        type : 'MESSAGE_DELETE'
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
    if (logsChannelId !== 'none') {
        client.channels.cache.get(logsChannelId).send(embed)
    }
}