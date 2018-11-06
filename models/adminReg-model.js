var db = require('./db');

var insertAdmin = function(user, callback){
	var sql = "INSERT INTO admin (`name`, `password`, `email`, `addedBy`) VALUES(?,?,?,?)";
	var param = [user.name, user.password,user.email,user.addedBy];
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

module.exports.insertAdmin = insertAdmin;