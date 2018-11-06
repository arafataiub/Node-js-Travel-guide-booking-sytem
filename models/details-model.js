var db = require('./db');

var getPlaceDetails = function(place, callback){
	var sql = "SELECT id, plcaeName, details , hotel, category FROM placetable WHERE `plcaeName` = '"+place+"'";
	var param = null;
	db.getData(sql, param ,function(result){
		if(result == null || result.length == 0)
		{
			callback(false);
		}
		else
		{
			//console.log(result);
			callback(result);
		}

	});
}

module.exports.getPlaceDetails = getPlaceDetails;