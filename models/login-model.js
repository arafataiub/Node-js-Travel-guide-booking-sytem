var db = require('./db');

var validateUser = function(user, callback){
	var sql = "SELECT * FROM usertable WHERE email=? AND password=?";
	var param = [user.email, user.password];
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

module.exports.validateUser = validateUser;