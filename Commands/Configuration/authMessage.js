module.exports.run = (client, message, args) => {
    let authMessage;
    authMessage = args.join(' ')
    message.channel.send('**Pour voir les modifications, tapez `?auth`**')
    .then(msg => {
        msg.delete({
            timeout: 10000
        })
    })
    exports.authMessage = authMessage
}

module.exports.help = {
    name: 'authmessage',
    aliases: ['authmessage'],
    category: 'configuration',
    description: 'Définis une image différente pour le message de bienvenue',
    cooldown: 120,
    usage: 'exemple: **?authmessage Bienvenue sur.... Veuillez réagir ci-dessous pour accéder au reste du serveur**',
    isUserAdmin: false,
    permissions: true,
    args: true,
}