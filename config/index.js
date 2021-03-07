const dotenv = require('dotenv');

const envFound = dotenv.config();

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

if (envFound.error) {
    // This error should crash whole process

    throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

module.exports = {
    port: parseInt(process.env.PORT),
    tmdb_api: {
        base_url: 'https://api.themoviedb.org/3/',
        api_key: process.env.API_KEY,
    },
    database: {
        db_name: process.env.DB,
        username: process.env.USER_NAME,
        password: process.env.PASSWORD,
        host: process.env.HOST,
        port: '3306',
    },
};
