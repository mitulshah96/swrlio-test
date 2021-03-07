const config = require('../config'),
    expressLoader = require('./express');

module.exports = async ({ app }) => {
    console.log('✌️ DB loaded and connected!'); // if this gets printed, DB should have been loaded already/

    await expressLoader({ app });
    console.log('✌️ Express loaded');
};
