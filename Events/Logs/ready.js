const config = require('../../config');

module.exports = (client) => {
   
    // Mise à jour rapides des informations du BOT
    console.log(`Prêt à modérer les ${ client.users.cache.size } utilisateurs de ${ client.user.tag } sur les ${ client.guilds.cache.size } serveurs!`);
    let activities = ['?help', `${ client.users.cache.size } utilisateurs`, `${ client.guilds.cache.size } serveurs`, `ƊɑѵƊɑѵ me coder`], i=0;
    setInterval(() => client.user.setPresence({ 
        activity: { 
            name : `${activities[i++ % activities.length]}`, 
            type : 'WATCHING'
        },
        status: 'dnd'
    }), 3000);

};