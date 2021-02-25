const { MESSAGES } = require('../../Util/constants')

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

module.exports.help = MESSAGES.COMMANDS.CONFIGURATION.AUTHIMAGE