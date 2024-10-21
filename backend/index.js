import express from 'express';
import sqlite3 from 'sqlite3';
import randomstring from 'randomstring'
import path from 'path';
import {v4 as uuidvs} from 'uuid';
import seedDatabase from './seedDatabase.js';
import {
	mdbinit, mdb2, mdb3, mdb_quer,
	mdb_sql1, mdb_table1
} from './mdbtools.js';

const __dirname = path.resolve();

await seedDatabase();


const app = express();
const port = 8080;
const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "OPTIONS,GET,POST"
}

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));

app.get("/mdbinit", (req, res) => {
	console.log("mdbinit function");
	mdbinit();
	res.send("Healthy");
});
app.get("/mdb2", (req, res) => {
	console.log("mdbinit function 2");
	let result=mdb2();
	res.send("mdbinit function 2\n" +
		JSON.stringify(result).toString());
});
app.get("/mdb3", (req, res) => {
	console.log("mdb table function 3");
	let result=mdb3();
	res.send("mdb tabld function 3\n" + 
		JSON.stringify(result).toString());
});
app.get("/quer", (req, res) => {
	console.log("mdb table function mdb_quer");
	let result =mdb_quer();
	res.send("mdb tabld function mdb_quer"+
		JSON.stringify(result).toString());
});
app.get("/sql1", (req, res) => {
	console.log("mdb table function sql 1");
	let result = mdb_sql1();
	console.log("result=")
	console.log(result)

	console.log("JSON.stringify(result).toString()=")
	console.log(JSON.stringify(result).toString())
	res.send("mdb tabld function sql 1\n" +
		JSON.stringify(result).toString());
});

app.get("/tab1", (req, res) => {
	console.log("mdb table function mdb_table1");
	let result =mdb_table1();
	res.send("mdb tabld function mdb_table1"+
		JSON.stringify(result));
});






app.get("/health", (req, res) => {
	console.log("Health check endpoint is reached");
	res.send("Healthy");
});

app.get("/hello", (req, res) => {
    console.log("GET Hello World");
    console.log("Body:", req.body);
    res.set(headers);

    const db = new sqlite3.Database('../database/myapp.sqlite3', async (err) => {
        if (err)
            console.error(err);
        else {
            db.all("SELECT * FROM users;", [], (err, rows) => {
                if (rows && err == null) {
                    res.send({message: "Hello World from backend", rows: rows});
                }
            });
        }
    });
});

app.options("/hello", (req, res) => {
    res.set(headers);
    res.send("preflight response");
});

const logger = (req, res, next) => {
    console.log("Unexpected path:", req.url);
    next();
}

app.use(logger);
// 運行這個 port，參數分別為 port 和要執行的 function
const server = app.listen(port, () => {
    console.log("Listening on port:", port);
});

async function closeGracefully(signal) {
    console.log(`Received termated signal: ${signal}; process terminated...`);
    await server.close();
    process.exit();
}
process.on("SIGINT", closeGracefully);
process.on("SIGTERM", closeGracefully);











app.get('/', (req, res) => {
	delete req.headers['X-Frame-Options'];
	res.sendFile(path.join(__dirname + '/index.html'))
});


const GENDER = ["MALE", "FEMALE"]
let count = 0;

app.get('/api/user', (req, res) => {
	delete req.headers['X-Frame-Options'];
	count += 1;
	const { query: { requestId } } = req;
	const responseJson = {
		id: randomstring.generate(13),
		adId: requestId,
		salutation: GENDER[Math.round(Math.random())],
		firstname: randomstring.generate({
			length: 5,
			charset: 'alphabetic'
		}),
		lastname: randomstring.generate({
			length: 5,
			charset: 'alphabetic'
		}),
		birthday: "1999-12-25",
		phoneNumber: "0049" + randomstring.generate({
			length: 9,
			charset: 'numeric'
		}),
		email: randomstring.generate({
			length: 5,
			charset: 'alphabetic'
		}) + randomstring.generate({
			length: 4,
			charset: 'numeric'
		}) + "@ssssss.sdf",
		schufaAgreementAccepted: (Math.round(Math.random()) > 0),
		newsletterSubscription: (Math.round(Math.random()) > 0)
	}
	console.log(responseJson)
		res.json(responseJson)


});

//app.listen(port, () => console.log(`Example app listening on port ${port}!`));
