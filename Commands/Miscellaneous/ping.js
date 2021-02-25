const { MESSAGES } = require('../../Util/constants')

module.exports.run = (client, message, args) => {
    let ping = message.createdTimestamp - message.createdTimestamp;
    message.channel.send(`Pong! **${ping}ms**. La Latence de l'API est d'environ **${Math.round(client.ws.ping)}ms**`);
}

module.exports.help = MESSAGES.COMMANDS.MISCELLANEOUS.PING