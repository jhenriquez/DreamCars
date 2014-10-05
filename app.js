var express = require('express'),
	ejs = require('ejs'),
	app = express();

app.engine('html', ejs.renderFile);

app.use(express.static(__dirname + '/app'));

app.listen(3000);