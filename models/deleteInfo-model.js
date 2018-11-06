var db = require('./db');

var deleteRow = function(id, callback){
	var sql = "DELETE FROM `placetable` WHERE id = ?";
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

module.exports.deleteRow = deleteRow;