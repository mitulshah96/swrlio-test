const { tmdb_api } = require('../config'),
    { RESTDataSource } = require('apollo-datasource-rest'),
    CustomEmitter = require('../loaders/event'),
    { findKeyWordCount, findMovie } = require('../services/db');

class TMDAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = tmdb_api.base_url;
    }

    willSendRequest(request) {
        request.params.set('api_key', this.context.api_key);
    }

    async getMovies(keyword, page_no) {
        let resp = [];
        if (keyword) {
            let db_resp = await findKeyWordCount(keyword);
            let keyword_count = 0; // should be zero for the first query
            if (db_resp) {
                keyword_count = db_resp.keyword_count;
            }

            resp = await this.get(
                `search/movie?query=${keyword}&page=${page_no}&include_adult=false`
            );
            CustomEmitter.emit(
                'on_movie_search',
                keyword,
                resp.results.map((movie) => movie.id)
            );
            return {
                keyword_count: keyword_count + 1,
                results: resp.results,
            };
        } else {
            resp = await this.getTrendingMovie();
            return {
                keyword_count: 0, // No Keyword count should be set
                results: resp,
            };
        }
    }

    async getTrendingMovie() {
        let media_type = 'movie';
        let time_window = 'day';
        let resp = await this.get(`trending/${media_type}/${time_window}`);
        return resp.results;
    }

    async getMovie(id) {
        let movie_search_history = await findMovie(id);
        let resp = {
            result: {},
            access_count: 0,
            search_count: 0,
        };
        if (movie_search_history) {
            (resp.access_count = movie_search_history.access_count + 1),
                (resp.search_count = movie_search_history.search_count);
        }
        let movie_details = await this.get(`movie/${id}&language=en-US`);
        resp.result = movie_details;
        CustomEmitter.emit('on_movie_fetch', id);
        return resp;
    }
}

module.exports = {
    TMDAPI: TMDAPI,
};
