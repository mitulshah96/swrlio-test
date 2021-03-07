const { database } = require('../config'),
    Sequelize = require('sequelize'),
    { ...modelDefiners } = require('../models');

let db = {};
const sequelize = new Sequelize(
    database.db_name,
    database.username,
    database.password,
    {
        host: database.host,
        dialect: 'mysql',
        port: database.port,
        logging: false,
    }
);

sequelize.dialect.supports.schemas = true;

const models = {};

for (const [name, value] of Object.entries(modelDefiners)) {
    models[name] = value(sequelize);
}

sequelize.sync();

db.connection = sequelize;
db.models = models;

module.exports = db;
