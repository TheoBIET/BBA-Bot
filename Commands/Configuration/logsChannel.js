const { MESSAGES } = require('../../Util/constants')

module.exports.run = (client, message, args) => {
    message.delete()
    let logsChannelId;
    logsChannelId = args[0]
    client.channels.cache.get(logsChannelId).send(`**Ce salon a été choisi pour recevoir les logs du serveur**`)
    .then(msg => {
        msg.delete({
            timeout: 10000
        })
    })
    exports.logsChannelId = logsChannelId
}

module.exports.help = MESSAGES.COMMANDS.CONFIGURATION.LOGSCHANNEL