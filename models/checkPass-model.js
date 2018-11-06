var db = require('./db');

var findPass = function(email, pass, callback){
	var sql = "select * from admin where email= ? and `password`= ?";
	var param = [email,pass];
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

module.exports.findPass = findPass;