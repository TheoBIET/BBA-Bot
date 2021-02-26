const {
    MessageEmbed
} = require('discord.js')

module.exports = async (client, channel) => {
    const settings = await client.getGuild(channel.guild);
    let logsChannelId = settings.logsChannel
    if (channel.type === 'dm') return
    else {
        const fetchGuildAuditLogs = await channel.guild.fetchAuditLogs({
            limit: 1,
            type: 'CHANNEL_CREATE'
        });

        const latestChannelCreated = fetchGuildAuditLogs.entries.first();
        const {
            executor
        } = latestChannelCreated;

        getChannelType = (type) => {
            if (type === 'text') {
                return 'Textuel'
            } else {
                return 'Vocal'
            }
        }

        let embed = new MessageEmbed()
            .setColor(`#FFDAB9`)
            .setDescription(`**Nom:** ${channel.name}\n **Type:** ${getChannelType(channel.type)}`)
            .setAuthor(`Un nouveau salon a été créé!`)
            .setThumbnail(executor.displayAvatarURL())
            .setFooter(`${executor.username}`)
            .setTimestamp();
        if (logsChannelId !== 'none') {
            client.channels.cache.get(logsChannelId).send(embed)
        }

    }

}