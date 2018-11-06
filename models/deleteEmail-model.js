var db = require('./db');

var deleteIt = function(data, callback){
	if(data.role=='admin')
	{
		var sql = "DELETE FROM `admin` WHERE email = ?";
	}
	else
	{
		var sql = "DELETE FROM `usertable` WHERE email = ?";
	}
	
	var param = [data.email];
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

module.exports.deleteIt = deleteIt;