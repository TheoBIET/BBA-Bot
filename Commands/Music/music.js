const {
    MessageEmbed
} = require('discord.js');
const {
    MESSAGES
} = require('../../Util/constants');
const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');

const queue = new Map();

let song = {};
let currentInfo = {};

module.exports.run = async (client, message, args, settings) => {
    const voice_channel = message.member.voice.channel;
    if (!voice_channel) return message.channel.send(`Vous devez être dans un salon vocal pour utiliser la commande \`${settings.prefix}music\`!`);
    const permissions = voice_channel.permissionsFor(message.client.user);
    if (!permissions.has('CONNECT')) return message.channel.send('Vous ne possédez pas les permissions requises!');
    if (!permissions.has('SPEAK')) return message.channel.send('Vous ne possédez pas les permissions requises!');

    const server_queue = queue.get(message.guild.id);

    if (ytdl.validateURL(args[0])) {
        const song_info = await ytdl.getInfo(args[0]);
        song = {
            title: song_info.videoDetails.title,
            url: song_info.videoDetails.video_url,
            description: song_info.videoDetails.description,
            thumbnail: song_info.videoDetails.thumbnail,
            duration: song_info.videoDetails.duration,
            videoLink: song_info.videoDetails.url,
            author: song_info.videoDetails.author.name,
            authorLink: song_info.videoDetails.author.url,
            views: song_info.videoDetails.views,
            ts: song_info.videoDetails.ago,
        }
    } 
    else if(args[0] === 'skip') {
        return skip_song(message, server_queue)
    }
    else if(args[0] === 'leave') {
        return stop_song(message, server_queue)
    }
    else if(args[0] === 'clear') {
        return clear_queue(message, server_queue)
    }
    else {
        const video_finder = async (query) => {
            const video_result = await ytSearch(query);
            return (video_result.videos.length > 1) ? video_result.videos[0] : null;
        }

        const video = await video_finder(args.join(' '));
        if (video) {
            song = {
                title: video.title,
                url: video.url,
                description: video.description,
                thumbnail: video.thumbnail,
                duration: video.duration,
                videoLink: video.url,
                author: video.author.name,
                authorLink: video.author.url,
                views: video.views,
                ts: video.ago,
            }
        } else {
            message.channel.send('La vidéo demandée n\'a pas été trouvée!');
        }
    }

    if (!server_queue) {

        const queue_constructor = {
            voice_channel: voice_channel,
            text_channel: message.channel,
            connection: null,
            songs: []
        }

        queue.set(message.guild.id, queue_constructor);
        queue_constructor.songs.push(song);

        isConnected = true

        try {
            const connection = await voice_channel.join();
            queue_constructor.connection = connection;
            video_player(message.guild, queue_constructor.songs[0], song);
        } catch (err) {
            queue.delete(message.guild.id);
            message.channel.send('Erreur de connexion au salon vocal!');
            throw err;
        }
    } else {
        server_queue.songs.push(song);
        const embed = new MessageEmbed()
            .setTitle(`${song.title}`)
            .setAuthor(`👍 Ajouté à la file d\'attente ${song.title}`)
            .setDescription(song.description)
            .addFields({
                name: 'songrmations',
                value: `
            🕑 \`${song.ts}\`
            👀 \`${song.views}\` vues
            ⏳ \`${song.duration.timestamp}\` min

            `,
                inline: true
            }, {
                name: 'Liens | Crédits',
                value: `
            🔱 [${song.author}](${song.authorLink})
            🌐 [Youtube](${song.url})

            `,
                inline: true
            }, )
            .setFooter('Codé par ƊɑѵƊɑѵ#5517')
            .setThumbnail(song.thumbnail)
            .setTimestamp()
        currentInfo = {
            title: song.title,
            url: song.video_url,
            description: song.description,
            thumbnail: song.thumbnail,
            duration: song.duration,
            videoLink: song.url,
            author: song.author.name,
            authorLink: song.author.url,
            views: song.views,
            ts: song.ago,
        }
        return message.channel.send(embed);
    }
};

const video_player = async (guild, song, info) => {
    const song_queue = queue.get(guild.id);
    
    if (!song) {
        song_queue.voice_channel.leave();
        queue.delete(guild.id);
        return;
    }
    const stream = ytdl(song.url, {
        filter: 'audioonly'
    });
    song_queue.connection.play(stream, {
            seek: 0,
            volume: 0.5
        })
        .on('finish', () => {
            song_queue.songs.shift();
            video_player(guild, song_queue.songs[0]);
        });
    if(info.title){
        const embed = new MessageEmbed()
            .setTitle(`${info.title}`)
            .setAuthor(`🎶 En cours de lecture dans ${song_queue.voice_channel.name}`)
            .setDescription(info.description)
            .addFields({
                name: 'Informations',
                value: `
                🕑 \`${info.ts}\`
                👀 \`${info.views}\` vues
                ⏳ \`${info.duration.timestamp}\` min

                `,
                inline: true
            }, {
                name: 'Liens | Crédits',
                value: `
                🔱 [${info.author}](${info.authorLink})
                🌐 [Youtube](${info.url})

                `,
                inline: true
            }, )
            .setFooter('Codé par ƊɑѵƊɑѵ#5517')
            .setThumbnail(info.thumbnail)
            .setTimestamp();
        await song_queue.text_channel.send(embed);
    };
};

const skip_song = (message, server_queue) => {
    if (!message.member.voice.channel) return message.channel.send(`Vous devez être dans un salon vocal pour utiliser la commande \`${settings.prefix}play skip\`!`);
    if (!server_queue) {
        return message.channel.send(`Il n'y a pas de musiques dans la file d'attente 😔`);
    }
    if (message.guild.voiceConnection){return message.channel.send('Le bot n\'est pas connecté')}
    else if (server_queue.songs != []){
        message.channel.send('🎶 Musique suivante').then(msg => msg.delete({timeout:2000}))
        server_queue.connection.dispatcher.end();
    };
};

const stop_song = (message, server_queue) => {
    if (!message.member.voice.channel) return message.channel.send(`Vous devez être dans un salon vocal pour utiliser la commande \`${settings.prefix}play quit\`!`);
    if (message.guild.voiceConnection){return message.channel.send('Le bot n\'est pas connecté')}
    if (server_queue.songs) {server_queue.songs = [];server_queue.connection.dispatcher.end();}
};

const clear_queue = (message, server_queue) => {
    if (!message.member.voice.channel) return message.channel.send(`Vous devez être dans un salon vocal pour utiliser la commande \`${settings.prefix}play quit\`!`);
    if (message.guild.voiceConnection){return message.channel.send('Le bot n\'est pas connecté')}
    if (server_queue.songs){
        message.channel.send('La file d\'attente est désormais vide!')
        server_queue.songs = []
    };
};

module.exports.help = MESSAGES.COMMANDS.MUSIC.MUSIC;