var db = require('./db');

var allInfo = function(callback){
	var sql = "SELECT * FROM `placetable` order by `plcaeName` asc";
	var param = null;
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

module.exports.allInfo = allInfo;