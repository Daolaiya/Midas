CREATE TYPE media_types AS ENUM ('movie', 'show');

CREATE TABLE media (
  id VARCHAR(25) PRIMARY KEY,
  title TEXT NOT NULL,
  type media_types NOT NULL,
  cast_list TEXT NOT NULL,
  description TEXT NOT NULL
);

CREATE TABLE users (
  username VARCHAR(25) PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  password TEXT NOT NULL,
  email TEXT NOT NULL CHECK (position('@' IN email) > 1),
  is_admin BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE favorites (
  id SERIAL PRIMARY KEY,
  username VARCHAR(25) REFERENCES users(username) ON DELETE CASCADE,
  media_id VARCHAR(25) REFERENCES media(id) ON DELETE CASCADE
);
