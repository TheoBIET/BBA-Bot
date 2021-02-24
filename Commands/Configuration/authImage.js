module.exports.run = (client, message, args) => {
    message.delete()
    let authImage;
    authImage = args[0]
    message.channel.send('**Pour voir les modifications, tapez `?auth`**')
    .then(msg => {
        msg.delete({
            timeout: 10000
        })
    })
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