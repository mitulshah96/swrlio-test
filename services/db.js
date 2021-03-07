const {
    models: { SearchTrendsModel, MovieHistoryModel },
} = require('../loaders/mysql');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = {
    findKeyWordCount: (keyword) => {
        return SearchTrendsModel.findOne({
            where: {
                keyword: keyword,
            },
            attributes: ['keyword_count'],
        });
    },

    findMovies: (movie_ids) => {
        return MovieHistoryModel.findAll({
            where: {
                movie_id: { [Op.in]: movie_ids },
            },
            attributes: ['movie_id'],
        });
    },
    findMovie: (movie_id) => {
        return MovieHistoryModel.findOne({
            where: {
                movie_id: movie_id,
            },
        });
    },
};
