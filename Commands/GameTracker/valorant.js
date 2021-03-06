const {
    MESSAGES
} = require('../../Util/constants');
const axios = require('axios');
const {
    MessageEmbed
} = require('discord.js');

module.exports.run = async (client, message, args, settings) => {
    const uri = ''
    const content = `https://eu.api.riotgames.com/val/content/v1/contents?api_key=RGAPI-eb732a34-a0c2-4e87-a277-8bbe9fa4f6df`
    const username = args[0]

    let informations = {
        "act" : "",
        "player" : ""
    }

    axios.get(content)
        .then(result => {
            const Acts = result.data.acts
            let i = 0;
            let actStrings = [];
            while (i <= Acts.length - 2){
                i++
                if (Acts[i].isActive){
                    actStrings.push(Acts[i].localizedNames['fr-FR'])
                    embedInfo.act = actStrings.join(' - ')
                };
            };
        })
        .catch(error => {
            console.log(error);
        });

    message.channel.send('Le Tracker Valorant arrivera très bientôt si Riot accepte de me donner une clé ^^')

    
    // Valorant Tracker - Nom du Joueur - Saison
}

module.exports.help = MESSAGES.COMMANDS.GAMETRACKER.VALORANT;