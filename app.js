// Declaration
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var expressSession = require('express-session');
var path = require('path');
var port = 1500;


var login = require('./controllers/login');
var admin = require('./controllers/admin');
var adminHome = require('./controllers/adminHome');
var reg = require('./controllers/reg');
var home = require('./controllers/home');
var logout = require('./controllers/logout');
// Configure
app.set('view engine', 'ejs');

//public
app.use(express.static(path.join(__dirname, 'asset')));

// Middlewares
app.use(bodyParser.urlencoded({extended: false}));
app.use(expressSession({secret: 'My top secret key', saveUninitialized: true, resave: false}));

// Route
app.all('*', function(req, res, next){
	if(req.url == '/' || req.url == '/login' || req.url == '/reg' || req.url=='/admin')
	{
		next();
		return;
	}
	if(req.session.loggedUser == null && req.session.loggedAdmin == null)
	{
		res.redirect('/login');
	}
	else
	{
		next();
	}
});

app.get('/', function(req, res){
	res.redirect('/login');
});


app.use('/login', login);
app.use('/reg', reg);
app.use('/home', home);
app.use('/adminHome', adminHome);
app.use('/admin',admin);
app.use('/logout', logout);

// Server startup
app.listen(port, function(){
	console.log('Server started at port ' + port);
});