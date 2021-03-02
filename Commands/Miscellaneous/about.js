const {
    MESSAGES
} = require('../../Util/constants');
const {
    MessageEmbed
} = require('discord.js');

module.exports.run = (client, message, args, settings) => {
    message.channel.send('OK');
};

module.exports.help = MESSAGES.COMMANDS.MISCELLANEOUS.ABOUT;