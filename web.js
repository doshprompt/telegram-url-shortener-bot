var express = require('express'),

	pkg = require('./package.json'),

	app = express(),
	server;

app.get('/', (req, res) => {
  res.json({
  	version: pkg.version
  });
});

server = app.listen(process.env.PORT, () => {
  var address = server.address();

  console.log('web server started at http://%s:%s', address.address, address.port);
});
