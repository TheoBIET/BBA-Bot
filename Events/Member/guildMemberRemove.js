const {
    MessageEmbed
} = require('discord.js');
let moment = require('moment')

module.exports = (client, member) => {
    let {
        logsChannelId
    } = require('../../Commands/Configuration/logsChannel')
    console.log(`${member.user}`);
    let counter = member.guild.memberCount
    const embed = new MessageEmbed()
        .setColor('#FF0000')
        .setThumbnail(member.user.displayAvatarURL())
        .setTitle(`${member.displayName} a quitté!`)
        .setDescription(`Nous sommes désormais ${counter} sur ${member.guild.name}`)
        .addFields({
            name: 'Invité par',
            value: 'In coding',
            inline: true
        }, {
            name: 'Compte créé le',
            value: `${moment(member.user.createdAt).locale("fr").format('Do MMMM YYYY')}`,
            inline: true
        }, )
        .setTimestamp()
    if (logsChannelId !== undefined) {
        client.channels.cache.get(logsChannelId).send(embed)
    }
}