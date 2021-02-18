const {
    MessageEmbed
} = require("discord.js");
const {
    logsSend
} = require('../Configuration/logsChannel.js');

module.exports.run = async (client, message, args) => {
    let {
        logsChannelId
    } = require('../Configuration/logsChannel.js')
    let user = message.mentions.users.first()

    if (isNaN(args[1]) || (args[1] < 1 || args[1] > 100)) {
        message.channel.send('Il faut spécifier un ***nombre*** entre 1 et 100')
    } else {
        let userMessage;
        const messages = await message.channel.messages.fetch({
            limit: 100,
            before: message.id
        }).then(messages => {
            userMessage = messages.filter(a => a.author.id === user.id).array();
            messages.length = Math.min(args[1], userMessage.length);
        })

        if (userMessage.length === 0 || !user) return message.reply('Aucun messages à supprimer sur cet utilisateur, ou l\'utilisateur mentionné n\'existe pas')

        if (userMessage.length === 1) await userMessage[0].delete();
        else await message.channel.bulkDelete(userMessage).catch(() => message.channel.send(`Une erreur s\'est produite avec la commande ${purge}, veuillez réesayer`))

        let embed = new MessageEmbed()
            .setAuthor(`${userMessage.length} messages de ${user.username} ont été supprimé(s) dans ${message.channel.name}!`)
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

module.exports.help = {
    name: 'prune',
    aliases: ['prune', 'uclear'],
    description: 'Supprime un nombre spécifié de messages sur un utilisateur précis dans le salon où la commande est réalisée',
    cooldown: 5,
    usage: 'exemple: **?prune <amount> <user_id>**',
    isUserAdmin: true,
    permissions: true,
    args: true,
}