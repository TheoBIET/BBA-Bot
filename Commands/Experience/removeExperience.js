const {
    MESSAGES
} = require('../../Util/constants')

module.exports.run = async (client, message, args, settings) => {
    message.delete();
    const user = message.guild.member(message.mentions.users.first());
    const dbMentionUser = await client.getUser(user);
    if (user) {
        const expToRemove = parseInt(args[1]);
        if (isNaN(expToRemove)) return message.reply('Il faut entrer un nombre!');
        if (expToRemove > 50) {
            message.channel.send('Vous ne pouvez pas retirer plus de 50 points d\'expérience!')
                .then(msg => {
                    msg.delete({
                        timeout: 5000
                    });
                });
        } else if (dbMentionUser.experience < expToRemove){
            message.channel.send('L\'utilisateur mentionné ne possède pas assez de points d\'expérience pour lui en retirer!')
                .then(msg => {
                    msg.delete({
                        timeout: 5000
                    });
                });
        } else {
            client.removeExp(client, user, expToRemove);
            message.channel.send(`Vous avez retiré ${ expToRemove } points d'expérience à ${ user }`)
                .then(msg => {
                    msg.delete({
                        timeout: 5000
                    });
                });
        };
    }else {
        message.channel.send(`Il faut mentionner un utilisateur! \`${ settings.prefix }help removeexperience\``)
            .then(msg => {
                msg.delete({
                    timeout: 5000
                });
            });
    };
};

module.exports.help = MESSAGES.COMMANDS.EXPERIENCE.REMOVEEXPERIENCE;