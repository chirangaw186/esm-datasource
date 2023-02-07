
require('dotenv').config();

const pgPromise = require('pg-promise');
const pgp = pgPromise({});

const config = {
    host : process.env.POSTGRES_HOST,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    port: process.env.POSTGRES_PORT
}

const db = pgp(config);

exports.db = db;
