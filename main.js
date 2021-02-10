const Discord = require("discord.js");
const config = require("./config.json");
const client = new Discord.Client();
const moment = require('moment')

// Configuration au lancement du BOT
client.on('ready', async () => {
    console.log(`Connecté en tant que ${client.user.tag}!`);
    client.user.setActivity('ƊɑѵƊɑѵ me coder', { type: 'WATCHING' }).catch(console.error);
    //client.user.setAvatar('./assets/avatar.jpg').catch(console.error)
    //client.user.setUsername('BBA Security').catch(console.error)
});

let idChannel = '';
let active = false;

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
let DavDav = "632611245295534083"
let Bombay = "514264303822700545"
// On effectue une première commande afin de choisir le salon qui recevra les embed
client.on('message', message => {
    // On vérifie si l'auteur du message d'initialisation est autorisé à effectuer le changements
    if (message.content === "ChooseThisChannel" && (message.author.id == Bombay || message.author.id == DavDav)){
        // S'il est autorisé, on récupère l'id et le nom du channel en question et on le stocke dans une variable
        channelName = message.channel.name
        idChannel = message.channel.id
        message.delete()
        active = true;
        // On envoie un message qui valide le changement
        message.channel.send('Le Salon des arrivées à bien été mis à jour, lorsqu\'un nouveau membre rejoindra le serveur, un message sera envoyé dans **' + channelName + ": " + idChannel + '**')
        return idChannel, active;
    // Si l'auteur du message n'est pas autorisé à effectuer la commande 'ChooseThisChannel'
      }else if (message.content === "ChooseThisChannel" && (message.author.id != Bombay || message.author.id != DavDav)) {
        // On envoie un message pour avertir l'utilisateur qu'il n'est pas capable de faire cela et on le rédirige vers les bonnes personnes
        message.channel.send('Vous n\'avez pas la permission de faire cela, contactez <@514264303822700545> ou <@632611245295534083> si vous souhaitez effectuez des changements')
        return;
    }
})
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Envoi d'un embed à l'arrivée d'un nouveau membre
client.on('guildMemberAdd', member => {
    // On stocke l'id du salon choisi dans channel
    let channel = client.channels.cache.find(channel => channel.id === idChannel)
    // On récupère le lien vers la photo de profil du nouvel arrivant
    let counter;
    if (active) {
        Counter(member.guild.memberCount)
        let embed = new Discord.MessageEmbed()
        .setColor('379b38')
        .setThumbnail(member.user.displayAvatarURL())
        .setTitle(`Bienvenue sur BBA Corporation!`)
        .setDescription(`${member} tu es la ${counter} personne à nous rejoindre`)
        .addFields(
            { name: 'Invité par', value: 'In coding', inline: true },
            { name: 'Compte créé le', value: `${moment(member.user.createdAt).locale("fr").format('Do MMMM YYYY')}`, inline: true },
        )
        .setTimestamp()
        channel.send(embed)
        // On compte le nombre de membre, selon le nombre on utilise son abréviation numérale
        function Counter(memberCount){
            memberCount = memberCount.toString()
            let ADJ = "ème"
            let Num = memberCount.charAt(memberCount.length - 1)
            if(memberCount == "1"){
                ADJ = "ère"
            }else if (Num != "0"){
                ADJ = "ème"
            }else if (Num == "0"){
                ADJ = "ième"
            }
            counter = memberCount + ADJ
        }
    // Si la configuration n'est pas terminée, on envoie un message dans le salon choisi par la fonction pour informer l'utilisateur que le BOT n'est pas correctement configuré
    }else {
        const guild = member.guild
        let channel = guild.channels.cache.find(channel => channel.type === 'text' && channel.permissionsFor(guild.me).has('SEND_MESSAGES'));
        channel.send(`${member} a rejoint le serveur, mais le BOT n'est pas configuré comme prévu, écrivez "ChooseThisChannel" dans le salon où vous souhaitez recevoir vos messages de bienvenue`);
    }

});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
client.login(config.TOKEN)