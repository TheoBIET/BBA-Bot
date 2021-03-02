const {
    MESSAGES
} = require('../../Util/constants')

module.exports.run = (client, message, args) => {
    message.delete();
    const user = message.guild.member(message.mentions.users.first());
    if (user) {
        const expToAdd = parseInt(args[1]);
        if (isNaN(expToAdd)) return message.reply('Il faut entrer un nombre!');
        if (expToAdd > 50) {
            message.channel.send('Vous ne pouvez pas ajouter plus de 50 points d\'expérience!')
            .then(msg => {
                msg.delete({
                    timeout: 5000
                });
            });
        } else {
            client.addExp(client, user, expToAdd);
            message.channel.send(`Vous avez ajouté ${ expToAdd } points d'expérience à ${ user }`)
                .then(msg => {
                    msg.delete({
                        timeout: 5000
                    });
                });
        };

    } else {
        message.channel.send(`Il faut mentionner un utilisateur! \`${ settings.prefix }help removeexperience\``)
            .then(msg => {
                msg.delete({
                    timeout: 5000
                });
            });
    };
};

module.exports.help = MESSAGES.COMMANDS.EXPERIENCE.ADDEXPERIENCE;