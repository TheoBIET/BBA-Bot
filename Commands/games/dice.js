module.exports.run = (client, message, args) => {
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
        },{
            name: 'Total',
            value: result,
            inline: true
        },);
        message.delete()
        message.channel.send(embed)
};

module.exports.help = {
    name : 'dice',
    aliases: ['dé', 'de', '421'],
    description : 'Lance 3 dé aléatoirement',
    cooldown: 10,
    usage: '',
    permissions: false,
    args: false,
};