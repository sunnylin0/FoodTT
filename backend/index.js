import express from 'express';
import sqlite3 from 'sqlite3';
import randomstring from 'randomstring'
import path from 'path';
import { v4 as uuidvs } from 'uuid';
import seedDatabase from './seedDatabase.js';
import cityFoodDB, { init_food } from './CityFoodDB.js';
import {
	mdbinit, mdb2, mdb3, mdb_quer,
	mdb_sql1, mdb_table1
} from './mdbtools.js';

const __dirname = path.resolve();
const DB_PATHFILE = '../database/myFood.sqlite'
//await seedDatabase();
//await cityFoodDB();


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



app.get("/subjoin", (req, res) => {
	console.log("subjoin is reached");

	console.log("GET subjoin");
	console.log("Body:", req.body);
	res.set(headers);

	const db = new sqlite3.Database(DB_PATHFILE, async (err) => {
		if (err)
			console.error(err);
		else {

			db.all("SELECT * FROM subCategory;", [], (err, rows) => {
				if (rows && err == null) {
					//rows.subCatId
					//db.all()
					let sData = []
					rows.forEach((aRow) => {
						console.log("o subCategory");
						console.log(aRow.subCatId)
						console.log(`SELECT subjoin.subId, subjoin.subName, subjoin.subPrice
						FROM subCategory INNER JOIN subjoin ON subCategory.subCatId = subjoin.subCatId
						WHERE subjoin.subCatId = '${aRow.subCatId}';`)

						db.all(`SELECT subjoin.subId, subjoin.subName, subjoin.subPrice
						FROM  subjoin 
						WHERE subjoin.subCatId = 'AH01';`, [], (err, asRows) => {

							console.log("asRows length" + asRows.length)
							if (asRows && err == null) {
								console.log("asRows == err")
								//console.log(asRows)
								sData.push("aRow")
								//	console.log("asRows part 2")

							}

						}
						)
					})
					console.log("sData 42")
					console.log(sData)
					sData.push("aRow")
					res.send(sData);

				}
			});
		}
	});

});

app.get('/ss', async (req, res) => {
	let db = new sqlite3.Database(DB_PATHFILE, async (err) => {
		if (err) {
			console.error(err);
		} else {
			console.log("op db");
		}
	})
	let data;
	let p3 = await getUsers();

	res.send(p3);

});
async function getUsers() {
	const promise = new Promise((resolve, reject) => {

		console.log("getUsers");
		const db = new sqlite3.Database(DB_PATHFILE, async (err) => {
			if (err) {
				console.error(err);
				console.log("error");
			} else {
				try {

					console.log("down 2");
					const sql = "SELECT * FROM users;";
					db.all(sql, [], (err, rows) => {
						if (err) reject(false);
						else {
							console.log("SELECT * FROM users;");
							console.log(rows);
							resolve(rows);
						}
					})
				} catch (err) {
					console.error(err);
					reject(false);
				}
			}
		});
	});
	return promise;
}

app.get('/ss2', async (req, res) => {
	let db = new sqlite3.Database(DB_PATHFILE, async (err) => {
		if (err) {
			console.error(err);
		} else {
			console.log("op db");
		}
	})
	let idList = await getSubCategoryId();
	console.log("SELECT * FROM subCategory;");
	Promise.all(idList.map(async (id, index) =>
		await getSubjoinItem(id))
	)
		.then(value => {
			console.log(value)
			resolve(value)
			console.log("fine ");
		})


	console.log("out very");

	res.send("value");

});
async function getSubCategoryId() {
	const promise = new Promise((resolve, reject) => {

		console.log("getSubjoin");
		const db = new sqlite3.Database(DB_PATHFILE, async (err) => {
			if (err) {
				console.error(err);
			} else {
				try {
					console.log("down 2");
					const sql = "SELECT subCatId FROM subCategory;";
					db.all(sql, [], (err, rows) => {
						if (err) reject(false);
						else {
							let getData = rows.map((ths) => ths.subCatId)
							resolve(getData)
						}
					})
				} catch (err) {
					console.error(err);
					reject(false);
				}
			}
		});
	});
	return promise;
}
async function getSubjoinItem(itemId) {
	const promise = new Promise((resolve, reject) => {
		console.log("getSubjoinItem");
		const db = new sqlite3.Database(DB_PATHFILE, async (err) => {
			if (err) {
				console.error(err);
			} else {
				try {
					let sql = `SELECT subId, subName, subPrice
						FROM  subjoin 
						WHERE subCatId = '${itemId}';`;
					console.log("down 2");
					db.all(sql, [], (err, rows) => {
						console.log("in in in 3");
						if (err) {
							console.log("error");
							console.log(err);
							reject(false);
						}
						else {
							console.log(`WHERE subjoin.subCatId = ${itemId};`);
							console.log(rows);
							resolve(rows);
						}
					})
				} catch (err) {
					console.log("very error");
					console.error(err);
					reject(false);
				}
			}
		})
	})
	return promise;
}
async function DBFetchingAllData(rows, db) {
	let promiseList = []
	rows.forEach((aRow, index) => {
		console.log("arow __")
		const p = new Promise((resolve, reject) => {
			resolve('table ' + index)
		})
		promiseList.push(p)
	});
	Promise.all(...promiseList)
		.then(value => {
			console.log(value)
			return value
		})
		.catch(err => {
			console.log(err.message)

			return err
		})
}



function DBFetchingAllData2(rows, db) {
	return new Promise((resolve) => {

		rows.forEach((aRow, index) => {
			console.log("arow __")
			console.log(aRow)
			let sql = `SELECT subjoin.subId, subjoin.subName, subjoin.subPrice
						FROM  subjoin 
						WHERE subjoin.subCatId = 'AH01';`;

			db.all(sql, [], (err, asRows) => {

				if (asRows && err == null) {
					console.log("asRows == err")
					console.log("asRows part 2")
					resolve("jlasdei 123")
				}
			});

		});

	});

}



app.get("/mdbinit", (req, res) => {
	console.log("mdbinit function");
	mdbinit();
	res.send("Healthy");
});
app.get("/mdb2", (req, res) => {
	console.log("mdbinit function 2");
	let result = mdb2();
	res.send("mdbinit function 2\n" +
		JSON.stringify(result).toString());
});
app.get("/mdb3", (req, res) => {
	console.log("mdb table function 3");
	let result = mdb3();
	res.send("mdb tabld function 3\n" +
		JSON.stringify(result).toString());
});
app.get("/quer", (req, res) => {
	console.log("mdb table function mdb_quer");
	let result = mdb_quer();
	res.send("mdb tabld function mdb_quer" +
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
	let result = mdb_table1();
	res.send("mdb tabld function mdb_table1" +
		JSON.stringify(result));
});
app.get("/init", (req, res) => {
	console.log("mdb table function mdb_table1");
	let result = init_food();
	res.send("mdb tabld function mdb_table1" +
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
					res.send({ message: "Hello World from backend", rows: rows });
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
