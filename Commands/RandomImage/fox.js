const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch')
const { MESSAGES } = require('../../Util/constants');

module.exports.run = async (client, message, args, settings) => {
    const fox = await fetch('https://randomfox.ca/floof/')
        .then(res => res.json())
        .then(json => json.image);

    const embed = new MessageEmbed()
        .setAuthor(`${ message.author.username } | Renard`, message.author.displayAvatarURL())
        .setImage(fox)
        .setFooter('Powered by https://randomfox.ca/')
    
    message.channel.send(embed)
};

module.exports.help = MESSAGES.COMMANDS.RANDOMIMAGE.FOX;