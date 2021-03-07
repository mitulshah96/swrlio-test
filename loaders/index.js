const config = require('../config'),
    expressLoader = require('./express'),
    graphqlLoader = require('./graphql'),
    eventLoader = require('./event'),
    { connection, models } = require('./mysql');

module.exports = async ({ app }) => {
    console.log('✌️ DB loaded and connected!'); // if this gets printed, DB should have been loaded already/

    await expressLoader({ app });
    console.log('✌️ Express loaded');

    await graphqlLoader({ app });
    console.log('✌️ GraphQL loaded');
};
