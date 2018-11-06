var db = require('./db');

var findTheUserExits = function(user, callback){
	var sql = "SELECT name,email FROM usertable WHERE email=?";
	var param = [user.email];
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

module.exports.findTheUserExits = findTheUserExits;