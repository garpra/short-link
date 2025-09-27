const Database = require("better-sqlite3");
const fs = require("fs");

const db = new Database("database.db");

const table = fs.readFileSync("schema.sql", "utf-8");
db.exec(table);

module.exports = db;
