const {
    MESSAGES
} = require('../../Util/constants');
const {
    MessageEmbed
} = require('discord.js');

module.exports.run = (client, message, args, settings) => {
    //console.log(client);
    const statusEmoji = {
        "dnd" : "⛔",
        "online" : "🔵",
        "idle" : "🌙"
    }
    const embed = new MessageEmbed()
    .setColor('FF0000')
        .setAuthor(`Cliquez ici pour inviter ${ client.user.username }   -   ${ statusEmoji[client.presence.status] }`, client.user.displayAvatarURL())
        .setDescription('Yumeko Jabami **蛇喰 夢子** est un bot open-source créé par ƊɑѵƊɑѵ#5517')
        .addFields(
            {
            name: '📊 | Statistiques du BOT', 
            value: 
            `
                📌\`${ client.guilds.cache.size }\` serveurs
                👫\`${ client.users.cache.size }\` utilisateurs
                🔧\`${ client.commands.size }\` commandes
                🥁\`${ client._eventsCount }\` events
            `, inline: true },
            {
            name: '💻 | Technologies Utilisées', 
            value:
            `
            📗 \`NodeJS 14.16.0\`
            🤖 \`Discord.js 12.5.1\`
            🍃 \`Mongodb 3.6.3\`
            🕐 \`Moment 3.6.3\`
            `, inline: true },
            { name:'📣 | Support', value:`ƊɑѵƊɑѵ#5517`, inline: true },
            { name:'📉 | Mémoire utilisée', value:`${(process.memoryUsage().heapUsed / 1024 / 1024 ).toFixed(2)}Mo`, inline: true },
            { name:'⏳ | Uptime', value:`${Math.floor(client.uptime / 1000 / 60).toString()} minutes`, inline: true },
            { name:'📖 | Github', value:`[Github](https://github.com/TheoBIET/Yumeko)`, inline: true },
        )

    message.channel.send(embed)
};

module.exports.help = MESSAGES.COMMANDS.MISCELLANEOUS.ABOUT;