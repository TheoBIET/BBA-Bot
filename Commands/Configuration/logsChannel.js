module.exports.run = (client, message, args) => {
    let logsChannelId;
    logsChannelId = args[0]
    client.channels.cache.get(logsChannelId).send(`**Ce salon a été choisi pour recevoir les logs du serveur**`)
    exports.logsChannelId = logsChannelId
}

module.exports.help = {
    name: 'setlogs',
    aliases: ['setuplogs', 'slogs', 'lsetup'],
    category: 'configuration',
    description: 'Enregistre l\ID du Channel souhaité pour les Logs',
    cooldown: 120,
    usage: 'exemple: **?logs 809197368267898931**',
    isUserAdmin: false,
    permissions: true,
    args: true,
}