const { MESSAGES } = require('../../Util/constants');

const {
    MessageEmbed
} = require("discord.js");

module.exports.run = async (client, message, args, settings) => {
    let logsChannelId = settings.logsChannel;

    await message.delete();

    let embed = new MessageEmbed()
            .setColor(`#FF0000`)
            .setTitle(`${message.author.username} a éteint le bot pour effectuer une mise à jour. Excusez-nous pour la gêne occasionnée.`)
            .setAuthor(`蛇喰 夢子 n'est plus connectée!`)
            .setThumbnail(message.author.displayAvatarURL())
            .setFooter(`${message.author.username}`, message.author.displayAvatarURL())
            .setTimestamp();

    if(logsChannelId === 'none') {
        await message.channel.send(embed);
    }else {
        await client.channels.cache.get(logsChannelId).send(embed);
    }
}

module.exports.help = MESSAGES.COMMANDS.ADMIN.SLEEP;