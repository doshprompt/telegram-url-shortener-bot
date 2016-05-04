var express = require('express'),

	pkg = require('./package.json'),

	app = express(), d
	server;

app.get('/', function (req, res) {
  res.json({
  	version: pkg.version
  });
});

server = app.listen(process.env.PORT, function () {
  var address = server.address();

  console.log('web server started at http://%s:%s', address.address, address.port);
});
