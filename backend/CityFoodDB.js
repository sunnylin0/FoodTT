import sqlite3 from "sqlite3";

export default async function cityfoodDatabase() {

	console.log("-->cityfoodDatabase")
	const promise = new Promise((resolve, reject) => {
		const db = new sqlite3.Database('../database/myapp.sqlite3', async (err) => {
			if (err) {
				console.error(err);
			} else {
				try {
					await dropUsers(db);
					await createUsers(db);
					await createUsersData(db);
					//await insertUsers(db, 2,"Master Account", "hardpassword");
					await showUsers(db);
					resolve(true);
				} catch (err) {
					console.error(err);
					reject(false);
				}
			}
		});
	});
	return promise;
}

//seedDatabase();

async function dropUsers(db) {
	console.log("-->dropUsers")
	const promise = new Promise((resolve, reject) => {
		db.run("DROP TABLE IF EXISTS users;", [], (err) => {
			if (err) {
				console.error(err);
				reject();
			} else
				resolve();
		});
	});
	return promise;
}

async function createUsers(db) {
	console.log("-->createUsers")
	const promise = new Promise((resolve, reject) => {
		db.run(`CREATE TABLE IF NOT EXISTS users
			(
				userId			INTEGER PRIMARY KEY,
				userName		varchar,
				phone			varchar,
				email			varchar,
				password		varchar,
				role			varchar
			);`, [], (err) => {
			if (err) {
				console.error(err);
				reject();
			} else
				resolve();
		});
	});
	return promise;
}
async function createUsersData(db) {
	console.log("-->createUsersData")
	const promise = new Promise((resolve, reject) => {
		db.run("INSERT INTO `users` (`userId`, `userName`, `phone`, `email`, `password`, `role`) VALUES (2,'Á¦»æ','912345678','potato@gmail.com','0000','admin'), (3,'¤p©ú','958783183','cake@gmail.com','0000','customer'), (4,'¤j©ú','911333555','ming@gmail.com','0000','user'), (5,'ªü«¼','988168168','anti@gmail.com','0000','admin'), (6,'ªN­Û','926398045','jay@gmail.com','0000','customer'), (7,'·¬K','911321123','karen@gmail.com','0000','customer'), (8,'³¹³½­ô','911123123','squidward@gmail.com','0000','customer'), (9,'¬À­}','912123222','sandy@gmail.com','0000','customer'), (10,'¬£¤j¬P','911123333','patrick@gmail.comcustomer','0000',NULL), (11,'A2','9','A2@store.com','null','insider'), (12,'A3','9','A3@store.com','null','insider'), (13,'A4','9','A4@store.com','null','insider');",
			[], (err) => {
				if (err) {
					console.error(err);
					reject();
				} else
					resolve();
			});
	});
	return promise;
}

async function insertUsers(db, id, name, passowrd) {
	console.log("-->insertUsers")
	const promise = new Promise((resolve, reject) => {
		db.run("INSERT INTO users( userName, password) VALUES( ?, ?);", [name, passowrd], (err) => {
			if (err) {
				console.error(err);
				reject();
			} else
				resolve();
		});
	});
	return promise;
}

async function showUsers(db) {
	console.log("-->showUsers")
	const promise = new Promise((resolve, reject) => {
		db.all("SELECT * FROM users", (err, rows) => {
			if (rows && err == null) {
				console.log(rows);
				resolve();
			} else {
				console.error(err);
				reject();
			}
		});
	});
	return promise;
}