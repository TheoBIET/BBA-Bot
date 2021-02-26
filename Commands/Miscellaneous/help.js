const { MESSAGES } = require('../../Util/constants')
const {
    MessageEmbed
} = require('discord.js');
const {
    readdirSync
} = require('fs');
const categoryList = readdirSync('./Commands');

module.exports.run = (client, message, args, settings) => {
    function categoryName(category){
        switch(category.toLowerCase()) {
            case 'admin' : {
                return '👑 | Administration'
            };
            case 'games' : {
                return '🎲 | Jeux'
            };
            case 'miscellaneous' : {
                return '🎨 | Divers'
            };
            case 'moderation' : {
                return '⚖️ | Modération'
            };
            case 'reactions' : {
                return '🙂 | Réactions Roles'
            };
        };
    };

    if (!args[0]) {
        const embed = new MessageEmbed()
            .setColor('#36393F')
            .setTitle('Liste des commandes')
            .setDescription(`Vous trouverez ci-dessous une liste de toutes les commandes disponibles classées en sous-catégories.\nPour plus d'informations sur une commande, ⤸\ntapez \`${settings.prefix}help <command_name>\``)
            .setFooter('蛇喰 夢子 v0.7 by ƊɑѵƊɑѵ')
            .setThumbnail(client.user.displayAvatarURL())
            .setTimestamp()

        for (category of categoryList) {
            embed.addField(
                `${categoryName(category)}`,
                `${client.commands.filter(cat => cat.help.category === category.toLowerCase()).map(cmd => `\`${cmd.help.name}\``).join(', ')}`
            )
        }

        return message.channel.send(embed)
    } else {
        const command = client.commands.get(args[0]) || client.commands.find(cmd => cmd.help.aliases && cmd.help.aliases.includes(args[0]));

        if(!command) return message.reply('Cette commande n\'existe probablement pas')

        const embed = new MessageEmbed()
            .setTitle(`**__${command.help.name}__**`)
            .addField('**Description de la commande**', `${command.help.description} \n(**Cooldown:** ${command.help.cooldown} secondes)`)
            .addField('**Utilisation**', command.help.usage ? `${settings.prefix}${command.help.name} | ${command.help.usage}` : `${settings.prefix}${command.help.name}`, true)
            .setThumbnail(client.user.displayAvatarURL())

            if (command.help.aliases.length > 1) embed.addField('**Alias**', `${command.help.aliases.join(', ')}`, true)
            return message.channel.send(embed);
    }
}

module.exports.help = MESSAGES.COMMANDS.MISCELLANEOUS.HELP