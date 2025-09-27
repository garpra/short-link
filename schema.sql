PRAGMA foreign_keys = ON;

-- =========================
-- USERS TABLE
-- =========================

CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY,

  name TEXT NOT NULL,

  email TEXT NOT NULL UNIQUE,

  password TEXT NOT NULL,

  created_at INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_users_email
ON users(email);


-- =========================
-- URLS TABLE
-- =========================

CREATE TABLE IF NOT EXISTS urls (
  id INTEGER PRIMARY KEY,

  user_id INTEGER,

  short_code TEXT NOT NULL UNIQUE,

  original_url TEXT NOT NULL,

  click_count INTEGER NOT NULL DEFAULT 0,

  created_at INTEGER NOT NULL,

  expires_at INTEGER,

  FOREIGN KEY (user_id) REFERENCES users(id)
);


CREATE INDEX IF NOT EXISTS idx_urls_short_code
ON urls(short_code);

CREATE INDEX IF NOT EXISTS idx_urls_user_id
ON urls(user_id);