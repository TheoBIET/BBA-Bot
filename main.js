const {
    Client,
    Collection
} = require('discord.js');
const {
    TOKEN
} = require('./config');
const {
    readdirSync
} = require('fs');

const client = new Client();
['commands', 'cooldowns'].forEach(x => client[x] = new Collection());

// catch files from ./Commands
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

// fork files from ./Events
const loadEvents = (dir = './Events/') => {
    let i = 0;
    readdirSync(dir).forEach(dirs => {
        const events = readdirSync(`${dir}/${dirs}/`).filter(files => files.endsWith('.js'));
        //console.log('%cmain.js line:38 events', 'color: #007acc;', events);

        for (const event of events) {
            const evt = require(`${dir}/${dirs}/${event}`);
            const evtName = event.split('.')[0];
            client.on(evtName, evt.bind(null, client));
            // client.on("message", (client, message) => {}))
            //console.log(`Evenement chargé: ${evtName}`);
            i++
        };
    });
    console.log(`${i} événements ont été chargées sans problèmes`);
};

loadCommands();
loadEvents();

client.login(TOKEN);