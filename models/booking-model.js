var db = require('./db');

var setBooking = function(info, callback){
	var sql = "INSERT INTO bookingtable (`bookingplace`, `hotel`, `bookedby` , `mobile`, `TrxID`,`price`, `status`, `time`) VALUES(?,?,?,?,?,?,?,?)";
	var param = [info.place,info.hotel,info.email,info.mobile,info.trx ,info.price,info.status,info.date];
	db.getData(sql, param ,function(result){
		if(result == null || result.length == 0)
		{
			callback(false);
		}
		else
		{
			callback(true);
		}

	});
}

module.exports.setBooking = setBooking;