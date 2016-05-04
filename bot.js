var Bot = require('node-telegram-bot-api'),
    validator = require('validator'),
    request = require('request-promise'),
    symbols = require('log-symbols'),

    bot = new Bot(process.env.TOKEN, {
        polling: true
    });

bot.onText(/^\/start$/, (msg) => {
    bot.sendMessage(msg.chat.id, 'Just send me a url and I\'ll shorten it!');
});

bot.onText(/^\/shorten (.+)$/, (msg, match) => {
    var url = match[1];
    if (validator.isURL(url)) {
        request.get('http://tinyurl.com/api-create.php?url=' + url).then((r) => {
            bot.sendMessage(msg.chat.id, r);
            console.log(symbols.success, '%s -> %s', url, r);
        });
    } else {
        bot.sendMessage(msg.chat.id, 'Sorry, that\'s not a vaid URL :(');
        console.log(symbols.error, url);
    }
});

console.log(symbols.info, 'bot server started...');
