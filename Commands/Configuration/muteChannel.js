module.exports.run = (client, message, args) => {
    let muteChannelId;
    muteChannelId = args[0]
    client.channels.cache.get(muteChannelId).send(`**Ce salon a été choisi pour accueillir les personnes mute du serveur**`)
    exports.muteChannelId = muteChannelId
}
module.exports.help = {
    name : 'setmute',
    aliases: ['setupmute', 'smute', 'msetup'],
    category: 'configuration',
    description : 'Enregistre l\ID du Channel souhaité pour les personnes mute, assurez vous que le role `muted` se trouve au dessus des rôles que vous souhaitez rendre muet, pour le créer faîtes ?mute une première fois.**',
    cooldown: 120,
    usage: 'exemple: **?setMute 809197368267898931**',
    isUserAdmin: false,
    permissions: true,
    args: true,
}