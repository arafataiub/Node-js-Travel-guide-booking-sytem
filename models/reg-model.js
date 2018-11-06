var db = require('./db');

var insertUser = function(user, callback){
	var sql = "INSERT INTO usertable (`name`, `password`, `email`) VALUES(?,?,?)";
	var param = [user.name, user.password,user.email];
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

module.exports.insertUser = insertUser;