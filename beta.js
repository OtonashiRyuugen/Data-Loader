var http = require('http');
var MongoClient = require('mongodb').MongoClient;
var url = require('url');
var MongoURL = "mongodb://127.0.0.1:27017/";
var fs = require('fs');

const arrayToObject = (array) =>
	array.reduce((obj, item) => {
		obj[item.id] = item
		return obj
	}, {})

http.createServer(function (req, res) {
	var q = url.parse(req.url, true).query;
	var meow = url.parse(req.url, true).pathname;
	if (meow == "/parse") {
		MongoClient.connect(MongoURL, q, function(err, db) {
			if (err) throw err;
			var dbo = db.db("RBSN");
			var query = {q};
			dbo.collection("data").find(q, {_id:0,id:0}).toArray(function(err, result) {
				if (err) throw err;
				res.writeHead(200, {'Content-Type': 'text/json'});
				res.end(JSON.stringify(result));
				db.close();
			});
		});
		return;
	} else if (meow == "/parselatest") {
		MongoClient.connect(MongoURL, q, function(err, db) {
			if (err) throw err;
			var dbo = db.db("RBSN");
			var query = {q};
			dbo.collection("data").sort({dateTime:-1}).find(q,{ _id:0,id:0}).toArray(function(err, result) {
				if (err) throw err;
				res.writeHead(200, {'Content-Type': 'text/json'});
				res.end(JSON.stringify(resultObj.first()));
				db.close();
			});
		});
		return;
	} else {
		MongoClient.connect(MongoURL, q, function(err, db) {

			if (err) throw err;
			var dbo = db.db("RBSN");
			q.dateTime = new Date();
			var txt = JSON.stringify(q);
			dbo.collection("data").insertOne(q, function(err, res) {
				if (err) throw err;
				db.close();
			});
			res.writeHead(200, {'Content-Type': 'text/html'});
			res.end(txt);
		});
	}
}).listen(27018);
