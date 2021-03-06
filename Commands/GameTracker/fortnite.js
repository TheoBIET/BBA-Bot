const {
    MESSAGES
} = require('../../Util/constants');
const axios = require('axios');
const {
    MessageEmbed
} = require('discord.js');

module.exports.run = async (client, message, args, settings) => {
    const username = args[0];
    const uri = `https://fortnite-api.com/v1/stats/br/v2?name=${username}`

    axios.get(encodeURI(uri))
        .then(result => {
            const stats = result.data.data
            const Stats = stats.stats.all
            const embed = new MessageEmbed()
                .setAuthor(`Fortnite Tracker | ${stats.account.name} | Niv.${stats.battlePass.level}`, message.author.displayAvatarURL())
                .setThumbnail('https://i1.sndcdn.com/artworks-000381724932-b78z9j-t500x500.jpg')
                .addFields(
                {
                    name: 'Statistiques Globales',
                    value:  `
                    🎮 Jouée(s) : \`${Stats.overall.matches}\`
                    👑 Victoires : \`${Stats.overall.wins}\`
                    🥉 Top 3 : \`${Stats.overall.top3}\`
                    💀 Tué(s) : \`${Stats.overall.kills}\` ~\`${Stats.overall.killsPerMin}\` K/minutes
                    👻 Mort(s) : \`${Stats.overall.deaths}\`
                    🎯 Ratio K/D : \`${Stats.overall.kd}\`
                    📊 Ratio W/D : \`${Stats.overall.winRate}\`
                    🕑 Temps de jeu : \`${Stats.overall.minutesPlayed}\`
                    `,
                    inline: false
                },
                {
                    name: 'Statistiques en Solo',
                    value: `
                    🎮 Jouée(s) : \`${Stats.solo.matches}\`
                    👑 Victoires : \`${Stats.solo.wins}\`
                    💀 Tué(s) : \`${Stats.solo.kills}\`
                    👻 Mort(s) : \`${Stats.solo.deaths}\`
                    🎯 Ratio K/D : \`${Stats.solo.kd}\`
                    📊 Ratio W/D : \`${Stats.solo.winRate}\`
                    `,
                    inline: true
                },
                {name: '\u200b', value: '\u200b', inline: true },
                {
                    name: 'Statistiques en Duo',
                    value: `
                    🎮 Jouée(s) : \`${Stats.duo.matches}\`
                    👑 Victoires : \`${Stats.duo.wins}\`
                    💀 Tué(s) : \`${Stats.duo.kills}\`
                    👻 Mort(s) : \`${Stats.duo.deaths}\`
                    🎯 Ratio K/D : \`${Stats.duo.kd}\`
                    📊 Ratio W/D : \`${Stats.duo.winRate}\`
                    `,
                    inline: true
                },
                {
                    name: 'Statistiques en Trio',
                    value: `
                    🎮 Jouée(s) : \`${Stats.trio.matches}\`
                    👑 Victoires : \`${Stats.trio.wins}\`
                    💀 Tué(s) : \`${Stats.trio.kills}\`
                    👻 Mort(s) : \`${Stats.trio.deaths}\`
                    🎯 Ratio K/D : \`${Stats.trio.kd}\`
                    📊 Ratio W/D : \`${Stats.trio.winRate}\`
                    `,
                    inline: true
                },
                {name: '\u200b', value: '\u200b', inline: true },
                {
                    name: 'Statistiques en Squad',
                    value: `
                    🎮 Jouée(s) : \`${Stats.squad.matches}\`
                    👑 Victoires : \`${Stats.squad.wins}\`
                    💀 Tué(s) : \`${Stats.squad.kills}\`
                    👻 Mort(s) : \`${Stats.squad.deaths}\`
                    🎯 Ratio K/D : \`${Stats.squad.kd}\`
                    📊 Ratio W/D : \`${Stats.squad.winRate}\`
                    `,
                    inline: true
                },

                )
                .setFooter('Codé par ƊɑѵƊɑѵ#5517')
                .setTimestamp()

            message.channel.send(embed)
        })
        .catch(error => {
            console.log(error);
        });
}

module.exports.help = MESSAGES.COMMANDS.GAMETRACKER.FORTNITE;