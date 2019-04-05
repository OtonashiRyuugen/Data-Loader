const http = require('http');
const url = require('url');

const MongoClient = require('mongodb').MongoClient;

const MongoURL = "mongodb://127.0.0.1:27017/";

const arrayToObject = array =>
	array.reduce((obj, item) => {
		obj[item.id] = item
		return obj
	}, {});

http.createServer((req, res) => {
	const q = url.parse(req.url, true).query;
	const meow = url.parse(req.url, true).pathname;
	
	if (meow === "/parse")
		MongoClient.connect(MongoURL, q, (err, db) => {
			if (err) throw err;
	
			const dbo = db.db("RBSN");
			
			dbo.collection("data").find(q, {_id:0,id:0}).toArray((err, result) => {
				if (err) throw err; 
				
				res.writeHead(200, {'Content-Type': 'text/json'});
				res.end(JSON.stringify(result));
				db.close();
			});
		});
	else if (meow === "/parselatest")
		MongoClient.connect(MongoURL, q, (err, db) => {
			if (err) throw err;
			
			const dbo = db.db("RBSN");
			
			dbo.collection("data").find(q,{ _id:0,id:0}).sort({dateTime:-1}).toArray((err, result) => {
				if (err) throw err;
				
				res.writeHead(200, {'Content-Type': 'text/json'});
				res.end(JSON.stringify(result[0]);
				db.close();
			});
		});
	else
		MongoClient.connect(MongoURL, q, (err, db) => {
			if (err) throw err;
			
			const = db.db("RBSN");
			q.dateTime = new Date();
			
			dbo.collection("data").insertOne(q, (err, res) => {
				if (err) throw err;
				
				db.close();
			});
			
			res.writeHead(200, {'Content-Type': 'text/html'});
			res.end(JSON.stringify(q));
		});
}).listen(8080);
