var express = require('express'),
	symbols = require('log-symbols'),
	chalk = require('chalk'),

	pkg = require('./package.json'),

	app = express(),
	server;

app.get('/', (req, res) => {
	res.json({
		version: pkg.version
	});
});

server = app.listen(process.env.PORT, () => {
	console.log(chalk.blue(symbols.info, 'web server started on', server.address().port));
});
