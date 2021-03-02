const {
    MessageEmbed
} = require('discord.js');
const {
    MESSAGES
} = require('../../Util/constants')

module.exports.run = (client, message, args, settings) => {
    const user = message.mentions.users.first();
    if (args.length === 0) {
        const embed = new MessageEmbed()
                .setFooter(`${ message.author.username }`)
                .setImage(message.author.displayAvatarURL())
            message.channel.send(embed)
    }
    if (user){
        const embed = new MessageEmbed()
                .setFooter(`${ user.username }`)
                .setImage(user.displayAvatarURL())
            message.channel.send(embed)
    }
}

module.exports.help = MESSAGES.COMMANDS.MISCELLANEOUS.AVATAR;