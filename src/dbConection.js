import mysql from 'mysql';
import { promisify } from 'util';
import { database } from './keys';

const pool = mysql.createPool(database);

pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.error('DATABASE CONNECTION WAS CLOSED');
        }

        if (err.code === 'ER_CON_COUT_ERROR') {
            console.error('DATABASE HAS TO MANY CONNECTIONS');
        }

        if (err.code === 'ECONNREFUSED') {
            console.error('DATABASE CONNECTION WAS REFUSED');
        }
    }

    if (connection) connection.release();
        console.log('DATABASE IS CONNECTED');
        return;
    
});

//transforma a promesas los callbacks
pool.query = promisify(pool.query);
module.exports = pool;