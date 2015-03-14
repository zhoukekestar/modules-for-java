var MongoClient = require('mongodb').MongoClient;
var ObjectID = require("mongodb").ObjectID;

var mongoDB;
MongoClient.connect("mongodb://sa:sa123@192.168.0.199:27017/express?authSource=admin", function(err, db){
	if (err)
		console.log(err);
	mongoDB = db;
	


});

var operate = {
	getDB: function(){
		return mongoDB;
	},
	select: function(name, options, callback){
		if (callback == undefined) {
			callback = options;
			options = {};
		}
		var col = mongoDB.collection(name);
		col.find(options).toArray(function(err, docs){
			callback(err, docs);
		});
	},
	selectByID: function(name, id, callback){
		
		var col = mongoDB.collection(name);
		col.find({"_id": ObjectID(id)}).toArray(function(err, docs){
			callback(err, docs);
		});
	},
	insert: function(name, doc, callback){
		var col = mongoDB.collection(name);
		col.insert(doc, function(err, result){
			var id = result.ops[0]["_id"].toString();
			callback(err, id, result);
		});
	},
	update: function(name, id, doc, callback) {
		var col = mongoDB.collection(name);
		col.update({"_id": ObjectID(id)}, doc, function(err, result) {
			callback(err, result);
		});
	},
	delete: function(name, id, callback) {
		var col = mongoDB.collection(name);
		col.remove({"_id": ObjectID(id)}, function(err, result){
			callback(err, result);
		});
	}
}
module.exports = operate;