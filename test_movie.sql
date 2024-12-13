CREATE TABLE "User" (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

DROP TABLE IF EXISTS reviews;
CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    tmdb_id INT NOT NULL, -- TMDb-elokuvan ID
    user_id INT NOT NULL, -- Viittaus User-tauluun
    stars INT CHECK (stars >= 1 AND stars <= 5), -- Tähdet (1–5)
    comment TEXT, -- Sanallinen arvostelu
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Aikaleima
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES "User" (id) ON DELETE CASCADE
);

CREATE TABLE favorite_movies (
    id SERIAL PRIMARY KEY, -- Yksilöllinen tunniste
    user_id INTEGER NOT NULL, -- Viittaus käyttäjän ID:hen
    tmdb_id INTEGER NOT NULL, -- Elokuvan TMDb ID
    title VARCHAR(255) NOT NULL, -- Elokuvan nimi
    poster_path VARCHAR(255), -- Polku elokuvan julisteeseen
    created_at TIMESTAMP DEFAULT NOW(), -- Lisäysaika
    FOREIGN KEY (user_id) REFERENCES "User"(id) ON DELETE CASCADE
);

CREATE TABLE groups (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    owner VARCHAR(255) NOT NULL,
    members TEXT[] NOT NULL
);

CREATE TABLE group_movies (
    id SERIAL PRIMARY KEY,
    group_id INT REFERENCES groups(id) ON DELETE CASCADE,
    movie_id VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    poster_path VARCHAR(255)
);