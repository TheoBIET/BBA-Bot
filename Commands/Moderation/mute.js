const ms = require('ms');
const {
    MessageEmbed
} = require("discord.js");

module.exports.run = async (client, message, args) => {
    let {
        logsChannelId
    } = require('../Configuration/logsChannel.js');
    let {
        authRoleId
    } = require('../Configuration/authRole.js');
    const user = message.guild.member(message.mentions.users.first());
    const embedUser = user.user
    let muteRole = message.guild.roles.cache.find(r => r.name === 'muted');
    let muteTime = (args[1])
    let reason = args[1] == muteTime ? args.splice(2).join(' ') || 'Aucune raison spécifié' : args.splice(1).join(' ') || 'Aucune raison spécifié'

    if (!muteRole) {
        muteRole = await message.guild.roles.create({
            data: {
                name: 'muted',
                color: 'black',
                permissions: []
            }
        });

        message.guild.channels.cache.forEach(async (channel, id) => {
            await channel.updateOverwrite(muteRole, {
                VIEW_CHANNEL: false,
                SEND_MESSAGES: false,
                ADD_REACTIONS: false,
                CONNECT: false
            });
        });
    };

    if (authRoleId == undefined) {
        return message.reply('**Le serveur n\'a pas correctement été paramétré pour la commande `mute`**.\nVeuillez définir l\'id du rôle principal avec la commande `setauth`')
    } else {
        await user.roles.remove(authRoleId).catch((e) => console.log(e.message))
    }
    await user.roles.add(muteRole).catch((e) => console.log(e.message))

    if (user) {
        let embed = new MessageEmbed()
            .setColor(`#050505`)
            .setTitle(reason)
            .setAuthor(`${embedUser.username} est mute pour ${ms(ms(muteTime))}!`)
            .setThumbnail(embedUser.displayAvatarURL())
            .setFooter(`${message.author.username}`, message.author.displayAvatarURL())
            .setTimestamp();
        message.delete();
        if (logsChannelId === undefined) {
            message.channel.send(embed)
        } else {
            client.channels.cache.get(logsChannelId).send(embed)
        }
    }

    setTimeout(() => {
        console.log('removed');
        user.roles.remove(muteRole.id)
        if (user) {
            console.log('User ' + user)
            console.log('Role ' + muteRole);
            let embed = new MessageEmbed()
                .setColor(`#050505`)
                .setTitle(reason)
                .setAuthor(`${embedUser.username} est démute!`)
                .setThumbnail(embedUser.displayAvatarURL())
                .setFooter(`${message.author.username}`, message.author.displayAvatarURL())
                .setTimestamp();
            if (logsChannelId === undefined) {
                message.channel.send(embed)
            } else {
                client.channels.cache.get(logsChannelId).send(embed)
            }
        } else {
            message.channel.send('L\'utilisateur mentionné n\'existe pas, veuillez réessayer');
        };
    }, ms(muteTime));

};

module.exports.help = {
    name: 'mute',
    aliases: ['mute'],
    category: 'moderation',
    description: 'Mute un utilisateur mentionné',
    cooldown: 1,
    usage: 'exemple: **?mute @user <time> <reason>**',
    isUserAdmin: true,
    permissions: true,
    args: true,
}