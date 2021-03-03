const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch')
const { MESSAGES } = require('../../Util/constants');

module.exports.run = async (client, message, args, settings) => {
    const dog = await fetch('https://dog.ceo/api/breeds/image/random')
        .then(res => res.json())
        .then(json => json.message);

    const embed = new MessageEmbed()
        .setAuthor(`${ message.author.username } | Chien`, message.author.displayAvatarURL())
        .setImage(dog)
        .setFooter('Powered by https://dog.ceo/api/')
    
    message.channel.send(embed)
};

module.exports.help = MESSAGES.COMMANDS.RANDOMIMAGE.DOG;