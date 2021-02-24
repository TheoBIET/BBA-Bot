module.exports.run = (client, message, args) => {
    message.delete()
    let authChannelId;
    authChannelId = args[0]
    client.channels.cache.get(authChannelId).send(`**Ce salon a été choisi pour recevoir le message de bienvenue du serveur**`)
                .then(msg => {
                    msg.delete({
                        timeout: 10000
                    })
                })
    exports.authChannelId = authChannelId
}

module.exports.help = {
    name: 'authchannel',
    aliases: ['authchannel'],
    category: 'configuration',
    description: 'Définis le salon qui recevra le message de vérification pour entrer dans le serveur',
    cooldown: 120,
    usage: 'exemple: **?authchannel <id_du_salon>**',
    isUserAdmin: false,
    permissions: true,
    args: true,
}