const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch')
const { MESSAGES } = require('../../Util/constants');

module.exports.run = async (client, message, args, settings) => {
    const anime = await fetch('https://www.reddit.com/user/emdix/m/animemes/top/.json?sort=top&t=day&limit=500')
        .then(res => res.json())
        .then(json => json.data.children);

    const data = anime[Math.floor(Math.random() * anime.length)].data;

    const embed = new MessageEmbed()
        .setAuthor(`${ data.title } | ${ data.author }`, message.author.displayAvatarURL())
        .setImage(data.url)
        .setFooter('Powered by /ranimemes', 'https://external-preview.redd.it/iDdntscPf-nfWKqzHRGFmhVxZm4hZgaKe5oyFws-yzA.png?auto=webp&s=38648ef0dc2c3fce76d5e1d8639234d8da0152b2')
        .setColor(data.author_flair_background_color)

    message.channel.send(embed)
};

module.exports.help = MESSAGES.COMMANDS.RANDOMIMAGE.ANIME;