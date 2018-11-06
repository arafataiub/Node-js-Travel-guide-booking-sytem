// DECLARATION
var express = require('express');
var router = express.Router();

var placeNames = require.main.require('./models/home-model');
var placeDetails = require.main.require('./models/details-model');
var booking= require.main.require('./models/booking-model');
var allBooking= require.main.require('./models/allBooking-model');

router.get('/', function(req, res){

	placeNames.getPlaceName(function(result){
		if(result != false)
		{
			//console.log(result);
			res.render('home/index',{result: result});
		}
		else
		{
			res.render('home/index',{msg: 'something went wrong!!'});
		}
	});
	
});

router.get('/bookNow', function(req, res){
	res.render('home/bookNow');
});

router.get('/allBookings',function(req,res){
	allBooking.getAllbookings(req.session.loggedUser,function(result){
		if(result != false)
		{
			//console.log(result);
			res.render('home/allBookings',{result: result});
		}
		else
		{
			res.render('home/allBookings',{msg: 'something went wrong!!'});
		}
	});
});
router.post('/bookNow', function(req, res){
	//console.log(req.body.trx);
	//console.log(req.body.mobile);
	var info = {
		email: req.session.loggedUser,
		trx: req.body.trx,
		mobile: req.body.mobile,
		place: req.session.place,
		hotel: req.session.hotel,
		date: req.body.date,
		price: 2000,
		status: 'applied'
	};
	req.body.trx=null;
	req.body.mobile=null;

	booking.setBooking(info, function(valid){
		if(valid)
		{
			res.render('home/bookNow',{msg: 'Request is submitted for approval !!'});		
		}
		else
		{
			res.render('home/bookNow',{msg: 'Error occured !!'});
		}

	});

});

router.get('/place/:name', function(req, res){
	//console.log(req.params.name);
	//console.log(req.session.loggedUser);
	placeDetails.getPlaceDetails(req.params.name,function(result){
		if(result != false)
		{
			req.session.place=result[0].plcaeName;
			req.session.hotel=result[0].hotel;
			res.render('home/info',{result: result});
		}
		else
		{
			res.render('home/info',{msg: 'something went wrong!!'});
		}
	});

});


module.exports = router;