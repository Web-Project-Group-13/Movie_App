CREATE TABLE "User" (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.reviews (
    id SERIAL PRIMARY KEY,
    tmdb_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL REFERENCES public."User" (id) ON DELETE CASCADE,
    stars INTEGER CHECK (stars BETWEEN 1 AND 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    movie_title VARCHAR(255),
    movie_poster VARCHAR(255)
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
    members TEXT[] NOT NULL,
    owner_id INT,
    CONSTRAINT fk_owner FOREIGN KEY (owner_id)   -- Viittaus käyttäjiin
        REFERENCES public."User" (id)
        ON UPDATE NO ACTION
        ON DELETE CASCADE
);

CREATE TABLE group_movies (
    id SERIAL PRIMARY KEY,
    group_id INT REFERENCES groups(id) ON DELETE CASCADE,
    movie_id VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    poster_path VARCHAR(255),
    user_id INT,
    CONSTRAINT fk_user FOREIGN KEY (user_id)       -- Viittaus käyttäjiin
        REFERENCES public."User" (id)
        ON UPDATE NO ACTION
        ON DELETE CASCADE,
    CONSTRAINT fk_group FOREIGN KEY (group_id)     -- Viittaus ryhmiin
        REFERENCES public.groups (id)
        ON UPDATE NO ACTION
        ON DELETE CASCADE
);