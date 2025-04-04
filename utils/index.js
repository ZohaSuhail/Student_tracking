import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";

// Use a global variable to prevent multiple pools
let pool;

if (!global._pool) {
  global._pool = mysql.createPool({
    host: "bubgk0mxgwafou5ovbrc-mysql.services.clever-cloud.com",
    user: "udejvh6kgaanc2aw",
    database: "bubgk0mxgwafou5ovbrc",
    password: "eLqWaRZrK8L7nrL8zZdd",
    port: 3306,
    waitForConnections: true,
    connectionLimit: 5,
    queueLimit: 0,
  });
}

pool = global._pool;

export const db = drizzle(pool);

