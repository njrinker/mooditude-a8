
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars');

var index = require('./routes/index');
var gratitude = require('./routes/gratitude');
var report = require('./routes/report');
var title = require('./routes/title');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('IxD secret key'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
/*var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies*/

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', index.view);
app.get('/gratitude', gratitude.view);
app.get('/report', report.view);
app.get('/title', title.view);
app.post('/addMood', index.addMood);
app.post('/setTheme', index.setTheme);
app.post('/setMoods', index.setMoods);
app.post('/addGrat', gratitude.addGrat);
app.post('/fillReport', report.fillReport);
app.post('/getForms', index.getForms);
app.post('/getTheme', index.getTheme);
app.post('/getBubbles', index.getBubbles);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
