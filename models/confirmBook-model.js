var db = require('./db');

var confirm = function(id, callback){
	var sql = "UPDATE `bookingtable` SET `status`='confrirmed' WHERE id=?";
	var param = [id];
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

module.exports.confirm = confirm;