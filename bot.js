'use strict';

const Bot = require('node-telegram-bot-api-upgrades');

const validator = require('validator');
const TinyURL = require('tinyurl');
const unshort = require('unshort');
const symbols = require('log-symbols');

const bot = new Bot(process.env.TOKEN, {
    polling: true
});

const prefixProtocol = url => !/^(?:f|ht)tps?\:\/\//.test(url) ? ('http://' + url) : url;

bot.onText(/^\/start$/, msg => {
    bot.sendMessage(msg.chat.id, 'Just send me a url and I\'ll "shorten" or "expand" it for you!');
});

bot.onText(/^\/shorten (.+)$/, (msg, match) => {
    let url = match[1];

    if (validator.isURL(url)) {
        TinyURL.shorten(prefixProtocol(url), r => {
            bot.sendMessage(msg.from.id, r);
            console.log(symbols.success, url, '-->', r);
        });
    } else {
        bot.sendMessage(msg.chat.id, 'Sorry, that\'s not a vaid URL :(');
        console.log(symbols.error, url);
    }
});

bot.onText(/^\/expand (.+)$/, (msg, match) => {
    let shortUrl = match[1];

    unshort(shortUrl, (err, url) => {
        if (err) {
            console.log(symbols.error, err);
            bot.sendMessage(msg.from.id, 'Sorry, that URL could not be expanded :(');
        } else {
            if (url) {
                bot.sendMessage(msg.from.id, url);
                console.log(symbols.success, shortUrl, '-->', url);
            } else {
                console.log(symbols.error, shortUrl);
                bot.sendMessage(msg.from.id, 'Sorry, that URL could not be expanded :(');
            }
        }
    });
});

console.log(symbols.info, 'bot server started...');
