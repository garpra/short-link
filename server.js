const express = require("express");
const path = require("path");
const db = require("./database");
const bcrypt = require("bcrypt");

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

app.get("/signup", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "signup.html"));
});

app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  db.prepare(
    `INSERT INTO users (name, email, password, created_at) VALUES (?,?,?,?)`,
  ).run(name, email, hashedPassword, Date.now());

  res.json({
    message: "User created",
  });
});

app.listen(port);
