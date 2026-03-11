const db = require("../database");

function getUrlsByUserId(userId) {
  return db.prepare(`SELECT * FROM urls WHERE user_id = @id`).all({ id: userId });
}

function createUrl(userId, shortCode, originalUrl) {
  return db
    .prepare(
      `INSERT INTO urls (user_id, short_code, original_url, created_at) VALUES (?,?,?,?)`
    )
    .run(userId, shortCode, originalUrl, Date.now());
}

function getUrlByShortCode(shortCode) {
    return db.prepare("SELECT * FROM urls WHERE short_code = @shortCode").get({ shortCode });
}

function incrementClickCount(shortCode) {
    return db.prepare("UPDATE urls SET click_count = click_count + 1 WHERE short_code = @shortCode").run({ shortCode });
}

module.exports = {
  getUrlsByUserId,
  createUrl,
  getUrlByShortCode,
  incrementClickCount,
};
