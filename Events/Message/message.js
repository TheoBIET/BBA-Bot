const {
    Collection,
    MessageEmbed
} = require('discord.js');

module.exports = async (client, message) => {
    const settings = await client.getGuild(message.guild);
    const dbUser = await client.getUser(message.member)
    if (message.channel.type === 'dm') return client.emit('directMessage', message)

    if (message.author.bot) return;

    if (!dbUser) await client.createUser({
        guildID: message.member.guild.id,
        guildName: message.member.guild.name,
        userID: message.member.user.id,
        username: message.member.user.tag,
    });

    const expCd = Math.floor(Math.random() * 19) + 1;
    const expToAdd = Math.floor(Math.random() * 25) + 10;

    if (expCd >= 7 && expCd <= 10) {
        await client.addExp(client, message.member, expToAdd);
    }

    const userLevel = Math.floor(0.15 * Math.sqrt(dbUser.experience));
    if (dbUser.level < userLevel){
        message.reply(`Félicitations! Tu viens de monter **niveau ${ userLevel }** avec Yumeko!`)
        client.updateUser(message.member, { level: userLevel })
    };

    if (!message.content.startsWith(settings.prefix)) return;

    const args = message.content.slice(settings.prefix.length).split(/ +/);
    //console.log(args.splice(1).join(' '));
    const commandName = args.shift().toLowerCase();
    const user = message.mentions.users.first();

    // Stockage du nom de la commande et de ses alias
    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.help.aliases && cmd.help.aliases.includes(commandName));
    if (!command) return;

    // On vérifie si la personne qui utilise la commande possède les permissions requises pour l'effectuer
    if (command.help.permissions && !message.member.hasPermission("ADMINISTRATOR")) return message.reply('Vous ne pouvez pas utiliser cette commande, utilisez **?help**')

    // Si la commande a besoin d'arguments, mais qu\'aucun n'en est donné, on envoie un message d'aide
    let helpEmbed = new MessageEmbed()
            .setColor(`#ffffff`)
            .setTitle(`Voici comment utiliser cette commande`)
            .setThumbnail(client.user.displayAvatarURL())
            .setDescription(`${message.author} \n ${command.help.usage} \n make by ƊɑѵƊɑѵ#5517`);    
    if (command.help.args && !args.length) {
        return message.reply(helpEmbed);
    };

    // On vérifie si la personne qui utilise la commande a mentionné un utilisateur
    if (command.help.isUserAdmin && !user) {
        return message.reply('Vous devez **mentionner** un utilisateur')
    } else if (command.name == 'mute' && command.help.args && args.length <= 2) {
        return message.reply(helpEmbed);
    }

    //console.log(command);
    // On vérifie si la personne mentionnée est administrateur, pour empêcher l'éxecution de cette commande
    if (command.help.isUserAdmin && message.mentions.users.first() && message.guild.member(user).hasPermission("ADMINISTRATOR")) {
        return message.delete() && message.reply(`Vous ne pouvez pas utiliser la commande **${command.help.name}** sur un modérateur!`)
    }

    // Création du cooldown sur certaines commandes
    if (!client.cooldowns.has(command.help.name)) {
        client.cooldowns.set(command.help.name, new Collection());
    }

    // Récupération des données de temps
    const timeNow = Date.now();
    const tStamps = client.cooldowns.get(command.help.name);
    const cdAmount = (command.help.cooldown || 0) * 1000;
    //console.log(client.commands);
    //console.log(client.cooldowns);

    if (tStamps.has(message.author.id)) {
        const cdExpirationTime = tStamps.get(message.author.id) + cdAmount;

        // Si l'utilisateur tente d'utiliser la commande alors que le cooldown n'est pas terminé, alors on l'informe du temps restant
        if (timeNow < cdExpirationTime) {
            timeLeft = (cdExpirationTime - timeNow) / 1000
            return message.reply(`Merci d'attendre ${timeLeft.toFixed(0)} seconde(s) avant de réutiliser la commande **${command.help.name}**`);
        };
    };

    // Suppression de l'utilisateur dans la collection une fois le délai expiré
    tStamps.set(message.author.id, timeNow)
    setTimeout(() => tStamps.delete(message.author.id), cdAmount)

    command.run(client, message, args, settings, dbUser)

}