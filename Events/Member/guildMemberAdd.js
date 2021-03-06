const {
    MessageEmbed
} = require('discord.js');
let moment = require('moment');

module.exports = async (client, member) => {
    const settings = await client.getGuild(member.guild);
    let welcomeChannelId = settings.welcomeChannel
    let logsChannelId = settings.logsChannel
    let counter

    // On compte le nombre de membre, selon le nombre on utilise son abréviation numérale
    function Counter(memberCount) {
        memberCount = memberCount.toString()
        let ADJ = "ème"
        let Num = memberCount.charAt(memberCount.length - 1)
        if (memberCount == "1") {
            ADJ = "ère"
        } else if (Num != "0") {
            ADJ = "ème"
        } else if (Num == "0") {
            ADJ = "ième"
        };
        counter = memberCount + ADJ
    };

    console.log(welcomeChannelId);
    Counter(member.guild.memberCount)
    const embed = new MessageEmbed()
        .setColor('32CD32')
        .setThumbnail(member.user.displayAvatarURL())
        .setTitle(`Bienvenue sur ${member.guild.name}!`)
        .setDescription(`${member} tu es la ${counter} personne à nous rejoindre`)
        .addFields({
            name: 'Compte créé le',
            value: `${moment(member.user.createdAt).locale("fr").format('Do MMMM YYYY')}`,
            inline: true
        } )
        .setTimestamp()
    if (welcomeChannelId !== 'none') {
        client.channels.cache.get(welcomeChannelId).send(embed)
    } else {
        if (logsChannelId !== 'none') {
            client.channels.cache.get(logsChannelId).send(embed)
        };
    };

    await client.createUser({
        guildID: member.guild.id,
        guildName: member.guild.name,
        userID: member.user.id,
        username: member.user.tag,
    });
    
};