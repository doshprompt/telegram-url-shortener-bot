var express = require('express'),
	pkg = require('./package.json'),
	app = express(),

	server;

app.get('/', function (req, res) {
  res.json({
  	version: pkg.version
  });
});

server = app.listen(process.env.PORT, function () {
  var address = server.address();

  console.log('Web server started at http://%s:%s', address.address, address.port);
});
