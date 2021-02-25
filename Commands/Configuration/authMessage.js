const { MESSAGES } = require('../../Util/constants')

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

module.exports.help = MESSAGES.COMMANDS.CONFIGURATION.AUTHMESSAGE