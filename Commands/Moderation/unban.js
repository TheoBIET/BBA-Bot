const { MESSAGES } = require('../../Util/constants')
const {
    MessageEmbed
} = require("discord.js");

module.exports.run = async (client, message, args) => {
    let {
        logsChannelId
    } = require('../Configuration/logsChannel.js')
    let user = await client.users.fetch(args[0])

    if (user) {
        message.guild.members.unban(user)

            .then(() => {
                let embed = new MessageEmbed()
                    .setColor(`#008000`)
                    .setAuthor(`${user.username} à été débanni!`)
                    .setFooter(`${message.author.username}`, message.author.displayAvatarURL())
                    .setTimestamp();
                message.delete()
                if (logsChannelId === undefined) {
                    message.channel.send(embed)
                } else {
                    client.channels.cache.get(logsChannelId).send(embed)
                }
            })
            .catch(() => {
                message.channel.send('**L\'utilisateur mentionné n\'existe pas ou n\'est pas banni!**')
            })

    }
}

module.exports.help = MESSAGES.COMMANDS.MODERATION.UNBAN