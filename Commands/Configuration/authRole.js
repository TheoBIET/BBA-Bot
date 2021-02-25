const { MESSAGES } = require('../../Util/constants')

module.exports.run = (client, message, args) => {
    message.delete()
    let {
        logsChannelId
    } = require('./logsChannel.js')
    let authRoleId;
    authRoleId = args[0]
    if (logsChannelId === undefined) {
        message.channel.send(`**Le rôle par défaut a été défini sur <@&${authRoleId}>, vous pouvez désormais définir un message de bienvenue sur votre serveur avec \`?authmessage <message>\`**`)
        .then(msg => {
            msg.delete({
                timeout: 10000
            })
        })
    } else {
        client.channels.cache.get(logsChannelId).send(`**Le rôle par défaut a été défini sur <@&${authRoleId}>**`)
        .then(msg => {
            msg.delete({
                timeout: 10000
            })
        })
    }
    console.log(authRoleId);
    exports.authRoleId = authRoleId
}
module.exports.help = MESSAGES.COMMANDS.CONFIGURATION.AUTHROLE