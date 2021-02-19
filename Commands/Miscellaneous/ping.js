module.exports.run = (client, message, args) => {
    let ping = message.createdTimestamp - message.createdTimestamp;
    message.channel.send(`Pong! **${ping}ms**. La Latence de l'API est d'environ **${Math.round(client.ws.ping)}ms**`);
}

module.exports.help = {
    name: 'ping',
    aliases: ['ping'],
    category: 'miscellaneous',
    description: 'Renvoie le ping de la personne executant la commande',
    cooldown: 30,
    usage: '',
    isUserAdmin: false,
    permissions: false,
    args: false,
}