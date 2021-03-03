const { MessageEmbed } = require('discord.js');
const { MESSAGES } = require('../../Util/constants');

module.exports.run = (client, message, args, settings) => {
    const replies = ['Oui', 'Non', 'Probablement', 'Je ne sais pas', 'Probablement pas'];
    const question = args.join(' ');
    const reponse = Math.floor(Math.random() * replies.length);

    message.channel.send(replies[reponse]);
};

module.exports.help = MESSAGES.COMMANDS.GAMES.EIGHTBALL;