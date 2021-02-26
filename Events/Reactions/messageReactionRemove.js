const {
    MessageEmbed
} = require('discord.js');

module.exports = async (client, messageReaction, user) => {
    const settings = await client.getGuild(messageReaction.message.guild);
    let logsChannelId = settings.logsChannel
    let authChannelId = settings.authChannel
    let authRoleId = settings.authRole
    const message = messageReaction.message;
    const member = message.guild.members.cache.get(user.id);
    const emoji = messageReaction.emoji.name
    const channel = message.guild.channels.cache.find(c => c.id === authChannelId)

    if (member.user.bot) return;
    if ((authRoleId || authChannelId) === 'none') return;

    if (['✅', '❌'].includes(emoji) && message.channel.id === channel.id) {
        switch (emoji) {
            case '✅':
                member.roles.remove(authRoleId).catch(console.error)
                if (logsChannelId !== 'none') {
                    let embed = new MessageEmbed()
                        .setColor(`#096a09`)
                        .setTitle(`Vérification rétirée!`)
                        .setAuthor(`${user.username} vient de perdre sa vérification!`)
                        .setThumbnail(user.displayAvatarURL())
                        .setTimestamp();
                    client.channels.cache.get(logsChannelId).send(embed)
                }
                break;
        }
    }

}