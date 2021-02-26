const mongoose = require('mongoose');
const { DEFAULTSETTINGS: defaults } = require('../config');

const guildSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    guildID: String,
    guildName: String,
    prefix: {
        'type': String,
        'default': defaults.prefix
    },
    authChannel: {
        'type': String,
        'default': defaults.authChannel
    },
    authImage: {
        'type': String,
        'default': defaults.authImage
    },
    authMessage: {
        'type': String,
        'default': defaults.authMessage
    },
    authRole: {
        'type': String,
        'default': defaults.authRole
    },
    logsChannel: {
        'type': String,
        'default': defaults.logsChannel
    },
    muteChannel: {
        'type': String,
        'default': defaults.muteChannel
    },
    welcomeChannel: {
        'type': String,
        'default': defaults.welcomeChannel
    },
    welcomeMessage: {
        'type': String,
        'default': defaults.welcomeMessage
    },
});

module.exports = mongoose.model("Guild", guildSchema)