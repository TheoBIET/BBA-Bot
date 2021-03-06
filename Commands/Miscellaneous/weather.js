const { MESSAGES } = require('../../Util/constants');
const axios = require('axios');
const { MessageEmbed } = require('discord.js');

module.exports.run = async (client, message, args, settings) => {
    const city = args.join('');
    const query = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=aa94b202f4972975426803f9441617ee`

    axios.get(query)
        .then(result => {
            const data = result.data

            const toCelsius = (temp) => { return (parseInt(temp) - 273.15).toFixed(2) }

            const embed = new MessageEmbed()
                .setAuthor(`Weather | Température actuelle pour ${ data.name }`)
                .setTitle(`Il fait actuellement ${toCelsius(data.main.temp)}°c à ${ data.name }`)
                .setThumbnail(`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`)
                .addField(`Informations diverses`, 
                `
                ⛅ Temp. Min/Max **${ toCelsius(data.main.temp_min) }°c - ${ toCelsius(data.main.temp_max) }°c**
                🌈 Ressentie **${ toCelsius(data.main.feels_like) }°c**
                🗻 Pression **${ toCelsius(data.main.pressure) }hPa**
                💦 Humidité **${ toCelsius(data.main.humidity) }%**
                💨 Vitesse du vent **${ data.wind.speed }km/H**
                `)
            message.channel.send(embed)
        })
        .catch(error => {
            console.log(error);
            message.channel.send('Une erreur s\'est produite, la ville n\'existe probablement pas ou celle-ci est mal orthographiée')
        });
}

module.exports.help = MESSAGES.COMMANDS.MISCELLANEOUS.WEATHER;