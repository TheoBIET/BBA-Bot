const {
    Client,
    Collection
} = require('discord.js');
const {
    loadCommands,
    loadEvents
} = require('./Util/loader');
const client = new Client();

require('./Util/functions')(client);
['commands', 'cooldowns', 'musicPlayer'].forEach(x => client[x] = new Collection());

client.config = require('./config');
client.mongoose = require('./Util/mongoose');
client.setMaxListeners(15);

loadCommands(client);
loadEvents(client);
client.mongoose.init();

client.login(client.config.TOKEN);
