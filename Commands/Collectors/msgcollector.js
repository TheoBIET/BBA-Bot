const {
    MESSAGES
} = require('../../Util/constants');

// Introduction to collector for future quizz?
module.exports.run = (client, message, args, settings) => {
    const filter = msg => msg.content.includes(args[0]);
    /* const collector = message.channel.createMessageCollector(filter, { 
        time: 10000,}); */

    message.channel.send(`Tapez ${args[0]}! (Ceci n\'est pas encore une commande utile, elle sert de test pour de futures mises à jour!)`)
        .then(() => {
            message.channel.awaitMessages(filter, {
                    time: 10000
                })
                .then(collected => {
                    message.channel.send(`${collected.size} messages collectés.`)
                });
        });

    /*  collector.on('end', collected => {
         message.channel.send(`${collected.size - 1} messages collectés.`);
     }) */
};

module.exports.help = MESSAGES.COMMANDS.COLLECTORS.MSGCOLLECTOR;