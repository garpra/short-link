const express = require("express");
const path = require("path");
const db = require("./database");
const bcrypt = require("bcrypt");
const session = require("express-session");

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "super-secret-code",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 3600000,
    },
  }),
);

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

  res.redirect("/login");
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const checkUser = db
    .prepare("SELECT * FROM users WHERE email = @email")
    .get({ email: email });

  if (!checkUser) {
    return res.status(401).json({
      message: "Email atau password salah",
    });
  }

  const valid = await bcrypt.compare(password, checkUser.password);
  if (!valid) {
    return res.status(401).json({
      message: "Email atau password salah",
    });
  }

  req.session.user = {
    id: checkUser.id,
    name: checkUser.name,
    email: checkUser.email,
  };
  res.json({
    message: "Login berhasil",
  });
});

app.get("/api/user/status", (req, res) => {
  if (req.session.user) {
    res.json({
      loggedIn: true,
      user: req.session.user,
    });
  } else {
    res.json({
      loggedIn: false,
    });
  }
});

app.get("/api/user/urls", (req, res) => {
  if (!req.session.user) {
    return;
  }

  const { id } = req.session.user;
  if (id) {
    const userUrls = db
      .prepare(`SELECT * FROM urls WHERE user_id = @id`)
      .all({ id: id });
    res.json(userUrls);
  }
});

app.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("connect.sid");
    res.json({
      message: "Logout berhasil",
    });
  });
});

app.listen(port);
