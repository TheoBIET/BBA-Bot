const { MESSAGES } = require('../../Util/constants')

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

module.exports.help = MESSAGES.COMMANDS.CONFIGURATION.AUTHCHANNEL