// DECLARATION
var express = require('express');
var router = express.Router();
var loginModel = require.main.require('./models/login-model');

router.get('/', function(req, res){
	res.render('login/index');
});

router.post('/', function(req, res){
		var user = {
		email: req.body.email,
		password: req.body.password
	};

	loginModel.validateUser(user, function(valid){
		if(valid)
		{
			req.session.loggedUser = user.email;
			res.redirect('/home');
		}
		else
		{
			res.render('login/index',{msg: 'invalid email or password'});
		}
});

});

module.exports = router;