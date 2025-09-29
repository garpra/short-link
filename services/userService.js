const db = require("../database");

function createUser(name, email, password) {
  return db
    .prepare(
      `INSERT INTO users (name, email, password, created_at) VALUES (?,?,?,?)`,
    )
    .run(name, email, password, Date.now());
}

function findUserByEmail(email) {
  return db.prepare("SELECT * FROM users WHERE email = @email").get({ email });
}

module.exports = {
  createUser,
  findUserByEmail,
};
