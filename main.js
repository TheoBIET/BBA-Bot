const { Client, Collection, MessageEmbed } = require('discord.js');
const { TOKEN, PREFIX } = require('./config');
const { readdirSync } = require('fs');

const client = new Client();
['commands', 'cooldowns'].forEach(x => client[x] = new Collection());

// Récupération de tous les fichiers présents dans le répértoire ./commands
const loadCommands = (dir = './Commands/') => {
    let i = 0;
    readdirSync(dir).forEach(dirs => {
        const commands = readdirSync(`${dir}/${dirs}/`).filter(files => files.endsWith('.js'));

        for (const file of commands) {
            const getFileName = require(`${dir}/${dirs}/${file}`);
            client.commands.set(getFileName.help.name, getFileName);
            //console.log(`Commande chargée: ${getFileName.help.name}`);
            i++;
        };
    });
    console.log(`${i} commandes ont été chargées sans problèmes`);
};

loadCommands();

client.on('message', message => {
    const args = message.content.slice(PREFIX.length).split(/ +/);
    const commandName = args.shift().toLowerCase();
    //console.log(args.splice(1).join(' '));
    //const user = message.mentions.users.first();

    // Si les messages ne commencent pas par le préfixe, ou qu'ils ont été envoyés par le BOT, on les ignore
    if (!message.content.startsWith(PREFIX) || message.author.bot) return;

    // Stockage du nom de la commande et de ses alias
    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.help.aliases && cmd.help.aliases.includes(commandName));
    if (!command) return;
    
    //console.log(command);// On vérifie si la personne mentionnée est administrateur, pour empêcher l'éxecution de cette commande
    if (command.help.isUserAdmin && message.mentions.users.first() && message.guild.member(message.mentions.users.first()).hasPermission("ADMINISTRATOR")) {
        return message.delete() && message.reply(`Vous ne pouvez pas utiliser la commande **${command.help.name}** sur un modérateur!`)
    }

    // On vérifie si la personne qui utilise la commande possède les permissions requises pour l'effectuer
    if (command.help.permissions && !message.member.hasPermission("ADMINISTRATOR")) return message.reply('Vous ne pouvez pas utiliser cette commande, utilisez **?help**')

    // Si la commande a besoin d'arguments, mais qu\'aucun n'en est donné, on envoie un message d'aide
    if (command.help.args && !args.length) {
        let embed = new MessageEmbed()
                .setColor(`#ffffff`)
                .setTitle(`Voici comment utiliser cette commande`)
                .setThumbnail(client.user.displayAvatarURL())
                .setDescription(`${message.author} \n ${command.help.usage} \n make by ƊɑѵƊɑѵ#5517`);
        return message.reply(embed);
    };

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

    command.run(client, message, args)

});

client.on('ready', () => { client.user.setUsername('BBA').catch(console.error); console.log(`${client.user.tag} connecté.`); });
client.login(TOKEN);