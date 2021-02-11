module.exports.run = (client, message, args) => {
    let muteChannelId;
    muteChannelId = args[0]
    client.channels.cache.get(muteChannelId).send(`**Ce salon a été choisi pour accueillir les personnes mute du serveur**`)
    exports.muteChannelId = muteChannelId
}
module.exports.help = {
    name : 'setmute',
    aliases: ['setupmute', 'smute', 'msetup'],
    description : 'Enregistre l\ID du Channel souhaité pour les personnes mute',
    cooldown: 120,
    usage: 'exemple: **?setMute 809197368267898931**',
    isUserAdmin: false,
    permissions: true,
    args: true,
}