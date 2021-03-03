const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch')
const { MESSAGES } = require('../../Util/constants');

module.exports.run = async (client, message, args, settings) => {
    const wallpaper = await fetch('https://nekos.life/api/v2/img/wallpaper')
        .then(res => res.json())
        .then(json => json.url);

        const embed = new MessageEmbed()
        .setAuthor(`${ message.author.username } | Fond d'écran`)
        .setImage(wallpaper)
        .setFooter('Powered by https://nekos.life/api/v2/');
    
        message.channel.send(embed);
    
};

module.exports.help = MESSAGES.COMMANDS.RANDOMIMAGE.WALLPAPER;