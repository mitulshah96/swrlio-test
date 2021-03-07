const { tmdb_api } = require('../config'),
    { ApolloServer } = require('apollo-server-express'),
    { typeDefs } = require('../schema'),
    { TMDAPI } = require('../lib/tmdb');

// Provide resolver functions for your schema fields
const resolvers = {
    Query: {
        movies: (root, { keyword, page }, { dataSources }) => {
            return dataSources.TMDAPI.getMovies(keyword, page);
        },
        movie: (root, { id }, { dataSources }) => {
            return dataSources.TMDAPI.getMovie(id);
        },
    },
};

const path = '/graphql';

module.exports = async ({ app }) => {
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        dataSources: () => {
            return {
                TMDAPI: new TMDAPI(),
            };
        },
        context: () => {
            return {
                api_key: tmdb_api.api_key,
            };
        },
    });
    server.applyMiddleware({ app, path });
};
