const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch')
const { MESSAGES } = require('../../Util/constants');

module.exports.run = async (client, message, args, settings) => {
    const cat = await fetch('http://aws.random.cat/meow')
        .then(res => res.json())
        .then(json => json.file);

    const embed = new MessageEmbed()
        .setAuthor(`${ message.author.username } | Chat`, message.author.displayAvatarURL())
        .setImage(cat)
        .setFooter('Powered by http://aws.random.cat/')
    
    message.channel.send(embed)
};

module.exports.help = MESSAGES.COMMANDS.RANDOMIMAGE.CAT;