var db = require('./db');

var places = function(callback){
	var sql = "SELECT `bookingplace` , COUNT(bookingplace) as popular from bookingtable GROUP by `bookingplace` order by popular DESC limit 5";
	var param = null;
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

module.exports.places = places;