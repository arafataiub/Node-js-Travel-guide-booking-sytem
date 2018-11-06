var db = require('./db');

var members = function(callback){
	var sql = "SELECT `bookedby` , COUNT(bookedby) as popular from bookingtable GROUP by `bookedby` order by popular DESC limit 5";
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

module.exports.members = members;