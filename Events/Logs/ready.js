module.exports = (client) => {
    // Mise à jour rapides des informations du BOT
    //client.user.setUsername('蛇喰 夢子').catch(console.error); 
    console.log(`${client.user.tag} connecté.`);
    //client.user.setAvatar('https://cdn.discordapp.com/attachments/644569508337549324/809504010649862155/1016983c9d7552e6.png');
    client.user.setPresence({ 
        activity: { 
            name : 'ƊɑѵƊɑѵ me coder', 
            type : 'WATCHING'
        },
        status: 'dnd'
    });
}