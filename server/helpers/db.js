import pkg from 'pg'

const { Pool } = pkg


const openDb = () => {
    const pool = new Pool({
        user: 'postgres',
        host: 'localhost',
        database: 'test_movie',
        password:'Pontus93' ,
        port: 5432
    })
    return pool
}

const pool = openDb()

export{ pool }