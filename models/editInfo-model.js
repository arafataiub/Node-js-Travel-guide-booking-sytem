var db = require('./db');

var editRow = function(id,callback){
	var sql = "SELECT * FROM `placetable` where id = ?";
	var param = id;
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

module.exports.editRow = editRow;