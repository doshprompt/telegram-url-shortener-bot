'use strict';

const express = require('express');
const symbols = require('log-symbols');

const pkg = require('./package.json');

const app = express();

app.get('/', (req, res) => {
	res.json({
		version: pkg.version
	});
});

let server = app.listen(process.env.PORT, () => {
	console.log(symbols.info, 'web server started on', server.address().port);
});
