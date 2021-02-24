module.exports.run = (client, message, args) => {
    let authImage;
    authImage = args[0]
    message.channel.send('Pour voir les modifications, tapez `?authmessage`')
    exports.authImage = authImage
}

module.exports.help = {
    name: 'authimage',
    aliases: ['authimage'],
    category: 'configuration',
    description: 'Définis une image différente pour le message de bienvenue',
    cooldown: 120,
    usage: 'exemple: **?authimage https://cdn.discordapp.com/attachments/650256233542189056/813809378327003176/hello.gif**',
    isUserAdmin: false,
    permissions: true,
    args: true,
}