const {
    MessageEmbed
} = require("discord.js");

module.exports.run = (client, message, args) => {
    let { logsChannelId } = require('./logsChannel.js')
    // Récupération et stockage de l'utilisateur mentionné dans la variable 'user'
    const user = message.mentions.users.first();
    // Récupération des arguments présents après la mention
    let reason = args.splice(1).join(' ') || 'Aucune raison spécifiée';

    // Si l'utlisateur mentionné existe alors on envoie un embed avec les informations concernées
    if (user) {
        let embed = new MessageEmbed()
            .setColor(`#FFA500`)
            .setTitle(`${reason}`)
            .setAuthor(`${user.username} à été kick!`)
            .setThumbnail(user.displayAvatarURL())
            .setFooter(`${message.author.username}`, message.author.displayAvatarURL())
            .setTimestamp();
        message.delete()
        if(logsChannelId === undefined) {
            message.channel.send(embed)
        }else {
            client.channels.cache.get(logsChannelId).send(embed)
        }
        message.guild.member(user).kick(reason)
    }else {
        message.channel.send('L\'utilisateur mentionné n\'existe pas, veuillez réessayer');
    }
}

module.exports.help = {
    name: 'kick',
    aliases: ['kick'],
    description: 'Kick un utilisateur mentionné',
    cooldown: 1,
    usage: 'exemple: **?kick @BBA**',
    isUserAdmin: true,
    permissions: true,
    args: true,
}