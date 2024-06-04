import mysql from 'mysql2';
import { env } from '../env';
import { logger } from '../Logger/Winston';

const pool = mysql.createPool({

  connectionLimit: 20,
  host: env.MYSQL_HOST, // ip address of server running mysql
  port: env.MYSQL_PORT,
  user: env.MYSQL_USERNAME, // user name to your mysql database
  password: env.MYSQL_PASSWORD,
  database: env.MYSQL_DATABASE, // use the specified database
  multipleStatements: true,
  ssl: {
    rejectUnauthorized: false
  },
});

logger.info('Database created successfully');

export { pool };


