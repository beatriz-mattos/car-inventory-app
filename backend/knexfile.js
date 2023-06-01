const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    development: {
        client: 'pg',
        connection: {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
        },
        pool: {
            afterCreate: (conn, done) => {
                conn.query('SET timezone="UTC";', (err) => {
                    if (err) {
                        console.log('Failed to set timezone:', err);
                    }
                    conn.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";', (err) => {
                        if (err) {
                            console.log('Failed to create uuid-ossp extension:', err);
                        }
                        done(err, conn);
                    });
                });
            },
        },
        migrations: {
            directory: './src/migrations',
        },
        seeds: {
            directory: './src/seeds',
        },
    }
};
