const {
    MessageEmbed
} = require('discord.js');

module.exports.run = async (client, message, args) => {
    message.delete()
    // Catch all server settings
    let {
        authChannelId
    } = require('../Configuration/authChannel.js');
    let {
        authImage
    } = require('../Configuration/authImage.js');
    let {
        authMessage
    } = require('../Configuration/authMessage.js');
    let {
        authRoleId
    } = require('../Configuration/authRole.js');

    let defaultGif = 'https://cdn.discordapp.com/attachments/650256233542189056/813809378327003176/hello.gif';
    let clientGif = authImage;
    console.log(clientGif);

    console.log(authMessage);
    let embed = new MessageEmbed()
    if (authChannelId === undefined) {
        return message.channel.send('**Vous devez choisir le le salon qui recevra le message de bienvenue et accueillera vos membres, tapez\n `?authchannel <id_du_salon>` et réessayer.**')
    }
    if (authRoleId === undefined) {
        return message.channel.send('**Vous devez choisir le rôle par défaut qui permettra d\'accéder au serveur lors de son arrivée, veuillez entrer l\'id du rôle correspondant avec la commande\n `?authrole <id_du_role>` et réessayer.**')
    }

    if (authMessage === undefined) {
        return client.channels.cache.get(authChannelId).send('**Entrez un message de bienvenue pour votre serveur avec :**\n `?authmessage <message>`')
    } else {
        embed.setDescription(`**${authMessage}** \n\n ||@everyone||`)
    }

    if (clientGif === undefined) {
        client.channels.cache.get(authChannelId).send('**Vous pouvez choisir définir votre image avec :**\n `?authimage <image_link>`')
        embed.setImage(defaultGif)
    } else {
        embed.setImage(clientGif)
    }

    if ((authChannelId && authMessage !== undefined) && (clientGif || defaultGif !== undefined)) {
        client.channels.cache.get(authChannelId).send(embed).then(async msg => {
            await msg.react('✅');
            await msg.react('❌');
        })
    }
}

module.exports.help = {
    name: 'auth',
    aliases: ['auth', 'auth'],
    category: 'reactions',
    description: 'Envoie un message de vérification avec une réaction sur le serveur',
    cooldown: 10,
    usage: 'exemple: **?authmessage **',
    isUserAdmin: false,
    permissions: true,
    args: false,
}