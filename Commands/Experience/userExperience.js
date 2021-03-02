const { MESSAGES } = require('../../Util/constants')

module.exports.run = async (client, message, args, settings, dbUser) => {
    message.delete();
    if (args.length === 0) {
        return message.reply(`Tu possèdes ${ dbUser.experience } points d'expériences`);
    }else {
        const user = message.mentions.users.first();
        if (user) {
            const dbMentionUser = await client.getUser(user)
            return message.reply(`${ user } possède ${ dbMentionUser.experience } points d'expériences`);
        }else {
            message.channel.send(`L'utilisateur mentionné n'existe pas \`${ settings.prefix }help experience\``);
        }
    }
};

module.exports.help = MESSAGES.COMMANDS.EXPERIENCE.USEREXPERIENCE