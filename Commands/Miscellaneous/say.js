const { MESSAGES } = require('../../Util/constants')

module.exports.run = (client, message, args) => {
    message.delete()
    message.channel.send(args.join(' '))
}

module.exports.help = MESSAGES.COMMANDS.MISCELLANEOUS.SAY