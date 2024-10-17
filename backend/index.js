import express from 'express';
import sqlite3 from 'sqlite3';
import {v4 as uuidvs} from 'uuid';
import seedDatabase from './seedDatabase.js';
import {
	mdbinit, mdb2, mdb3, mdb_quer,
	mdb_sql1, mdb_table1
} from './mdbtools.js';

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
	mdb2();
	res.send("mdbinit function 2");
});
app.get("/mdb3", (req, res) => {
	console.log("mdb table function 3");
	mdb3();
	res.send("mdb tabld function 3");
});
app.get("/quer", (req, res) => {
	console.log("mdb table function mdb_quer");
	mdb_quer();
	res.send("mdb tabld function mdb_quer");
});
app.get("/sql1", (req, res) => {
	console.log("mdb table function sql 1");
	mdb_sql1();
	res.send("mdb tabld function sql 1");
});




app.get("/tab1", (req, res) => {
	console.log("mdb table function mdb_table1");
	mdb_table1();
	res.send("mdb tabld function mdb_table1");
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