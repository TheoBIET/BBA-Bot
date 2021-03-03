const { MessageEmbed } = require('discord.js');
const { MESSAGES } = require('../../Util/constants');

module.exports.run = (client, message, args, settings) => {
    const embed = new MessageEmbed();

    const poll = args.join(' ');

    const responsesEmoji = ["1️⃣","2️⃣","3️⃣","4️⃣","5️⃣","6️⃣","7️⃣","8️⃣","9️⃣","🔟","🔒"]
    const responses = []

    RetunAllResponses() = () => {
        responses.forEach(responses => {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                
        });
    }

    if (args === 'stop') return

    if (args[0] === 'add') {
        reponses.push()
    }

    embed.setAuthor(`Sondage créé par ${ message.author.username }`, message.author.displayAvatarURL());
    embed.setTimestamp();

    embed.setTitle(`📊 | ${ poll }`)

    message.channel.send(embed)
        .then(msg => {
            message.channel.send(`Vous pouvez ajouter des réponses avec \`${ settings.prefix }poll add <reponse>\``).then(msg => msg.delete({timeout:5000}));
            msg.delete({ timeout: 5000});
        });
}

module.exports.help = MESSAGES.COMMANDS.MISCELLANEOUS.POLL;