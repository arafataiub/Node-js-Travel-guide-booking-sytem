var db = require('./db');

var getAllbookings = function(email,callback){
	var sql = "select * from bookingtable where bookedby=? order by time DESC";
	var param = [email];
	db.getData(sql, param ,function(result){
		if(result == null || result.length == 0)
		{
			callback(false);
		}
		else
		{
			callback(result);
		}

	});
}

module.exports.getAllbookings = getAllbookings;