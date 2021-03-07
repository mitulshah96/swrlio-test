module.exports = {
    port: parseInt(process.env.PORT),
    tmdb_api: {
        base_url: 'https://api.themoviedb.org/3/',
        api_key: process.env.API_KEY,
    },
    database: {
        db_name: process.env.DB,
        username: process.env.USERNAME,
        password: process.env.PASSWORD,
        host: process.env.HOST,
        port: '3306',
    },
};
