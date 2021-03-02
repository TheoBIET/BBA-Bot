const { MESSAGES } = require("../../Util/constants");
 
module.exports.run = async (client, message, args, settings) => {
  const getSetting = args[0];
  const newSetting = args.slice(1).join(' ');

  switch(getSetting) {
      case 'prefix' : {
        if (newSetting) {
            await client.updateGuild(message.guild, { prefix: newSetting });
            return message.channel.send(`**Préfix mis à jour :** \`${settings.prefix}\` ➜ \`${newSetting}\``);
        };
        message.channel.send(`**Préfix actuel :** \`${settings.prefix}\``);
        break;
      };
      case 'authChannel' : {
        if (newSetting) {
            await client.updateGuild(message.guild, { authChannel: newSetting });
            return message.channel.send(`**Salon d'authenfication mis à jour :** <#${settings.authChannel}> ➜ <#${newSetting}>`);
        };
        message.channel.send(`**Salon d'authenfication actuel :** <#${settings.authChannel}>`);
        break;
      };
      case 'authImage' : {
        if (newSetting) {
            await client.updateGuild(message.guild, { authImage: newSetting });
            return message.channel.send(`**Image de l'embed de vérification mis à jour :** \`${settings.authImage}\` ➜ \`${newSetting}\``);
        };
        message.channel.send(`**Image de l'embed de vérification actuelle :** \`${settings.authImage}\``);
        break;
      };
      case 'authMessage' : {
        if (newSetting) {
            await client.updateGuild(message.guild, { authMessage: newSetting });
            return message.channel.send(`**Message de l'embed de vérification mis à jour :** \`${settings.authMessage}\` ➜ \`${newSetting}\``);
        };
        message.channel.send(`**Message de l'embed de vérification actuel :** \`${settings.authMessage}\``);
        break;
      };
      case 'authRole' : {
        if (newSetting) {
            await client.updateGuild(message.guild, { authRole: newSetting });
            return message.channel.send(`**Rôle par défaut mis à jour :** <@&${settings.authRole}> ➜ <@&${newSetting}>`);
        };
        message.channel.send(`**Rôle par défaut actuel :** <@&${settings.authRole}>`);
        break;
      };
      case 'logsChannel' : {
        if (newSetting) {
            await client.updateGuild(message.guild, { logsChannel: newSetting });
            return message.channel.send(`**Salon de logs mis à jour :** \`<#${settings.logsChannel}>\` ➜ \`<#${newSetting}>\``);
        };
        message.channel.send(`**Salon de logs actuel :** \`<#${settings.logsChannel}>\``);
        break;
      };
      case 'muteChannel' : {
        if (newSetting) {
            await client.updateGuild(message.guild, { muteChannel: newSetting });
            return message.channel.send(`**Salon MUTE mis à jour :** \`<#${settings.muteChannel}>\` ➜ \`<#${newSetting}>\``);
        };
        message.channel.send(`**Salon MUTE actuel :** \`<#${settings.muteChannel}>\``);
        break;
      };
      case 'welcomeChannel' : {
        if (newSetting) {
            await client.updateGuild(message.guild, { welcomeChannel: newSetting });
            return message.channel.send(`**Salon de bienvenue mis à jour :** \`<#${settings.welcomeChannel}>\` ➜ \`<#${newSetting}>\``);
        };
        message.channel.send(`**Salon de bienvenue actuel :** \`<#${settings.welcomeChannel}>\``);
        break;
      };
  };
};
 
module.exports.help = MESSAGES.COMMANDS.ADMIN.CONFIG;