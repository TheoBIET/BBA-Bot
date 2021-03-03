const {
    MessageEmbed
} = require('discord.js');
let moment = require('moment')

module.exports = async (client, member) => {
    const settings = await client.getGuild(member.guild);
    let logsChannelId = settings.logsChannel
    let counter = member.guild.memberCount
    const embed = new MessageEmbed()
        .setColor('#FF0000')
        .setThumbnail(member.user.displayAvatarURL())
        .setTitle(`${member.displayName} a quitté!`)
        .setDescription(`Nous sommes désormais ${counter} sur ${member.guild.name}`)
        .addFields( {
            name: 'Compte créé le',
            value: `${moment(member.user.createdAt).locale("fr").format('Do MMMM YYYY')}`,
            inline: true
        }, )
        .setTimestamp()
    if (logsChannelId !== 'none') {
        client.channels.cache.get(logsChannelId).send(embed)
    }
}