const {
    MESSAGES
} = require('../../Util/constants');
const {
    MessageEmbed
} = require('discord.js');
const translate = require('@vitalets/google-translate-api');

const googleTranslate = 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Google_Translate_logo.svg/512px-Google_Translate_logo.svg.png'
const langs = {
    'auto': 'Automatic',
    'af': 'Afrikaans 🇿🇦',
    'sq': 'Albania 🇦🇱',
    'am': 'Amharic 🇪🇹',
    'ar': 'Arabic 🇸🇦',
    'hy': 'Armenia 🇦🇲',
    'az': 'Azerbaijan 🇦🇿',
    'eu': 'Basque 🇫🇷',
    'be': 'Belarus 🇧🇾',
    'bn': 'Bengali 🇮🇳',
    'bs': 'Bosnia & Herzegovina 🇧🇦',
    'bg': 'Bulgaria 🇧🇬',
    'ca': 'Catalan 🇪🇸',
    'ceb': 'Cebuano 🇵🇭',
    'ny': 'Chichewa 🇨🇫',
    'zh-CN': 'Chinese (Simplified) 🇨🇳',
    'zh-TW': 'Chinese (Traditional) 🇨🇳',
    'co': 'Corsican 🇫🇷',
    'hr': 'Croatian 🇭🇷',
    'cs': 'Czech 🇨🇿',
    'da': 'Danish 🇩🇰',
    'nl': 'Dutch 🇳🇱',
    'en': 'English 🇬🇧',
    'eo': 'Esperanto 🎌',
    'et': 'Estonian 🇪🇪',
    'tl': 'Filipino 🇵🇭',
    'fi': 'Finnish 🇫🇮',
    'fr': 'French 🇫🇷',
    'fy': 'Frisian 🇳🇱',
    'gl': 'Galician 🇪🇸',
    'ka': 'Georgian 🇬🇪',
    'de': 'German 🇩🇪',
    'el': 'Greek 🇬🇷',
    'gu': 'Gujarati 🇮🇳',
    'ht': 'Haitian Creole 🇭🇹',
    'ha': 'Hausa',
    'haw': 'Hawaiian',
    'he': 'Hebrew',
    'iw': 'Hebrew',
    'hi': 'Hindi',
    'hmn': 'Hmong',
    'hu': 'Hungarian',
    'is': 'Icelandic 🇦🇨',
    'ig': 'Igbo',
    'id': 'Indonesian 🇮🇩',
    'ga': 'Irish 🇮🇪',
    'it': 'Italian 🇮🇹',
    'ja': 'Japanese 🇯🇵',
    'jw': 'Javanese',
    'kn': 'Kannada 🇨🇦',
    'kk': 'Kazakh',
    'km': 'Khmer',
    'ko': 'Korean 🇰🇷',
    'ku': 'Kurdish (Kurmanji)',
    'ky': 'Kyrgyz',
    'lo': 'Lao',
    'la': 'Latin',
    'lv': 'Latvian',
    'lt': 'Lithuanian',
    'lb': 'Luxembourgish',
    'mk': 'Macedonian 🇲🇰',
    'mg': 'Malagasy',
    'ms': 'Malay',
    'ml': 'Malayalam',
    'mt': 'Maltese 🇲🇹',
    'mi': 'Maori',
    'mr': 'Marathi',
    'mn': 'Mongolian 🇲🇳',
    'my': 'Myanmar (Burmese)',
    'ne': 'Nepali 🇳🇵',
    'no': 'Norwegian',
    'ps': 'Pashto',
    'fa': 'Persian',
    'pl': 'Polish',
    'pt': 'Portuguese 🇵🇹',
    'pa': 'Punjabi',
    'ro': 'Romanian 🇷🇴',
    'ru': 'Russian 🇷🇺',
    'sm': 'Samoan',
    'gd': 'Scots Gaelic',
    'sr': 'Serbian 🇷🇸',
    'st': 'Sesotho',
    'sn': 'Shona',
    'sd': 'Sindhi',
    'si': 'Sinhala',
    'sk': 'Slovak 🇸🇰',
    'sl': 'Slovenian 🇸🇮',
    'so': 'Somali 🇸🇴',
    'es': 'Spanish 🇪🇸',
    'su': 'Sundanese',
    'sw': 'Swahili',
    'sv': 'Swedish 🇸🇪',
    'tg': 'Tajik',
    'ta': 'Tamil',
    'te': 'Telugu',
    'th': 'Thai 🇹🇭',
    'tr': 'Turkish 🇹🇷',
    'uk': 'Ukrainian',
    'ur': 'Urdu',
    'uz': 'Uzbek',
    'vi': 'Vietnamese 🇻🇳 ',
    'cy': 'Welsh',
    'xh': 'Xhosa',
    'yi': 'Yiddish',
    'yo': 'Yoruba',
    'zu': 'Zulu'
};

module.exports.run = (client, message, args, settings) => {
    let toLang = args[0];
    let textToTranslate = String(args.splice(1).join(' '))

    if (textToTranslate !== '') {
        translate(textToTranslate, {
            to: toLang
        }).then(res => {
            const embed = new MessageEmbed()
                .setTitle(`Listes des commandes disponibles`)
                .setURL('https://pastebin.com/wUyjLwx6')
                .setAuthor(`Traduction | ${langs[res.from.language.iso]} vers ${langs[toLang]}`, googleTranslate)
                .setDescription(`__**${langs[res.from.language.iso]}**__ → ${textToTranslate}\n\n__**${langs[toLang]}**__ → ${res.text}`)
                .setFooter('Codé par ƊɑѵƊɑѵ#5517')
                .setTimestamp()
            message.channel.send(embed);
        }).catch(err => {
            console.error(err);
            message.channel.send(`La traduction a échouée!`)
        });
    } else {
        message.channel.send('Vous devez entrez un message pour lancer la traduction!')
    }
}

module.exports.help = MESSAGES.COMMANDS.MISCELLANEOUS.TRANSLATE;