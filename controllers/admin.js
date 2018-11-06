// DECLARATION
var express = require('express');
var router = express.Router();
var adminModel = require.main.require('./models/admin-model');


router.get('/', function(req, res){
	res.render('admin/index');
});

router.post('/', function(req, res){
		var admin = {
		email: req.body.email,
		password: req.body.password
	};

	adminModel.validateadmin(admin, function(valid){
		if(valid)
		{
			//console.log(admin);
			req.session.loggedAdmin = admin.email;
			res.redirect('/adminHome');
		}
		else
		{
			res.render('admin/index',{msg: 'invalid admin email or password'});
		}
});

});

module.exports = router;