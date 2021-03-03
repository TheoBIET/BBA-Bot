const { MessageEmbed } = require('discord.js');
const { MESSAGES } = require('../../Util/constants');

module.exports.run = async (client, message) => {
    const embed = new MessageEmbed()
        .setTitle(`Top 15 des utilisateurs sur ${ message.guild.name }`)
        .setThumbnail(message.guild.iconURL() || 'https://images-ext-1.discordapp.net/external/o5mOXgrNmTzjM-cs1jwY5P3tzHLSuBhZcdxQZRm2qvg/https/cdn.discordapp.com/avatars/808594643465666561/a9ecd06025325e4090e6abe77e944336.webp')
        .setColor('a41f14')
        .setDescription(`Vous trouverez ci-dessous les personnes possédant le plus d\'expérience sur ${ message.guild.name }`)
        .setTimestamp()
        .setFooter('Codé par ƊɑѵƊɑѵ#5517');

    await client.getUsers(message.guild).then(p => {
        const index = {
            "1":"🥇", "2":"🥈", "3":"🥉",
            "4":"4", "5":"5", "6":"6", "7":"7", "8":"8", "9":"9", "10" : "10", "11" : "11", "12" : "12", "13" : "13", "14" : "14", "15" : "15",}
        let i = 0;
        p.sort((a, b) => (a.experience < b.experience) ? 1 : -1).splice(0, 15).forEach(e => {
            i++;
            embed.addField(`${ index[i] } - ${e.username}`, `Niveau ${ e.level } (${ e.experience } exp)`, (i <= 3 ? false : true))
        });
    });

    message.channel.send(embed);
};

module.exports.help = MESSAGES.COMMANDS.EXPERIENCE.LEADERBOARD;