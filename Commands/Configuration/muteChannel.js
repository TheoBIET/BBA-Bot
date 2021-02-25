const { MESSAGES } = require('../../Util/constants')

module.exports.run = (client, message, args) => {
    let muteChannelId;
    muteChannelId = args[0]
    client.channels.cache.get(muteChannelId).send(`**Ce salon a été choisi pour accueillir les personnes mute du serveur**`)
    .then(msg => {
        msg.delete({
            timeout: 10000
        })
    })
    exports.muteChannelId = muteChannelId
}
module.exports.help = MESSAGES.COMMANDS.CONFIGURATION.MUTECHANNEL