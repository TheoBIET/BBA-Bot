const {
    MessageEmbed
} = require("discord.js")

module.exports = async (client, message) => {
    const settings = await client.getGuild(message.guild);
    let logsChannelId = settings.logsChannel
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
    if (logsChannelId === 'none') {
        return
    } else {
        client.channels.cache.get(logsChannelId).send(embed)
    }
}