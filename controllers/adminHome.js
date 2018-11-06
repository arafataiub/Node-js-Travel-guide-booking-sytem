// DECLARATION
var express = require('express');
var router = express.Router();

var bestPlaces = require.main.require('./models/bestPlaces-model');
var bookingPlaces = require.main.require('./models/bookingPlaces-model');
var bestMember= require.main.require('./models/bestMember-model');
var confirmBook= require.main.require('./models/confirmBook-model');
var findExistAdmin = require.main.require('./models/findExistAdmin');
var adminRegModel = require.main.require('./models/adminReg-model');
var addNewInfo = require.main.require('./models/addNewInfo-model');
var getAll = require.main.require('./models/ShowAllInfo-model');
var deleteInfo = require.main.require('./models/deleteInfo-model');
var editInfo = require.main.require('./models/editInfo-model');
var updateInfo = require.main.require('./models/updateInfo-model');
var checkPass = require.main.require('./models/checkPass-model');
var updatePass = require.main.require('./models/updatePass-model');
var deleteEmail = require.main.require('./models/deleteEmail-model');

router.get('/', function(req, res){

	res.render('admin/home',{msg: req.session.loggedAdmin});
});

router.get('/list', function(req, res){

		bookingPlaces.bookedPlaces(function(result){
		if(result != false)
		{
			//console.log(result);
			res.render('admin/list',{result: result});
		}
		else
		{
			res.render('admin/list',{msg: 'something went wrong!!'});
		}
	});
});

router.get('/list/id/:id', function(req, res){
	//console.log(req.params.id);
	confirmBook.confirm(req.params.id,function(result)
		{
			if(result != false)
			{
				res.redirect('/adminHome/list');
			}
			else
			{
				res.render('admin/home',{msg: 'Sorry!! could not update'});
			}
		});
});

router.get('/bestPlaces', function(req, res){

	bestPlaces.places(function(result){
		if(result != false)
		{
			//console.log(result);
			res.render('admin/bestPlaces',{result: result});
		}
		else
		{
			res.render('admin/bestPlaces',{msg: 'something went wrong!!'});
		}
	});
});

router.get('/bestMember', function(req, res){

		bestMember.members(function(result){
		if(result != false)
		{
			//console.log(result);
			res.render('admin/bestMember',{result: result});
		}
		else
		{
			res.render('admin/bestMember',{msg: 'something went wrong!!'});
		}
	});
});

router.get('/newAdmin', function(req, res){

	res.render('admin/newAdmin');
});

router.post('/newAdmin', function(req, res){

		var user = {
		email: req.body.email,
		password: req.body.password,
		confirmPass: req.body.pass,
		name: req.body.name,
		addedBy: req.session.loggedAdmin
	};
	if(user.password!=user.confirmPass)
	{
		res.render('reg/index',{msg: 'confrim password did not match!'});
	}
	else{
		findExistAdmin.findTheAdminExits(user, function(valid){
			if(valid)
			{
				res.render('reg/index',{msg: 'Email already exist'});
			}
			else
			{
				adminRegModel.insertAdmin(user,function(flag){

					if(flag!=false)
					{
						res.render('reg/index',{msg: 'One row inserted'});
					}
					else
					{
						res.render('reg/index',{msg: 'Error occured'});
					}

				});
			}
	});
}
});

router.get('/addNewInfo', function(req, res){

	res.render('admin/addNewInfo');
});

router.post('/addNewInfo', function(req, res){

	var info = {
		plcaeName: req.body.place,
		details: req.body.details,
		hotel: req.body.hotel,
		category: req.body.category,
		capacity: req.body.capacity,
		lastEdit: req.session.loggedAdmin
	};
	//console.log(info);
	addNewInfo.add(info,function(result)
		{
			if(result != false)
			{
				res.render('admin/addNewInfo',{msg: 'Data added'});
			}
			else
			{
				res.render('admin/addNewInfo',{msg: 'Sorry!! could not add'});
			}
		});
});

router.get('/showAll',function(req,res){

	getAll.allInfo(function(result){
		if(result != false)
		{
			//console.log(result);
			res.render('admin/showAll',{result: result});
		}
		else
		{
			res.render('admin/showAll',{msg: 'something went wrong!!'});
		}
	});
});

router.get('/showAll/del/:id',function(req,res){
		deleteInfo.deleteRow(req.params.id,function(value){
		if(value)
		{
			//console.log(result);
			res.redirect('/adminHome/showAll');
		}
		else
		{
			res.render('admin/home',{msg: 'Sorry!! could not delete'});
		}
	});
});

router.get('/showAll/edit/:id',function(req,res){
		editInfo.editRow(req.params.id,function(result){
		if(result != null)
		{
			//console.log(result);
			res.render('admin/editRow',{result:result});
		}
		else
		{
			res.render('admin/editRow',{msg: 'Sorry!! could not load data'});
		}
	});
});

router.post('/showAll/edit/:id',function(req,res){

		var info = {
		plcaeName: req.body.place,
		details: req.body.details,
		hotel: req.body.hotel,
		category: req.body.category,
		capacity: req.body.capacity,
		lastEdit: req.session.loggedAdmin
		};

		updateInfo.updateRow(req.params.id,info,function(result){
		if(result != null)
		{
			//console.log(result);
			res.redirect('/adminHome/showAll');
		}
		else
		{
			res.render('admin/home',{msg: 'Sorry!! could not upadte the row'});
		}
	});
});

router.get('/changePass',function(req,res){
	res.render('admin/changePass',{msg: 'change password'});
});

router.post('/changePass',function(req,res){
	var passwords={
		oldPass: req.body.oldPass,
		new1: req.body.newPass1,
		new2: req.body.newPass2
	};
	if(passwords.new2 != passwords.new1)
	{
		res.render('admin/changePass',{msg: 'Confirm password did not match!'});
	}
	else{
		checkPass.findPass(req.session.loggedAdmin,passwords.oldPass,function(valid){
			if(valid)
			{
				updatePass.update(req.session.loggedAdmin,passwords.new1,function(worked){
					if(worked)
					{
					  res.render('admin/changePass',{msg: 'password updated!'});
					}
					else{
						res.render('admin/changePass',{msg: 'error! password could not updated!'});
					}
				});
				
			}
			else{
				res.render('admin/changePass',{msg: 'old password did not match!'});
			}
		});
	}

});

router.get('/deleteEmail',function(req,res){
	res.render('admin/deleteEmail',{msg: 'Give the info'});
});

router.post('/deleteEmail',function(req,res){
	var data={
		role:req.body.role,
		email:req.body.email
	};
	deleteEmail.deleteIt(data,function(valid){
		if(valid)
		{
			res.render('admin/deleteEmail',{msg: 'Successful'});
		}
		else{
			res.render('admin/deleteEmail',{msg: 'Error!!'});
		}
	});
});

module.exports = router;