const { MessageEmbed } = require('discord.js')

module.exports = async (client, channel) => {
    let {
        logsChannelId
    } = require('../../Commands/Configuration/logsChannel')
    const fetchGuildAuditLogs = await channel.guild.fetchAuditLogs({
        limit : 1,
        type : 'CHANNEL_DELETE'
    });

    const latestChannelDeleted = fetchGuildAuditLogs.entries.first();
    //console.log('%cchannelCreate.js line:8 latestChannelCreated', 'color: #007acc;', latestChannelCreated);
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
        console.log('%cchannelDelete.js line:25 channel.type', 'color: #007acc;', channel.type);
    if (logsChannelId !== undefined) {
        client.channels.cache.get(logsChannelId).send(embed)
    }
}