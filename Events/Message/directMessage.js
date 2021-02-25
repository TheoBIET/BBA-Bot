const {
    MessageEmbed
} = require("discord.js")

module.exports = (client, message) => {
    let {
        logsChannelId
    } = require('../../Commands/Configuration/logsChannel')
    const user = message.author
    if (user.bot) return

    let embed = new MessageEmbed()
        .setColor(`#FFA500`)
        .setTitle(`Envoi d\'un message privée \n ${message.content} \n ${user}`)
        .setAuthor(`${user.username}`)
        .setThumbnail(user.displayAvatarURL())
        .setFooter(`${message.author.username}`, message.author.displayAvatarURL())
        .setTimestamp();
    user.send('Merci pour votre message, si celui est utile, vous aurez une réponse très rapidement!')
    if (logsChannelId === undefined) {
        return
    } else {
        client.channels.cache.get(logsChannelId).send(embed)
    }
}