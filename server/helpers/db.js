import pkg from 'pg'

const { Pool } = pkg


const openDb = () => {
    const pool = new Pool({
        user: 'postgres',
        host: 'localhost',
        database: 'test_movieapp', // Nimeä haluamaksesi
        password:'', // Määrittämäsi salasana
        port: 5432
    })
    return pool
}

const pool = openDb()

export{ pool }