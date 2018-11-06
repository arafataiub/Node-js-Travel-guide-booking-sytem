var db = require('./db');

var validateadmin = function(admin, callback){
	var sql = "SELECT * FROM admin WHERE email=? AND password=?";
	var param = [admin.email, admin.password];
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

module.exports.validateadmin = validateadmin;