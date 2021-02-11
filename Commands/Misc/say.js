module.exports.run = (client, message, args) => {
    message.delete()
    message.channel.send(args.join(' '))
}

module.exports.help = {
    name : 'say',
    aliases: ['repeat', 'rep'],
    description : 'Répète le message d\'un utilisateur',
    cooldown: 30,
    usage: 'exemple: **?say Hello World**',
    isUserAdmin: false,
    permissions: true,
    args: true,
}