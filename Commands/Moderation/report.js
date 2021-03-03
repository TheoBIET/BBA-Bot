const {
    MESSAGES
} = require('../../Util/constants');
const {
    MessageEmbed
} = require('discord.js');

const isFirstCharNumeric = c => /\d/.test(c);

module.exports.run = async (client, message, args, settings) => {
    let logsChannelId = settings.logsChannel;
    const user = message.mentions.users.first();
    let raison = args[1];

    if (!raison) return message.channel.send('Vous devez indiquer une raison, et dans le cas ou sera serait utile, vous pouvez également indiquer l\'ID du message avant la raison.').then(msg => msg.delete({
        timeout: 5000
    }));

    const embed = new MessageEmbed()
        .setColor(`#008000`)
        .setAuthor(message.author.tag, message.author.displayAvatarURL())
        .setThumbnail(user.displayAvatarURL())
        .addFields(
            { name: 'Utilisateur', value: user.username, inline: true},
            { name: 'Lien du message', value: isFirstCharNumeric(raison.charAt(0)) ? `[Cliquez-ici!](https://discordapp.com/channels/${message.guild.id}/${message.channel.id}/${args[1]})` : 'Non précisé', inline:true},
            { name: 'Raison', value: isFirstCharNumeric(raison.charAt(0)) ? args.slice(args.indexOf(args[2])).join(' ') : args.slice(args.indexOf(args[1])).join(' '), inline:false}
        )
        .setTimestamp();
    message.delete();
    if (logsChannelId === 'none') {
        message.channel.send(embed)
    } else {
        client.channels.cache.get(logsChannelId).send(embed)
    };
}

module.exports.help = MESSAGES.COMMANDS.MODERATION.REPORT;