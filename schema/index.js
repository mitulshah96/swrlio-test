const { gql } = require('apollo-server-express');

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
    type Query {
        movies(keyword: String!, page: Int): moviesResp
        movie(id: Int!): movieDetailsResp
    }

    type moviesResp {
        keyword_count: Int
        results: [Movie]
    }

    type movieDetailsResp {
        access_count: Int
        search_count: Int
        result: Movie
    }

    type Movie {
        original_title: String
        poster_path: String
        video: Boolean
        vote_average: Float
        overview: String
        release_date: String
        vote_count: Int
        adult: Boolean
        backdrop_path: String
        id: Int
        title: String
        original_language: String
        popularity: Float
        media_type: String
        genre_ids: [Int]
    }
`;

module.exports = {
    typeDefs: typeDefs,
};
