import pkg from 'pg'

const { Pool } = pkg


const openDb = () => {
    const pool = new Pool({
        user: 'postgres',
        host: 'localhost',
        password:'Suika/325', // Määrittämäsi salasana
        database: 'test_movie',
        port: 5432
    })
    return pool
}

const pool = openDb()


export{ pool }

