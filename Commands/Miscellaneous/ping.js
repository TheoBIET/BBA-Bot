const { MESSAGES } = require('../../Util/constants');

module.exports.run = async (client, message, args, settings) => {
    const msg = await message.channel.send(`Pong!`);
    msg.edit(`Pong! **${msg.createdTimestamp - message.createdTimestamp}ms**\nLatence de l'API **~${Math.round(client.ws.ping)}ms**`)
}

module.exports.help = MESSAGES.COMMANDS.MISCELLANEOUS.PING;