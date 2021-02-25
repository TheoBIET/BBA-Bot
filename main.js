const {
    Client,
    Collection
} = require('discord.js');
const {
    TOKEN
} = require('./config');
const {
    loadCommands,
    loadEvents
} = require('./Util/loader');

const client = new Client();
['commands', 'cooldowns'].forEach(x => client[x] = new Collection());

client.mongoose = require('./Util/mongoose');
client.setMaxListeners(15);

loadCommands(client);
loadEvents(client);
client.mongoose.init();

client.login(TOKEN);