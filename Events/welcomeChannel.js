module.exports.run = (client, message, args) => {
    let welcomeChannelId;
    welcomeChannelId = args[0]
    client.channels.cache.get(welcomeChannelId).send(`**Ce salon a été choisi pour les annonces de bienvenue**`)
    exports.welcomeChannelId = welcomeChannelId
}
module.exports.help = {
    name : 'setWelcome',
    aliases: ['setupwelcome', 'swelcome', 'msetup'],
    description : 'Enregistre l\ID du Channel souhaité pour les annonces de bienvenue',
    cooldown: 120,
    usage: 'exemple: **?setWelcome 809197368267898931**',
    isUserAdmin: false,
    permissions: true,
    args: true,
}