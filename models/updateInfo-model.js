var db = require('./db');

var updateRow = function(id,info, callback){
	var sql = "UPDATE `placetable` SET plcaeName=?,details=?,hotel=?,category=?,lastEdit=?,capacity=? WHERE id=?";
	var param = [info.plcaeName,info.details,info.hotel,info.category,info.lastEdit,info.capacity,id];
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

module.exports.updateRow = updateRow;