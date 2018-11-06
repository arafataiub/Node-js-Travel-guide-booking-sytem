var db = require('./db');

var bookedPlaces = function(callback){
	var sql = "SELECT * from bookingtable order by time DESC";
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

module.exports.bookedPlaces = bookedPlaces;