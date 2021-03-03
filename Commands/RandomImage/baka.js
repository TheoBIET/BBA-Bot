const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch')
const { MESSAGES } = require('../../Util/constants');

module.exports.run = async (client, message, args, settings) => {
    const user = message.mentions.users.first();
    const baka = await fetch('https://nekos.life/api/v2/img/baka')
        .then(res => res.json())
        .then(json => json.url);

    if (user) {
        const embed = new MessageEmbed()
        .setAuthor(`${ user.username } 完全な馬鹿!`)
        .setImage(baka)
        .setFooter('Powered by https://nekos.life/api/v2/');
    
        message.channel.send(embed);
    }else {
        message.channel.send('L\'utilisateur mentionné n\'existe pas!')
    }
    
};

module.exports.help = MESSAGES.COMMANDS.RANDOMIMAGE.BAKA;