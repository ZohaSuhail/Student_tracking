import { defineConfig } from 'drizzle-kit';
export default defineConfig({
    out: './drizzle',
    schema: './utils/schema.js',
    dialect: 'mysql',

    dbCredentials: {
        host: "bubgk0mxgwafou5ovbrc-mysql.services.clever-cloud.com",
        user: "udejvh6kgaanc2aw",
        database: "bubgk0mxgwafou5ovbrc",
        password: 'eLqWaRZrK8L7nrL8zZdd',
        port: '3306'
    },
    
});