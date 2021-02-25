const { MESSAGES } = require('../../Util/constants')
const {
    MessageEmbed
} = require("discord.js");

module.exports.run = async (client, message, args) => {
    let {
        logsChannelId
    } = require('../Configuration/logsChannel.js')

    if (isNaN(args[0]) || (args[0] < 1 || args[0] > 100)) {
        message.channel.send('Il faut spécifier un ***nombre*** entre 1 et 100')
    } else {
        const messages = await message.channel.messages.fetch({
            limit: Math.min(args[0], 100),
            before: message.id
        })

        await message.channel.bulkDelete(messages).catch(() => message.channel.send(`Une erreur s\'est produite avec la commande ${purge}, veuillez réesayer`))

        let embed = new MessageEmbed()
            .setAuthor(`${args[0]} messages ont été supprimé(s) dans ${message.channel.name}!`)
            .setFooter(`${message.author.username}`, message.author.displayAvatarURL())
            .setTimestamp();
        message.delete()
        if (logsChannelId === undefined) {
            message.channel.send(embed)
                .then(msg => {
                    msg.delete({
                        timeout: 10000
                    })
                })
        } else {
            return client.channels.cache.get(logsChannelId).send(embed)
        }
    }

}

module.exports.help = MESSAGES.COMMANDS.MODERATION.PURGE