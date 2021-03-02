const {
    MessageEmbed
} = require('discord.js');
const {
    MESSAGES
} = require('../../Util/constants')
const moment = require('moment');

module.exports.run = (client, message, args, settings) => {
    const Guild = message.guild;
    const user = message.mentions.users.first();

    if (args.length === 0) {
        Guild.members.fetch().then(fetchAll => {

            // Statuts des membres présents sur le serveur
            const offline = fetchAll.filter(m => m.presence.status === 'offline');
            const dnd = fetchAll.filter(m => m.presence.status === 'dnd');
            const online = fetchAll.filter(m => m.presence.status === 'online');
            const idle = fetchAll.filter(m => m.presence.status === 'idle');
            const connected = dnd.size + online.size + idle.size;

            // Emoji du drapeau selon la région du serveur
            const region = {
                "brazil": ":flag_br: Brésil",
                "europe": ":flag_eu: Europe",
                "hongkong": ":flag_hk: Hong Kong",
                "japan": ":flag_jp: Japon",
                "india": ":flag_in: Inde",
                "russia": ":flag_ru: Russia",
                "singapore": ":flag_sg: SIN",
                "southafrica": ":flag_za:  South Africa",
                "sydney": ":flag_au: Sydney",
                "us-central": ":flag_us: U.S. Central",
                "us-east": ":flag_us: U.S. East",
                "us-south": ":flag_us: U.S. South",
                "us-west": ":flag_us: U.S. West",
            };

            //console.log(Guild);

            const embed = new MessageEmbed()
                .setTitle(`${ Guild.name } | ${region[Guild.region]} | Créé le ${moment(Guild.createdAt).locale("fr").format('Do MMMM YYYY')}`)
                .setAuthor('Statistiques du serveur ' + Guild.name, Guild.iconURL())
                .setThumbnail(Guild.iconURL())
                .addFields({
                        name: `Statistiques diverses du serveur`,
                        value: `
                        👑 \<@${ Guild.ownerID }>
                        👫 \`${ Guild.memberCount }\` membres!
                        🔗 \`${ Guild.roles.cache.size }\` rôles!
                        📝 \`${ Guild.channels.cache.size }\` channels!
                        😛 \`${ Guild.emojis.cache.size }\` emojis!
                        `,
                        inline: true
                    },

                    {
                        name: `\`${ connected }\` membres connectées dont`,
                        value: `
                        🔊 \`${ Guild.voiceStates.cache.size }\` en vocal!
                        🔵 \`${ online.size }\` connectés!
                        ⛔ \`${ dnd.size }\` en ne pas déranger!
                        🌙 \`${ idle.size }\` AFK!
                        ⚫ \`${ offline.size }\` hors-ligne!
                        `,
                        inline: true
                    },
                )
                .setFooter('Codé par ƊɑѵƊɑѵ#5517')
                .setTimestamp()
            message.channel.send(embed)
        });
    } else if (user) {
        const User = Guild.members.cache.find(usr => usr.id === user.id);

        const status = {
            "online": "🔵 Connecté",
            "dnd": "⛔ Ne pas déranger",
            "idle": "🌙 AFK",
            "offline": "⚫ Déconnecté"
        }

        const embed = new MessageEmbed()        
        .setAuthor(`Statistiques de ${ User.user.username }`, User.user.displayAvatarURL())
        .setThumbnail(user.displayAvatarURL())
        .setFooter('Codé par ƊɑѵƊɑѵ#5517')
        .setTimestamp()
        .addFields({
                name: `A rejoint ${ Guild.name } le`,
                value: `${moment(User.joinedTimestamp).locale("fr").format('Do MMMM YYYY')}`,
                inline: true
            }, {
                name: `A rejoint Discord le`,
                value: `${moment(user.createdAt).locale("fr").format('Do MMMM YYYY')}`,
                inline: true
            }, {
                name: `Statut de connexion`,
                value: `${status[User.presence.status]}`,
                inline: false
            }, {
                name: `Salon du dernier message`,
                value: `${ (User.user.lastMessageChannelID) == null ? 'Aucun message envoyé' : `<#${User.user.lastMessageChannelID}>` }`,
                inline: false
            }, {
                name: `Rôles possédés`,
                value: `${ User._roles.map(role => "<@&" + role + ">" ).join(' ') }`,
                inline: false
            },
        )
        message.channel.send(embed)
} else {
    message.channel.send(`L\'utilisateur mentionné n\'existe pas \`${settings.prefix}help stats\``)
}
}

module.exports.help = MESSAGES.COMMANDS.MISCELLANEOUS.STATS;