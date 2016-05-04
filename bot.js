'use strict';

const Bot = require('node-telegram-bot-api');

const validator = require('validator');
const TinyURL = require('tinyurl');
const symbols = require('log-symbols');

const bot = new Bot(process.env.TOKEN, {
    polling: true
});

const prefixProtocol = url => !/^(?:f|ht)tps?\:\/\//.test(url) ? 'http://' + url : url;

bot.onText(/^\/start$/, msg => {
    bot.sendMessage(msg.chat.id, 'Just send me a url and I\'ll shorten it!');
});

bot.onText(/^\/shorten (.+)$/, (msg, match) => {
    let url = match[1];
    if (validator.isURL(url)) {
        TinyURL.shorten(prefixProtocol(url), r => {
            bot.sendMessage(msg.chat.id, r);
            console.log(symbols.success, url, '-->', r);
        });
    } else {
        bot.sendMessage(msg.chat.id, 'Sorry, that\'s not a vaid URL :(');
        console.log(symbols.error, url);
    }
});

console.log(symbols.info, 'bot server started...');
