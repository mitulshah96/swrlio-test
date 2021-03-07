const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define(
        'movie_history',
        {
            movie_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                unique: true,
                primaryKey: true,
                autoIncrement: false,
            },
            search_count: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            access_count: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            createdAt: 'created_at',
            updatedAt: 'updated_at',
            tableName: 'movie_history',
        }
    );
};
