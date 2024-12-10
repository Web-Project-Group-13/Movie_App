-- This script was generated by the ERD tool in pgAdmin 4.
-- Please log an issue at https://github.com/pgadmin-org/pgadmin4/issues/new/choose if you find any bugs, including reproduction steps.

drop table if exists account;

drop table if exists arvostelu;

create table account (
    id serial primary key,
    username varchar(50) unique not null,
    password varchar(255) not null
);

create table arvostelu (
    id serial primary key,
    nimi varchar(50) not null,
    arvostelu varchar(255) not null
);
