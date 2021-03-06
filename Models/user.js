const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    guildID: String,
    guildName: String,
    userID: String,
    username: String,
    fortnitePlatform: {
        'type': String,
        'default': 'none'
    },
    fortniteUsername: {
        'type': String,
        'default': 'none'
    },
    codPlatform: {
        'type': String,
        'default': 'none'
    },
    codUsername: {
        'type': String,
        'default': 'none'
    },
    riotId: {
        'type': String,
        'default': 'none'
    },
    experience: {
        'type': Number,
        'default': 0
    },
    level: {
        'type': Number,
        'default': 0
    },
});

module.exports = mongoose.model("User", userSchema)