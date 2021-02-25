const {
    readdirSync
} = require('fs');
// catch files from ./Commands
const loadCommands = (client, dir = './Commands/') => {
    let i = 0;
    readdirSync(dir).forEach(dirs => {
        const commands = readdirSync(`${dir}/${dirs}/`).filter(files => files.endsWith('.js'));

        for (const file of commands) {
            const getFileName = require(`../${dir}/${dirs}/${file}`);
            client.commands.set(getFileName.help.name, getFileName);            i++;
        };
    });
    console.log(`${i} commandes ont été chargées sans problèmes`);
};

// fork files from ./Events
const loadEvents = (client, dir = './Events/') => {
    let i = 0;
    readdirSync(dir).forEach(dirs => {
        const events = readdirSync(`${dir}/${dirs}/`).filter(files => files.endsWith('.js'));

        for (const event of events) {
            const evt = require(`../${dir}/${dirs}/${event}`);
            const evtName = event.split('.')[0];
            client.on(evtName, evt.bind(null, client));
            client.on("message", (client, message) => {});
            i++
        };
    });
    console.log(`${i} événements ont été chargées sans problèmes`);
};

module.exports = {
    loadCommands,
    loadEvents,
}
