import mysql from 'mysql2/promise';
import 'dotenv/config';
var pool;

export default function getPool() {
    if (pool) {
        return pool;
    }

    return mysql.createPool({
        connectionLimit: 1000,
        port: process.env.MYSQL_PORT,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASS,
        database: process.env.MYSQL_DATABASE,
    });
}