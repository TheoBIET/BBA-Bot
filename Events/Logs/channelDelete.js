const { MessageEmbed } = require('discord.js')

module.exports = async (client, channel) => {
    const settings = await client.getGuild(channel.guild);
    let logsChannelId = settings.logsChannel
    const fetchGuildAuditLogs = await channel.guild.fetchAuditLogs({
        limit : 1,
        type : 'CHANNEL_DELETE'
    });

    const latestChannelDeleted = fetchGuildAuditLogs.entries.first();
    const { executor } = latestChannelDeleted;

    getChannelType = (type) => {
        if (type === 'text') {
            return 'Textuel'
        } else {
            return 'Vocal'
        }
    }

    let embed = new MessageEmbed()
        .setColor(`#FFDAFF`)
        .setDescription(`**Nom:** ${channel.name}\n **Type:** ${getChannelType(channel.type)}`)
        .setAuthor(`Un salon a été supprimé!`)
        .setThumbnail(executor.displayAvatarURL())
        .setFooter(`${executor.username}`)
        .setTimestamp();
    if (logsChannelId !== 'none') {
        client.channels.cache.get(logsChannelId).send(embed)
    }
}