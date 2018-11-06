var db = require('./db');

var add = function(info, callback){
	var sql = "INSERT INTO placetable (`plcaeName`, `details`, `hotel`, `category`, `lastEdit`, `capacity`) VALUES(?,?,?,?,?,?)";
	var param = [info.plcaeName,info.details,info.hotel,info.category,info.lastEdit,info.capacity];
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

module.exports.add = add;