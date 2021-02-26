const { MESSAGES } = require('../../Util/constants')

module.exports.run = (client, message, args, settings) => {
    const {
        MessageEmbed
    } = require("discord.js");

    let result = 0
    const randomDice = () => {
        let randomDice = Math.floor(Math.random() * 6);
        if (randomDice == '0') randomDice++;
        result += randomDice;
        return randomDice;
    };
    const embed = new MessageEmbed()
        .setColor(`#ffffff`)
        .setTitle(`Tirage des dés`)
        .setThumbnail('')
        .addFields({
            name: 'Dé 1',
            value: randomDice(),
            inline: true
        }, {
            name: 'Dé 2',
            value: randomDice(),
            inline: true
        }, {
            name: 'Dé 3',
            value: randomDice(),
            inline: true
        }, {
            name: 'Total',
            value: result,
            inline: true
        }, );
    message.delete()
    message.channel.send(embed)
};

module.exports.help = MESSAGES.COMMANDS.GAMES.DICE