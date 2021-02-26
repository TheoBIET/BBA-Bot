const {
    MESSAGES
} = require('../../Util/constants')
const {
    MessageEmbed
} = require('discord.js');

module.exports.run = async (client, message, args, settings) => {
    message.delete()
    // Catch all server settings
    let authChannelId = settings.authChannel
    let authImage = settings.authImage
    let authMessage = settings.authMessage
    let authRoleId = settings.authRole

    let embed = new MessageEmbed()
    if (authChannelId === 'none') {
        return message.channel.send('**Vous devez choisir le le salon qui recevra le message de bienvenue et accueillera vos membres, tapez\n `?config authChannel <id_du_salon>` et réessayer.**')
    }
    if (authRoleId === 'none') {
        return message.channel.send('**Vous devez choisir le rôle par défaut qui permettra d\'accéder au serveur lors de son arrivée, veuillez entrer l\'id du rôle correspondant avec la commande\n `?config authRole <id_du_role>` et réessayer.**')
    }

    if (authMessage === 'none') {
        return client.channels.cache.get(authChannelId).send('**Entrez un message de bienvenue pour votre serveur avec :**\n `?config authMessage <message>`')
    } else {
        embed.setDescription(`**${authMessage}** \n\n ||@everyone||`)
    }

    client.channels.cache.get(authChannelId).send('**Vous pouvez choisir définir votre image avec :**\n `?config authImage <image_link>`')
    embed.setImage(authImage)

    if ((authChannelId && authMessage !== 'none')) {
        client.channels.cache.get(authChannelId).send(embed).then(async msg => {
            await msg.react('✅');
            await msg.react('❌');
        })
    }
}

module.exports.help = MESSAGES.COMMANDS.REACTIONS.AUTH