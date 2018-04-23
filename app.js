var http = require('http');
var MongoClient = require('mongodb').MongoClient;
var url = require('url');
var MongoURL = "mongodb://127.0.0.1:27017/";

http.createServer(function (req, res) {
	res.writeHead(200, {'Content-Type': 'text/html'});
	var q = url.parse(req.url, true).query;
	q.dateTime = new Date();
	var txt = JSON.stringify(q)

	MongoClient.connect(MongoURL, q, txt, function(err, db) {
		if (err) throw err;
		var dbo = db.db("RBSN");
		dbo.collection("data").insertOne(q, function(err, res) {
			if (err) throw err;
			console.log("1 document inserted");
			console.log(txt)
			db.close();
		});
	});

	res.end(txt);
}).listen(8080);
