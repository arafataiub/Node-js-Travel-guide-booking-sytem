var db = require('./db');

var update = function(email,pass, callback){
	var sql = "UPDATE `admin` SET `password`=? WHERE email=?";
	var param = [pass,email];
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

module.exports.update = update;