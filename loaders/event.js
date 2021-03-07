const {
        models: { SearchTrendsModel, MovieHistoryModel },
    } = require('./mysql'),
    EventEmitter = require('events'),
    { findKeyWordCount, findMovies, findMovie } = require('../services/db');

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

class MyEmitter extends EventEmitter {}

const CustomEmitter = new MyEmitter();
CustomEmitter.on('on_movie_search', (keyword, movie_ids) => {
    setImmediate(async () => {
        // Will log the keyword, and and increment it if exists
        findKeyWordCount(keyword)
            .then((resp) => {
                if (resp) {
                    SearchTrendsModel.increment('keyword_count', {
                        where: { keyword: keyword },
                    });
                } else {
                    SearchTrendsModel.create({
                        keyword: keyword,
                        keyword_count: 1,
                    });
                }
            })
            .catch((err) => {
                console.log('Unable to log keywords', err);
            });

        findMovies(movie_ids).then((resp) => {
            movi_id_in_db = resp.map((elem) => elem.movie_id);

            const ids_to_update = movie_ids.filter((value) =>
                movi_id_in_db.includes(value)
            );

            // movi_id_in_db;
            MovieHistoryModel.increment('search_count', {
                where: {
                    movie_id: {
                        [Op.in]: ids_to_update,
                    },
                },
            });

            const ids_to_insert = movie_ids.filter(
                (value) => !ids_to_update.includes(value)
            );

            MovieHistoryModel.bulkCreate(
                ids_to_insert.map((elem) => ({
                    movie_id: elem,
                    search_count: 1,
                    access_count: 0,
                })),
                {
                    returning: true,
                }
            );
        });
    });
});

CustomEmitter.on('on_movie_fetch', (movie_id) => {
    MovieHistoryModel.findOne({
        where: {
            movie_id,
        },
    }).then((resp) => {
        if (resp) {
            MovieHistoryModel.increment('access_count', {
                where: {
                    movie_id: movie_id,
                },
            });
        } else {
            MovieHistoryModel.create({
                movie_id: movie_id,
                search_count: 0,
                access_count: 1,
            });
        }
    });
});

module.exports = CustomEmitter;
