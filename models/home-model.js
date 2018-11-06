var db = require('./db');

var getPlaceName = function(callback){
	var sql = "SELECT id, plcaeName FROM placetable order by plcaeName";
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

module.exports.getPlaceName = getPlaceName;