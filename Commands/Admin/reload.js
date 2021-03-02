const { MESSAGES } = require('../../Util/constants');

const {
    MessageEmbed
} = require("discord.js");

module.exports.run = async (client, message, args, settings) => {
    let logsChannelId = settings.logsChannel

    await message.delete();

    let embed = new MessageEmbed()
            .setColor(`#FFA500`)
            .setTitle(`${message.author.username} a redemarré le bot, il reviendra sous peu`)
            .setAuthor(`蛇喰 夢子 redémarre!`)
            .setThumbnail(message.author.displayAvatarURL())
            .setFooter(`${message.author.username}`, message.author.displayAvatarURL())
            .setTimestamp();

    if(logsChannelId === 'none') {
        await message.channel.send(embed)
    }else {
        await client.channels.cache.get(logsChannelId).send(embed)
    }

    process.exit();
}

module.exports.help = MESSAGES.COMMANDS.ADMIN.RELOAD