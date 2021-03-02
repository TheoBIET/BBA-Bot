const { MESSAGES } = require('../../Util/constants')

// Introduction to collector for future ticket system?
module.exports.run = (client, message, args, settings) => {
    const filter = reaction => reaction.emoji.name === '👍'
    /*const collector = message.createReactionCollector(filter, { time : 10000 });*/

    message.delete()
    message.channel.send('Réagissez à ce message! (Ceci n\'est pas encore une commande utile, elle sert de test pour de futures mises à jour!)')
    .then(msg => msg.react('👍')
            .then(() => {
                msg.awaitReactions(filter, { time : 10000 })
                .then(collected => message.channel.send(`${collected.size} réactions collectés!`))
        })
    )

    /* collector.on('end', collected => {
        message.channel.send(`${collected.size} réactions collectées!`);
    }); */
};

module.exports.help = MESSAGES.COMMANDS.COLLECTORS.REACTCOLLECTOR;