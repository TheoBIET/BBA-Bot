const mongoose = require('mongoose');
const { Guild } = require('../../Models/index');

module.exports = async (client, guild) => {
    const newGuild = {
        guildID: guild.id,
        guildName: guild.name
    };

    const merged = Object.assign({ _id: mongoose.Types.ObjectId() }, newGuild);
    const createGuild = await new Guild(merged)
    createGuild.save().then(g => console.log(`蛇喰 夢子 est arrivée sur un nouveau serveur -> ${g.guildName}`));
};