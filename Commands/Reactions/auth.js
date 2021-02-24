const {
    MessageEmbed
} = require('discord.js');

module.exports.run = async (client, message, args) => {
    // Catch all server settings
    let { logsChannelId } = require('../Configuration/logsChannel.js');
    let { authImage } = require('../Configuration/authImage.js');
    let { authMessage } = require('../Configuration/authMessage.js');
    let { authRoleId } = require('../Configuration/authRole.js');

    let defaultGif = 'https://cdn.discordapp.com/attachments/650256233542189056/813809378327003176/hello.gif';
    let clientGif = authImage;
    console.log(clientGif);

    console.log(authMessage);
    let embed = new MessageEmbed()
        if (authRoleId === undefined) {return message.channel.send('**Vous devez choisir le rôle par défaut qui permettra d\'accéder au serveur lors de son arrivée, veuillez entrer l\'id du rôle correspondant avec la commande\n `?authrole <id_du_role>` et réessayer.**')}

        if (authMessage === undefined) {
            message.delete()
            message.channel.send('**Entrez un message de bienvenue pour votre serveur avec :**\n `?authmessage <message>`')
        }else {
            embed.setDescription(authMessage)
        }

        if (clientGif === undefined){
            message.channel.send('**Vous pouvez choisir définir votre image avec :**\n `?authimage <image_link>`')
            embed.setImage(defaultGif)
        }else {
            embed.setImage(clientGif)
        }

    const messages = await message.channel.messages.fetch({
        limit: Math.min(0, 100),
        before: message.id
    })

    await message.channel.bulkDelete(messages).catch(() => message.channel.send(`Une erreur s\'est produite, veuillez réesayer`))

    message.channel.send(embed)
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